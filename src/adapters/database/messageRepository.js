const reqlib = require('app-root-path').require;
const { Client } = require('pg');

const Message = reqlib('src/entities/message');

const deserializeMessage = (msg) => new Message({
  uid: msg.uid,
  created: msg.created,
  accountType: msg.account_type,
  accountId: msg.account_id,
  content: msg.content,
  deviceInfo: msg.device_info,
  previous: msg.previous_uid
});

const repo = (logger, databaseConfig) => {

  async function getClient() {
    const client = new Client({
      host: databaseConfig.host,
      port: databaseConfig.port,
      user: databaseConfig.user,
      password: databaseConfig.password,
      database: databaseConfig.database
    });
    logger.debug(`Connecting to database @${databaseConfig.host}:${databaseConfig.port}...`);
    await client.connect();
    logger.debug('Connected to database');
    return client;
  }

  const save = async (msg) => {
    const client = await getClient();

    const query = `
      INSERT INTO messages
        (uid, created, account_type, account_id, content, device_info, previous_uid)
      SELECT $1, $2, $3, $4, $5, $6, $7::VARCHAR
      WHERE
        $7 IS NULL OR (
          EXISTS(SELECT DISTINCT uid FROM messages WHERE uid = $7)
          AND NOT EXISTS(SELECT DISTINCT uid FROM messages WHERE previous_uid = $7)
        );
    `;

    const params = [
      msg.uid,
      msg.created,
      msg.accountType,
      msg.accountId,
      msg.content,
      msg.deviceInfo ? msg.deviceInfo.toJSON() : null,
      msg.previous || null
    ];
    await client.query(query, params);

    const res = await client.query('SELECT * FROM messages WHERE uid = $1;', [msg.uid]);
    if (!res.rows.length) {
      throw new Error(`Invalid previous message uid ${msg.previous}`);
    }
    return deserializeMessage(res.rows[0]);
  };

  const listMessages = async ({ os, appVersion, language }) => {
    const client = await getClient();
    const query = `
      SELECT *
      FROM messages
      WHERE
        ($1::VARCHAR IS NULL OR device_info->>'os' ILIKE '%' || $1 || '%')
        AND ($2::VARCHAR IS NULL OR device_info->>'appVersion' ILIKE '%' || $2 || '%')
        AND ($3::VARCHAR IS NULL OR device_info->>'language' ILIKE '%' || $3 || '%')
      ORDER BY uid;
    `;
    const params = [os, appVersion, language];
    logger.debug(`Listing messages filtering with: ${params}`);
    const res = await client.query(query, params);
    return res.rows.map((m) => deserializeMessage(m));
  };

  const listThreads = async () => {
    const client = await getClient();

    const query = `
      SELECT get_messages_thread(uid) AS thread
      FROM messages
      WHERE previous_uid IS NULL
      ORDER BY created;
    `;
    const res = await client.query(query);
    return res.rows.map((t) => t.thread.map((msg) => deserializeMessage(msg)));
  };

  return {
    save,
    listMessages,
    listThreads
  };
};

module.exports = repo;

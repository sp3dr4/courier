const reqlib = require('app-root-path').require;
const { Client } = require('pg');

const Message = reqlib('src/entities/message');

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

    const res = await client.query('SELECT * FROM messages WHERE uid = $1', [msg.uid]);
    if (!res.rows.length) {
      throw new Error(`Invalid previous message uid ${msg.previous}`);
    }
    const row = res.rows[0];
    return new Message({
      uid: row.uid,
      created: row.created,
      accountType: row.account_type,
      accountId: row.account_id,
      content: row.content,
      deviceInfo: row.device_info,
      previous: row.previous_uid
    });
  };

  return {
    save
  };
};

module.exports = repo;

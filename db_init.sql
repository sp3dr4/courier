
CREATE TABLE IF NOT EXISTS messages (
    uid VARCHAR PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL,
    account_type VARCHAR NOT NULL,
    account_id VARCHAR NOT NULL,
    content VARCHAR NOT NULL,
    device_info JSONB,
    previous_uid VARCHAR
);

-- given a message uid, rebuilds the message thread from that point forward
-- and returns it in a json array
CREATE OR REPLACE FUNCTION get_messages_thread(VARCHAR) RETURNS json
  LANGUAGE plpgsql AS $$
    DECLARE thread json;
  BEGIN
    WITH RECURSIVE msgs(uid) AS (
        SELECT uid, created, account_type, account_id, content, device_info, previous_uid
        FROM messages
        WHERE uid = $1
        UNION
        SELECT m.uid, m.created, m.account_type, m.account_id, m.content, m.device_info, m.previous_uid
        FROM messages m
        JOIN msgs ON (m.previous_uid = msgs.uid)
    )
    SELECT json_agg(msgs) INTO thread FROM msgs;
    RETURN thread;
  END;
$$;

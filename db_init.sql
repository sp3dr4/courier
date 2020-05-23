
CREATE TABLE IF NOT EXISTS messages (
    uid VARCHAR PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL,
    account_type VARCHAR NOT NULL,
    account_id VARCHAR NOT NULL,
    content VARCHAR NOT NULL,
    device_info JSONB,
    previous_uid VARCHAR
);

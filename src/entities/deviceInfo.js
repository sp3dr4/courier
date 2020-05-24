const { attributes } = require('structure');

const DeviceInfo = attributes({
  os: {
    type: String,
    nullable: true
  },
  appVersion: {
    type: String,
    nullable: true
  },
  language: {
    type: String,
    nullable: true
  }
})(class DeviceInfo {});

module.exports = DeviceInfo;

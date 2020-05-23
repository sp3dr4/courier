const { attributes } = require('structure');

const DeviceInfo = attributes({
  OS: {
    type: String,
    nullable: true
  },
  appVersion: {
    type: String,
    nullable: true
  }
})(class DeviceInfo {});

module.exports = DeviceInfo;

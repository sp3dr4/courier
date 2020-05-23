const { attributes } = require('structure');
const ULID = require('ulid');

const DeviceInfo = require('./DeviceInfo');

const Message = attributes({
  uid: {
    type: String,
    default: (instance) => ULID.ulid()
  },
  created: {
    type: Date,
    nullable: true,
    default: (instance) => Date.now()
  },
  from: {
    type: String,
    required: true,
    equal: ['customer', 'operator']
  },
  accountId: String,
  message: String,
  deviceInfo: {
    type: DeviceInfo,
    default: (instance) => DeviceInfo()
  },
  previous: {
    type: String,
    nullable: true
  }
})(class DeviceInfo {});

module.exports = Message;

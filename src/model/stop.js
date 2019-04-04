var Record = require('immutable').Record;

var defaults = {
  'name': '',
  'time': ''
};

var StopRecord = Record(defaults);

class Stop extends StopRecord {
}

module.exports = Stop;

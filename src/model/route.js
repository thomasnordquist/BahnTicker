var Record = require('immutable').Record;

var defaults = {
	"time": 0,
	"name": "",
	"destination": "",
	"stops": []
};

var RouteRecord = Record(defaults);

class Route extends RouteRecord {
}

module.exports = Route;

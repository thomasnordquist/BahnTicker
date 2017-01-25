/*
Dependencies: request, cheerio
npm install cheerio
npm install request

Run with:
node {FILENAME}
*/

import cheerio from 'cheerio';
import $ from 'jquery';

var Route = require('./model/route');
var Stop = require('./model/stop');
//var request = require('superagent');

/**
 * @var dbUrl visit https://reiseauskunft.bahn.de/bin/bhftafel.exe and copy the link of the refresh button
 */
var dbUrl = 'https://reiseauskunft.bahn.de/bin/bhftafel.exe/dn?ld=15064&protocol=https:&rt=1&input=Schlo%DF,%20Darmstadt%23116016&boardType=dep&time=actual&productsFilter=000001001&start=yes';
//var dbUrl = 'https://reiseauskunft.bahn.de/bin/bhftafel.exe/dn?ld=15064&protocol=https:&rt=1&input=Frankfurt(Main)Hbf%238000105&boardType=dep&time=actual&productsFilter=000001001&start=yes';

function getCurrentTrains(resolve, reject) {
  //console.log('trainz')
  //return new Promise((resolve, reject) => {
  return $.ajax({
    url:dbUrl
  }).done(function(response) {
        console.log(response);
        function filterStops(routeNodes) {
            var text = routeNodes.filter((key, node) => {
                return node.name != "span" &&
                    node.name != "img"
            }).text();
            var matches = text.match(/(.*)\n([0-2]{1}[0-9]{1}:[0-6]{1}[0-9]{1})\n?-?/g)

            return matches.map((str) => {
                let tmp = str.trim().split('\n');
                return new Stop({name: tmp[0], time: tmp[1]});
            })
        }

        var $ = cheerio.load(response);
        var lines = $('table.result tr');

        lines = lines.filter(function (key, line) {
          return /journeyRow_[0-9]+/.test( $(line).attr('id') );
        });

        var routes = lines.map(function(key, route) {
          var time = $(route).find('td.time').first().text().trim();
          var train = $(route).find('td.train a').text().replace(/\s+/g,' ').trim();
          var dest = $(route).find('td.route a').text().trim();
          var stops = filterStops($(route).find('td.route'));
          return new Route({time: time, name: train, destination: dest, stops: stops});
        });
        console.log(routes.toArray())

        resolve(routes.toArray());
    });
  //});
}

module.exports = getCurrentTrains;

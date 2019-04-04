/*
Dependencies: request, cheerio
npm install cheerio
npm install request

Run with:
node {FILENAME}
*/

const axios = require('axios');
const cheerio = require('cheerio');

const Route = require('./model/route');
const Stop = require('./model/stop');

/**
 * @var dbUrl visit https://reiseauskunft.bahn.de/bin/bhftafel.exe and copy the link of the refresh button
 */
// const dbUrl = 'https://reiseauskunft.bahn.de/bin/bhftafel.exe/dn?ld=15079&protocol=https:&rt=1&input=Darmstadt%20Hbf%238000068&boardType=dep&time=actual&productsFilter=11111&start=yes';
const dbUrl = 'https://reiseauskunft.bahn.de/bin/bhftafel.exe/dn?ld=38192&country=DEU&protocol=https:&rt=1&input=Schlo%DF,%20Darmstadt%23116016&boardType=dep&time=actual&productsFilter=111111111&start=yes&';

function getCurrentTrains(resolve) {
  return axios.get(dbUrl).then((res) => {
    const response = res.data;

    function filterStops(routeNodes) {
      const text = routeNodes.filter((key, node) => {
        return node.name !== 'span' && node.name !== 'img';
      }).text();

      const timePattern = /(.*)\n([0-2]{1}[0-9]{1}:[0-6]{1}[0-9]{1})\n?-?/g;
      const matches = text.match(timePattern);

      return matches.map((str) => {
        const tmp = str.trim().split('\n');
        return new Stop({name: tmp[0], time: tmp[1]});
      });
    }

    const $_ = cheerio.load(response);
    let lines = $_('table.result tr');
    lines = lines.filter((key, line) => {
      return /journeyRow_[0-9]+/.test( $_(line).attr('id') );
    });

    const routes = lines.map((key, route) => {
      const time = $_(route).find('td.time').first().text().trim();
      const train = $_(route).find('td.train a').text().replace(/\s+/g, ' ').trim();
      const dest = $_(route).find('td.route a').text().trim();
      const stops = filterStops($_(route).find('td.route'));
      return new Route({time: time, name: train, destination: dest, stops: stops});
    });
    resolve(routes.toArray());
  });
}

// getCurrentTrains(console.log)

module.exports = getCurrentTrains;

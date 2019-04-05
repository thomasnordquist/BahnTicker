const React = require('react')
const { Component } = require('react')
const axios = require('axios')
const moment = require('moment')

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null }
    this.update(this);
  }

  componentDidMount() {
    setInterval(() => this.update(), 60000)
    setInterval(() => this.setState(this.state), 1000)
  }

  async update() {
    let response = await axios.get('/trains')
    this.setState({ data: response.data })
  }

  render() {
    const lines = this.state.data || [];

    return (
      <div>
        <div style={{color: 'white', fontSize: '2em', fontWeight: 'bold', lineHeight: '1.5em', padding: '8px'}}>
          <div style={{ float: 'left' }}>Darmstadt Schloß</div>
          <div style={{ float: 'right' }}>{moment().format('HH:mm:ss')}</div>
        </div>
        <table className="destination-board">
          <thead>
            <tr>
              <th className='header-time'>Time</th>
              <th className='header-line'>Line</th>
              <th className='header-destination'>Destination</th>
            </tr>
          </thead>
          <tbody>
          {lines.slice(0, 30).sort((a, b) => a.time > b.time).map((line) =>
              <tr key={`${line.time}-${line.name}`}>
                  <td className="time">{line.time}</td>
                  <td className="line">{line.name.replace(/STR ([0-9]+)/, 'Linie $1')}</td>
                  <td className="destination">
                      <div className="final-destination">{line.destination}</div>
                      <div className="stops">
                        <div>
                          <span className="stops">{line.stops.map((stop) => <span className="stop">{stop.name}&nbsp;{stop.time}</span>)}</span>
                          <span className="stops">{line.stops.map((stop) => <span className="stop">{stop.name}&nbsp;{stop.time}</span>)}</span>
                        </div>
                      </div>
                  </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default HomePage

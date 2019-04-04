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
    setInterval(() => this.update(), 3000)
  }

  async update() {
    const dispatch = this.props.dispatch;
    let response = await axios.get('/trains')
    this.setState({ data: response.data })
  }

  render() {
    if (!this.state.data) {
      return null
    }
    const lines = this.state.data;

    return (
      <div>
        <div>
          <center><h4 style={{color: 'white', fontSize: '2em', fontWeight: 'bold'}}>Darmstadt Schloß {moment().format('HH:m:s')}</h4></center>
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
          {lines.slice(0,30).map((line) =>
              <tr>
                  <td className="time">{line.time}</td>
                  <td className="line">{line.name}</td>
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
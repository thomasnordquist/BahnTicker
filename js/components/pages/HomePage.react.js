/*
 * HomePage
 * This is the first thing users see of our App
 */

import { asyncLoadRoutes,asyncChangeProjectName, asyncChangeOwnerName } from '../../actions/AppActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.update.apply(this);
  }

  update() {
    const dispatch = this.props.dispatch;
    dispatch(asyncLoadRoutes());
    setTimeout(this.update.bind(this), 30000);
  }

  render() {
    const dispatch = this.props.dispatch;
    const { projectName, ownerName, lines } = this.props.data;
    //{lines.length}

    return (
        <table className="destination-board">
          <div>
            <span> /= <span>
            <center><div>Bahnhof</div></center>
            <div> =\ </div>
            </div>
          </div>
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
    );

    return (
      <div>
        <h1>Hello World!</h1>
        <h2>This is the demo for the <span className="home__text--red">{ projectName }</span> by <a href={'https://twitter.com/' + ownerName} >@{ ownerName }</a></h2>
        <label className="home__label">Change to your project name:
          <input className="home__input" type="text" onChange={(evt) => { dispatch(asyncChangeProjectName(evt.target.value)); }} defaultValue="React.js Boilerplate" value={projectName} />
        </label>
        <label className="home__label">Change to your name:
          <input className="home__input" type="text" onChange={(evt) => { dispatch(asyncChangeOwnerName(evt.target.value)); }} defaultValue="mxstbr" value={ownerName} />
        </label>
        <Link className="btn" to="/readme">Setup</Link>
      </div>
    );
  }
}

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(HomePage);

import React, { Component } from 'react';

export default class Header extends Component {

  render() {
    return (
      <div className="header form-inline">
        <button className="btn btn-primary btn-xs clear-log">clear</button>
        <div className="form-group">
          <div className="checkbox">
            <label>
              <input type="checkbox" className="hide-envelope-body" /> 
              Hide Soap Envelope & Body
            </label>
          </div>
        </div>
      </div>
    );
  }

}
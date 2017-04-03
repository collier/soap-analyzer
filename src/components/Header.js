import React, { Component } from 'react';
import '../css/header.css';

export default ({ clearServices, toggleOnlyShowBody }) => (
  <div className="Header form-inline">
    <div className="form-group">
      <button className="btn btn-primary btn-xs" onClick={clearServices}>
        <span className="glyphicon glyphicon-ban-circle"></span>
        clear
      </button>
      <div className="checkbox">
        <label onClick={toggleOnlyShowBody}>
          <input type="checkbox" className="hide-envelope-body" /> 
          Only Show Body
        </label>
      </div>
    </div>
  </div>
);
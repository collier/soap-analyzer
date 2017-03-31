import React, { Component } from 'react';
import '../css/header.css';

export default ({ clearServices }) => (
  <div className="Header form-inline">
    <div className="form-group">
      <button className="btn btn-primary btn-xs" onClick={clearServices}>
        <span className="glyphicon glyphicon-ban-circle"></span>
        clear
      </button>
      <div className="checkbox">
        <label>
          <input type="checkbox" className="hide-envelope-body" /> 
          Hide Soap Envelope & Body
        </label>
      </div>
    </div>
  </div>
);
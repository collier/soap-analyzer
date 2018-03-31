import React from 'react';
import './Header.css';

export default ({ clearServices }) => (
  <div className="Header form-inline">
    <div className="form-group">
      <button className="btn btn-primary btn-xs" onClick={clearServices}>
        <span className="glyphicon glyphicon-ban-circle"></span>
        Clear
      </button>
    </div>
  </div>
);

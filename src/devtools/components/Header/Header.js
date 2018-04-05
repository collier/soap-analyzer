import React from 'react';
import './Header.css';

const Header = ({ clearServices }) => (
  <div className="Header form-inline">
    <div className="form-group">
      <button className="btn btn-primary btn-xs" onClick={clearServices}>
        <span className="glyphicon glyphicon-ban-circle"></span>
        Clear
      </button>
    </div>
  </div>
);

export default Header;

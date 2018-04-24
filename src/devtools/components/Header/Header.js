import React from 'react';
import './Header.css';

const Header = (props) => (
  <div className="Header form-inline">
    <div className="form-group">
      <button className="btn btn-primary btn-xs" onClick={props.clearServices}>
        <span className="glyphicon glyphicon-ban-circle"></span>
        Clear
      </button>
    </div>
    <div className="form-group">
      <div className="checkbox">
        <label>
          <input type="checkbox" checked={props.hideXmlns} onChange={props.toggleHideXmlns} /> Hide XML namespaces
        </label>
      </div>
    </div>
    <div className="form-group">
      <div className="checkbox">
        <label>
          <input type="checkbox" checked={props.onlyBody} onChange={props.toggleOnlyBody} /> Only body contents
        </label>
      </div>
    </div>
    <div className="form-group">
      <div className="checkbox">
        <label>
          <input type="checkbox" checked={props.theme === 'dark'} onChange={props.toggleDarkTheme} /> Use dark theme
        </label>
      </div>
    </div>
  </div>
);

export default Header;

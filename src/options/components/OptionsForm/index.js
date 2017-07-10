import React from 'react';
import { fromJS } from 'immutable';
import './OptionsForm.css';

export default class OptionsForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { settings : fromJS(props.settings) };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState(({ settings }) => {
      const newSettings = settings.set(name, value);
      chrome.storage.sync.set(newSettings.toJS());
      return { settings: newSettings };
    });
  }

  render() {
    const { theme } = this.state.settings.toJS();
    return (
      <form className="options container">
        <h1>SOAP Analyzer Options</h1>
        <div className="form-group">
          <label>Theme</label>
          <select name="theme" value={theme} className="form-control" onChange={this.handleInputChange}>
            <option value="default">Default</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </form>
    );
  }

}

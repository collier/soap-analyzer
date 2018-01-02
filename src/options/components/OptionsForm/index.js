import React from 'react';
import './OptionsForm.css';

export default class OptionsForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { settings : props.settings };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState((prevState) => {
      const newState = {
        settings: {
          ...prevState.settings,
          [name]: value
        }
      };
      chrome.storage.sync.set(newState.settings);
      return newState;
    });
  }

  render() {
    const { theme } = this.state.settings;
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

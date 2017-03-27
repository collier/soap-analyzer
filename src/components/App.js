import React, { Component } from 'react';

export default class App extends Component {

  render() {
    return <div>Use Dark Theme? {this.props.settings.useDarkTheme}</div>;
  }

}
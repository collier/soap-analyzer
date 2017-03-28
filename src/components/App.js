import React, { Component } from 'react';
import { parseString } from 'xml2js';
import { stripPrefix } from 'xml2js/lib/processors';
import Header from './Header';
import WebServiceList from './WebServiceList';
import 'bootstrap/dist/css/bootstrap.css';

export default class App extends Component {

  componentDidMount() {
    this.setNetworkListener();
  }

  setNetworkListener() {
    chrome.devtools.network.onRequestFinished.addListener((request) => {
      const headers = request.request.headers;
      const contentType = headers.find((header) => header.name === 'Content-Type');
      if(contentType) {
        if(contentType.value.indexOf('text/xml') > -1) {
          const requestXML = request.request.postData.text;
          parseString(requestXML, {
            tagNameProcessors: [stripPrefix]
          }, (err, result) => {
            const webServiceName = Object.getOwnPropertyNames(result.Envelope.Body[0])[0];
            console.log(webServiceName);
          });
        }
      }
    });
  }

  render() {
    const settings = this.props.settings;
    return (
      <div className={settings.useDarkTheme ? 'theme-dark' : ''}> 
        <Header />
        <div className="row network">
          <div className="col-md-3">
            <WebServiceList />
          </div>
          <div className="col-md-9">
          </div>
        </div>
      </div>
    );
  }

}
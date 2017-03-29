import React, { Component } from 'react';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import { parseString } from 'xml2js';
import { stripPrefix } from 'xml2js/lib/processors';
import Header from './Header';
import WebServiceList from './WebServiceList';
import 'bootstrap/dist/css/bootstrap.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      serviceList: []
    };
  }

  componentDidMount() {
    this.setNetworkListener();
  }

  setNetworkListener() {
    const self = this;
    chrome.devtools.network.onRequestFinished.addListener(request => {
      const headers = request.request.headers;
      const contentType = headers.find(header => header.name === 'Content-Type');
      if(contentType) {
        if(contentType.value.indexOf('text/xml') > -1) {
          const requestXML = request.request.postData.text;
          parseString(requestXML, {
            tagNameProcessors: [stripPrefix]
          }, (err, result) => {
            const serviceBody = result.Envelope.Body[0]
            const webServiceName = Object.getOwnPropertyNames(serviceBody)[0];
            self.setState(prevState => ({ 
              serviceList: prevState.serviceList.concat({
                name: webServiceName,
                request: request
              })
            }));
          });
        }
      }
    });
  }

  render() {
    return (
      <div className={this.props.settings.useDarkTheme ? 'theme-dark' : ''}> 
        <Header />
        <div className="row">
          <div className="col-md-3">
            <WebServiceList {...this.state} />
          </div>
          <div className="col-md-9">
          </div>
        </div>
      </div>
    );
  }

}
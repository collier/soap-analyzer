import React, { Component } from 'react';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import Header from './Header';
import WebServiceList from './WebServiceList';
import WebServiceDetails from './WebServiceDetails';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/app.css';
import '../css/theme-dark.css';
import uuidV1 from 'uuid/v1';
import { parseString } from 'xml2js';
import { stripPrefix } from 'xml2js/lib/processors';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      serviceList: [],
      activeService: undefined
    };
  }

  componentDidMount() {
    var self = this;
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
            self.addService({
              id: uuidV1(),
              name: webServiceName,
              request 
            });
          });
        }
      }
    });
  }

  addService(service) {
    this.setState(prevState => ({ 
      serviceList: prevState.serviceList.concat(service)
    }));
  }

  setActiveService(service) {
    this.setState(prevState => ({ 
      activeService: service
    }));
  }

  clearServices() {
    this.setState(prevState => ({ 
      serviceList: [],
      activeService: undefined
    }));
  }

  render() {
    const theme = this.props.settings.useDarkTheme ? 'theme-dark' : '';
    return (
      <div className={'App ${theme}'}> 
        <Header 
          {...this.state} 
          clearServices={this.clearServices}
        />
        <div className="row">
          <div className="col-md-3 web-service-list-container">
            <WebServiceList 
              {...this.state} 
              setActiveService={this.setActiveService.bind(this)}
            />
          </div>
          <div className="col-md-9 web-service-details-container">
            <WebServiceDetails {...this.state} {...this.props} />
          </div>
        </div>
      </div>
    );
  }
  
}

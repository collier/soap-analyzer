import React, { Component } from 'react';
import uuidV1 from 'uuid/v1';
import { parseString } from 'xml2js';
import { stripPrefix } from 'xml2js/lib/processors';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import Header from './Header';
import WebServiceList from './WebServiceList';
import WebServiceDetails from './WebServiceDetails';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/app.css';
import '../css/theme-dark.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      services: []
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
              isActive: false,
              request
            });
          });
        }
      }
    });
  }

  addService(service) {
    this.setState(prevState => ({ 
      services: prevState.services.concat(service)
    }));
  }

  setActiveService(serviceId) {
    const services = this.state.services.map((service) => {
      if(service.id === serviceId) {
        return {...service, isActive: true };
      } else {
        return {...service, isActive: false };
      }
    });
    this.setState(prevState => ({ services }));
  }

  clearServices() {
    this.setState(prevState => ({ 
      services: []
    }));
  }

  render() {
    const theme = this.props.settings.useDarkTheme ? 'theme-dark' : '';
    const activeService = this.state.services.find(service => service.isActive);
    return (
      <div className={`App ${theme}`}> 
        <Header clearServices={this.clearServices.bind(this)} />
        <div className="row">
          <div className="col-md-3 web-service-list-container">
            <WebServiceList 
              services={this.state.services} 
              setActiveService={this.setActiveService.bind(this)}
            />
          </div>
          <div className="col-md-9 web-service-details-container">
            <WebServiceDetails 
              activeService={activeService}
              {...this.props} 
            />
          </div>
        </div>
      </div>
    );
  }
  
}

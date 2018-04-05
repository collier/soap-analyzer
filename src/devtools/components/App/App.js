import React from 'react';
import { html as beautifyHTML } from 'js-beautify';
import uuidV4 from 'uuid/v4';
import SoapAnalyzer from '../SoapAnalyzer/SoapAnalyzer';
import { isSOAPRequest, getWebServiceName } from '../../util';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { services : [] };
    this.addService = this.addService.bind(this);
    this.clearServices = this.clearServices.bind(this);
    this.setActiveService = this.setActiveService.bind(this);
    this.getActiveService = this.getActiveService.bind(this);
    this.onNetworkSOAPRequest = this.onNetworkSOAPRequest.bind(this);
  }

  componentDidMount() {
    chrome.devtools.network.onRequestFinished.addListener((request) => {
      if(isSOAPRequest(request)) {
        this.onNetworkSOAPRequest(request);
      }
    });
  }

  async onNetworkSOAPRequest(request) {
    const rawRequestXML = request.request.postData.text;
    const webServiceName = await getWebServiceName(rawRequestXML);
    this.addService({
      id: uuidV4(),
      name: webServiceName,
      isActive: false,
      request
    });
  }

  setActiveService(serviceId) {
    const selectedService = this.state.services.find((service) => {
      return service.id === serviceId;
    });
    const rawRequestXML = selectedService.request.request.postData.text;
    selectedService.request.getContent((rawResponseXML) => {
      const services = this.state.services.map((service) => {
        if(service.id === serviceId) {
          if(!service.prettyRequest) {
            const prettyRequest = beautifyHTML(rawRequestXML, { indent_size: 2 });
            service.prettyRequest = prettyRequest;
          }
          if(!service.prettyResponse) {
            const prettyResponse = beautifyHTML(rawResponseXML, { indent_size: 2 });
            service.prettyResponse = prettyResponse;
          }
          service.isActive = true;
          return service;
        } else {
          service.isActive = false;
          return service;
        }
      });
      this.setState(() => ({ services }));
    });
  }

  addService(service) {
    this.setState(({ services }) => ({
      services: services.concat(service)
    }));
  }

  clearServices() {
    this.setState(() => ({
      services: []
    }));
  }

  getActiveService() {
    return this.state.services.find((service) => {
      return service.isActive;
    });
  }

  render() {
    return (
      <SoapAnalyzer
        services={this.state.services}
        settings={this.props.settings}
        activeService={this.getActiveService()}
        addService={this.addService}
        clearServices={this.clearServices}
        setActiveService={this.setActiveService}
      />
    );
  }
}

export default App;

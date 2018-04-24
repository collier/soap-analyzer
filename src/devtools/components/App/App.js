import React from 'react';
import { html as beautifyHTML } from 'js-beautify';
import uuidV4 from 'uuid/v4';
import SoapAnalyzer from '../SoapAnalyzer/SoapAnalyzer';
import { isSOAPRequest, getWebServiceName, getSoapBodyContents, removeXmlns } from '../../util';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      services : [],
      theme : props.settings.theme,
      hideXmlns : props.settings.hideXmlns,
      onlyBody : props.settings.onlyBody
    };
    this.addService = this.addService.bind(this);
    this.clearServices = this.clearServices.bind(this);
    this.setActiveService = this.setActiveService.bind(this);
    this.getActiveService = this.getActiveService.bind(this);
    this.onNetworkSOAPRequest = this.onNetworkSOAPRequest.bind(this);
    this.toggleHideXmlns = this.toggleHideXmlns.bind(this);
    this.toggleDarkTheme = this.toggleDarkTheme.bind(this);
    this.toggleOnlyBody = this.toggleOnlyBody.bind(this);
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
            service.prettyRequest = beautifyHTML(rawRequestXML, { indent_size: 2 });
          }
          if(!service.prettyResponse) {
            service.prettyResponse = beautifyHTML(rawResponseXML, { indent_size: 2 });
          }
          if(!service.prettyRequestNoXmlns) {
            service.prettyRequestNoXmlns = removeXmlns(service.prettyRequest);
          }
          if(!service.prettyResponseNoXmlns) {
            service.prettyResponseNoXmlns = removeXmlns(service.prettyResponse);
          }
          if(!service.prettyRequestOnlyBody) {
            service.requestOnlyBody = getSoapBodyContents(rawRequestXML);
            service.prettyRequestOnlyBody = beautifyHTML(service.requestOnlyBody, { indent_size: 2 });
          }
          if(!service.prettyResponseOnlyBody) {
            service.responseOnlyBody = getSoapBodyContents(rawResponseXML);
            service.prettyResponseOnlyBody = beautifyHTML(service.responseOnlyBody, { indent_size: 2 });
          }
          if(!service.prettyRequestNoXmlnsOnlyBody) {
            service.prettyRequestNoXmlnsOnlyBody = removeXmlns(service.prettyRequestOnlyBody);
          }
          if(!service.prettyResponseNoXmlnsOnlyBody) {
            service.prettyResponseNoXmlnsOnlyBody = removeXmlns(service.prettyResponseOnlyBody);
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

  toggleDarkTheme() {
    const newTheme = {
      theme: this.state.theme === 'default' ? 'dark' : 'default'
    };
    chrome.storage.sync.set(newTheme, () => {
      this.setState(() => (newTheme));
    });
  }

  toggleHideXmlns() {
    const newHideXmlns = {
      hideXmlns: !this.state.hideXmlns
    };
    chrome.storage.sync.set(newHideXmlns, () => {
      this.setState(() => (newHideXmlns));
    });
  }

  toggleOnlyBody() {
    const newOnlyBody = {
      onlyBody: !this.state.onlyBody
    };
    chrome.storage.sync.set(newOnlyBody, () => {
      this.setState(() => (newOnlyBody));
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
        toggleHideXmlns={this.toggleHideXmlns}
        toggleDarkTheme={this.toggleDarkTheme}
        toggleOnlyBody={this.toggleOnlyBody}
        hideXmlns={this.state.hideXmlns}
        onlyBody={this.state.onlyBody}
        theme={this.state.theme}
      />
    );
  }

}

export default App;

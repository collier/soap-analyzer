import React, { Component } from 'react';
import { html as beautifyHTML } from 'js-beautify';
import CodeMirror from 'react-codemirror';
import Humanize from 'humanize-plus';
import moment from 'moment';
import { DOMParser } from 'xmldom';
import WebServiceStats from './WebServiceStats';
import 'codemirror/mode/xml/xml';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-dark.css';
import '../css/web-service-details.css';

const beautifyXMLOptions = {
  indent_size: 2
};

export default class WebServiceDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      prettyResponseXML: undefined
    };
  }

  handleResponseClick() {
    const self = this;
    if(!this.state.prettyResponseXML) {
      this.props.activeService.request.getContent(rawResponseXML => {
        const prettyResponseXML = beautifyHTML(rawResponseXML, beautifyXMLOptions);
        self.setState(prevState => ({ prettyResponseXML }));
      });
    }
  }

  render() {  
    //Check if object is empty
    if(!this.props.activeService) return null;
    const rawRequestXML = this.props.activeService.request.request.postData.text;
    const doc = new DOMParser().parseFromString(rawRequestXML);
    console.log(doc.documentElement.getElementsByTagName('Body'));
    const codeMirrorOptions = {
      mode: 'xml',
      tabSize: 2,
      readOnly: true,
      theme: this.props.settings.useDarkTheme ? 'base16-dark' : 'default',
      lineNumbers: true
    };
    const prettyRequestXML = beautifyHTML(rawRequestXML, beautifyXMLOptions);
    return (
      <div className="WebServiceDetails">
        <ul className="nav nav-tabs" role="tablist">
          <li className="active"><a data-toggle="tab" href="#request">Request</a></li>
          <li><a data-toggle="tab" href="#response" onClick={this.handleResponseClick.bind(this)}>Response</a></li>
          <li><a data-toggle="tab" href="#details">Details</a></li>
        </ul>
        <div className="service-detail tab-content">
          <div role="tabpanel" className="tab-pane active" id="request">
            <CodeMirror value={prettyRequestXML} options={codeMirrorOptions} />
          </div>
          <div role="tabpanel" className="tab-pane" id="response">
            <CodeMirror value={this.state.prettyReponsesXML} options={codeMirrorOptions} />
          </div>
          <div role="tabpanel" className="tab-pane" id="details">
            <WebServiceStats webService={this.props.activeService} />
          </div>
        </div>
      </div>
    );
  }
  
};
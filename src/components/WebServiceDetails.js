import React, { Component } from 'react';
import { html as beautifyHTML } from 'js-beautify';
import CodeMirror from 'react-codemirror';
import Humanize from 'humanize-plus';
import moment from 'moment';
import 'codemirror/mode/xml/xml';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/theme/base16-dark.css';
import '../css/web-service-details.css';

export default class WebServiceDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      prettyResponseXML: ''
    };
  }

  handleResponseClick() {
    const self = this;
    this.props.activeService.request.getContent((rawResponseXML) => {
      const prettyResponseXML = beautifyHTML(rawResponseXML, { 'indent_size': 2 });
      self.setState(prevState => ({ prettyResponseXML }));
    })
  }

  render() {  
    //Check if object is empty
    if(!this.props.activeService) {
      return null;
    } else {
      const rawRequestXML = this.props.activeService.request.request.postData.text
      const prettyRequestXML = beautifyHTML(rawRequestXML, { 'indent_size': 2 });
      const codeMirrorOptions = {
        mode: 'xml',
        tabSize: 2,
        readOnly: true,
        theme: this.props.settings.useDarkTheme ? 'base16-dark' : 'default',
        lineNumbers: true,
        // foldGutter: true,
        // gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
      };
      const serviceDetails = {
        requestSize: Humanize.fileSize(this.props.activeService.request.request.bodySize),
        responseSize: Humanize.fileSize(this.props.activeService.request.response.bodySize),
        responseTimeMiliseconds: Math.ceil(this.props.activeService.request.time * 100) / 100,
        responseTimeSeconds: Math.ceil(this.props.activeService.request.time / 1000 * 100) / 100,
        startedDateTime: moment(this.props.activeService.request.startedDateTime).format('MM/DD/YYYY h:mm.ss a'),
        status: this.props.activeService.request.response.status
      }
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
              <CodeMirror value={this.state.prettyResponseXML} options={codeMirrorOptions} />
            </div>
            <div role="tabpanel" className="tab-pane service-details" id="details">
              <div className="detail"><span className="key">Service Name:</span> {this.props.activeService.name}</div>
              <div className="detail"><span className="key">Request Size:</span> {serviceDetails.requestSize}</div>
              <div className="detail"><span className="key">Response Size:</span> {serviceDetails.responseSize}</div>
              <div className="detail"><span className="key">Response Time:</span> {serviceDetails.responseTimeMiliseconds} ms ({serviceDetails.responseTimeSeconds} s)</div>
              <div className="detail"><span className="key">Started Date Time:</span> {serviceDetails.startedDateTime}</div>
              <div className="detail"><span className="key">Response Status:</span> {serviceDetails.status}</div>
            </div>
          </div>
        </div>
      );
    }
  }
  
};
import React, { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import WebServiceStats from '../WebServiceStats';
import 'brace/theme/github';
import 'brace/theme/tomorrow_night';
import 'brace/mode/xml';
import './WebServiceDetails.css';

export default class WebServiceDetails extends Component {

  componentDidUpdate() {
    if(this.requestEditor) {
      this.requestEditor.editor.scrollToLine(0, false, false);
      this.requestEditor.refEditor.getElementsByClassName('ace_scrollbar-h')[0].scrollLeft = 0;
    }
    if(this.responseEditor) {
      this.responseEditor.editor.scrollToLine(0, false, false);
      this.responseEditor.refEditor.getElementsByClassName('ace_scrollbar-h')[0].scrollLeft = 0;
    }
  }

  render() {
    const { activeService, settings } = this.props;
    if(!activeService) return null;
    // Map SOAP Analyzer themes to brace themes
    const editorTheme = {
      'default': 'github',
      'dark': 'tomorrow_night'
    };
    const editorSettings = {
      mode: 'xml', theme: editorTheme[settings.theme],
      fontSize: 15,
      tabSize: 2,
      readOnly: true,
      width: 'inherit',
      height: 'calc(100vh - 63px)',
      showPrintMargin: false,
      highlightActiveLine: false,
      editorProps: {$blockScrolling: true}
    };
    const requestSettings = Object.assign({}, editorSettings, {
      value: activeService.prettyRequest,
      ref: (requestEditor) => { this.requestEditor = requestEditor; }
    });
    const responseSettings = Object.assign({}, editorSettings, {
      value: activeService.prettyResponse,
      ref: (responseEditor) => { this.responseEditor = responseEditor; }
    });
    return (
      <div className="WebServiceDetails">
        <ul className="nav nav-tabs" role="tablist">
          <li className="active">
            <a data-toggle="tab" href="#request">Request</a>
          </li>
          <li>
            <a data-toggle="tab" href="#response">Response</a>
          </li>
          <li>
            <a data-toggle="tab" href="#details">Details</a>
          </li>
        </ul>
        <div className="service-detail tab-content">
          <div role="tabpanel" className="tab-pane active" id="request">
            <AceEditor {...requestSettings} />
          </div>
          <div role="tabpanel" className="tab-pane" id="response">
            <AceEditor {...responseSettings} />
          </div>
          <div role="tabpanel" className="tab-pane" id="details">
            <WebServiceStats webService={activeService} />
          </div>
        </div>
      </div>
    );
  }

}
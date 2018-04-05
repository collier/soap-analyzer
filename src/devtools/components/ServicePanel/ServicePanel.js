import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import StatList from '../StatList/StatList';
import Tabs from '../Tabs/Tabs';
import TabPanel from '../TabPanel/TabPanel';
import 'brace/theme/github';
import 'brace/theme/tomorrow_night';
import 'brace/mode/xml';
import './ServicePanel.css';

class ServicePanel extends React.Component {
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
      height: 'calc(100vh - 45px)',
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
      <div className="ServicePanel">
        <Tabs>
          <TabPanel name="Request" id="request" isActive={true} key="1">
            <AceEditor {...requestSettings} />
          </TabPanel>
          <TabPanel name="Response" id="response" key="2">
            <AceEditor {...responseSettings} />
          </TabPanel>
          <TabPanel name="Details" id="details" key="3">
            <StatList webService={activeService} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default ServicePanel;

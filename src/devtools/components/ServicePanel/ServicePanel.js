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

  constructor(props) {
    super(props);
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(this.requestEditor) {
      this.requestEditor.editor.scrollToLine(0, false, false);
      this.requestEditor.refEditor.getElementsByClassName('ace_scrollbar-h')[0].scrollLeft = 0;
    }
    if(this.responseEditor) {
      this.responseEditor.editor.scrollToLine(0, false, false);
      this.responseEditor.refEditor.getElementsByClassName('ace_scrollbar-h')[0].scrollLeft = 0;
    }
  }

  handleTabClick(activeTabName) {
    /*
     * Address issue with ace editor, where editor does not update if initially
     * hidden, have to trigger update on resize
     * https://github.com/securingsincity/react-ace/issues/204
     */
    if(activeTabName === 'Request' || this.requestEditor) {
      this.requestEditor.editor.resize();
      this.requestEditor.editor.renderer.updateFull();
      this.requestEditor.editor.clearSelection();
    }
    if(activeTabName === 'Response' && this.responseEditor) {
      this.responseEditor.editor.resize();
      this.responseEditor.editor.renderer.updateFull();
      this.requestEditor.editor.clearSelection();
    }
  }

  render() {
    const { activeService, theme, hideXmlns, onlyBody } = this.props;
    if(!activeService) return null;
    // Map SOAP Analyzer themes to brace themes
    const editorTheme = {
      'default': 'github',
      'dark': 'tomorrow_night'
    };
    const editorSettings = {
      mode: 'xml',
      theme: editorTheme[theme],
      fontSize: 15,
      tabSize: 2,
      readOnly: true,
      width: 'inherit',
      height: 'calc(100vh - 58px)',
      showPrintMargin: false,
      highlightActiveLine: false,
      editorProps: {$blockScrolling: true}
    };
    let requestValue;
    let responseValue;
    if(hideXmlns && !onlyBody) {
      requestValue = activeService.prettyRequestNoXmlns;
      responseValue = activeService.prettyResponseNoXmlns;
    } else if(!hideXmlns && onlyBody) {
      requestValue = activeService.prettyRequestOnlyBody;
      responseValue = activeService.prettyResponseOnlyBody;
    } else if(hideXmlns && onlyBody) {
      requestValue = activeService.prettyRequestNoXmlnsOnlyBody;
      responseValue = activeService.prettyResponseNoXmlnsOnlyBody;
    } else {
      requestValue = activeService.prettyRequest;
      responseValue = activeService.prettyResponse;
    }
    const requestSettings = Object.assign({}, editorSettings, {
      value: requestValue,
      ref: (requestEditor) => { this.requestEditor = requestEditor; }
    });
    const responseSettings = Object.assign({}, editorSettings, {
      value: responseValue,
      ref: (responseEditor) => { this.responseEditor = responseEditor; }
    });
    return (
      <div className="ServicePanel">
        <Tabs activeTab="Request" onTabClick={this.handleTabClick}>
          <TabPanel name="Request" key="1">
            <AceEditor {...requestSettings} />
          </TabPanel>
          <TabPanel name="Response" key="2">
            <AceEditor {...responseSettings} />
          </TabPanel>
          <TabPanel name="Details" key="3">
            <StatList webService={activeService} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }

}

export default ServicePanel;

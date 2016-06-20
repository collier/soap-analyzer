
var ServiceDetailsView = Marionette.LayoutView.extend({

  template: Util.compile('app_components/ServiceDetailsView/ServiceDetailsView.hbs'),

  ui: {
    requestXMLDiv: '.request-xml',
    responseXMLDiv: '.response-xml'
  },

  onBeforeShow: function() {
    var self = this;
    var requestXML = this.model.get('request').request.postData.text;
    var prettyRequestXML = html_beautify(requestXML, Config.JS_BEAUTIFY_CONFIG);
    this.ui.requestXMLDiv.text(prettyRequestXML);
    this.model.get('request').getContent(function(content) {
      try {
        var prettyResponseXML = html_beautify(content, Config.JS_BEAUTIFY_CONFIG);
        self.ui.responseXMLDiv.text(prettyResponseXML);
      } catch(err) {
        self.ui.responseXMLDiv.text('Unable to parse response');
      }
    });
  }

});
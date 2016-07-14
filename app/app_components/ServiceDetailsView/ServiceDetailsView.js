
var ServiceDetailsView = Marionette.LayoutView.extend({

  template: Util.compile('app_components/ServiceDetailsView/ServiceDetailsView.hbs'),

  ui: {
    serviceDetail: '.service-detail',
    requestTab: 'a[href="#request"]',
    requestPane: '#request',
    responseTab: 'a[href="#response"]',
    responsePane: '#response',
    allTab: 'a[href="#all"]',
    allPane: '#all',
    detailsTab: 'a[href="#details"]',
    detailsPane: '#details'
  },

  regions: {
    requestPane: '@ui.requestPane',
    responsePane: '@ui.responsePane',
    allPane: '@ui.allPane',
    detailsPane: '@ui.detailsPane'
  },

  events: {
    'click @ui.requestTab' : 'onClickRequestTab',
    'click @ui.responseTab' : 'onClickResponseTab',
    'click @ui.allTab' : 'onClickAllTab',
    'click @ui.detailsTab' : 'onClickDetailsTab'
  },

  onBeforeShow: function() {
    var requestXML = this.model.get('request').request.postData.text;
    this.model.set('prettyRequestXML', html_beautify(requestXML, Config.JS_BEAUTIFY_CONFIG));
    this.showChildView('requestPane', new RequestView({
      model: this.model
    }));
  },

  onClickRequestTab : function() {
    this.resetScrollBar();
    this.showChildView('requestPane', new RequestView({
      model: this.model
    }));
  },

  onClickResponseTab : function() {
    var self = this;
    this.resetScrollBar();
    this.setResponse().done(function() {
      self.showChildView('responsePane', new ResponseView({
        model: self.model
      }));
    });
  },

  onClickAllTab : function() {
    var self = this;
    this.resetScrollBar();
    this.setResponse().done(function() {
      self.showChildView('allPane', new AllView({
        model: self.model
      }));
    });
  },

  onClickDetailsTab : function() {
    this.resetScrollBar();
    this.showChildView('detailsPane', new DetailsView({
      model: this.model
    }));
  },

  setResponse : function() {
    var self = this;
    var deferred = $.Deferred();
    if(!this.model.get('prettyResponseXML') || this.model.get('prettyResponseXML') === Config.ERROR_PARSE_RESPONSE) {
      this.model.get('request').getContent(function(content) {
        try {
          self.model.set('prettyResponseXML', html_beautify(content, Config.JS_BEAUTIFY_CONFIG));
          deferred.resolve();
        } catch(err) {
          self.model.set('prettyResponseXML', Config.ERROR_PARSE_RESPONSE);
          deferred.resolve();
        }
      });
    } else {
      deferred.resolve();
    }
    return deferred.promise();
  },

  resetScrollBar : function() {
    this.ui.serviceDetail.scrollTop(0);
  }

});

var NetworkView = Marionette.LayoutView.extend({

  template: Util.compile('app_components/NetworkView/NetworkView.hbs'),

  ui: {
    serviceUl: '.web-service-list .list-group',
    serviceDiv: '.service-details-container',
    headerDiv: '.header-container'
  },

  regions: {
    header: '@ui.headerDiv',
    webServiceList: '@ui.serviceUl',
    serviceDetails: '@ui.serviceDiv'
  },

  childEvents: {
    'collection:service:clicked': 'onServiceClick',
    'collection:service:cleared': 'onClearLog'
  },

  onBeforeShow: function() {
    var self = this;

    this.showChildView('header', new HeaderView());

    this.webServiceList = new WebServiceListView({
      collection : new Backbone.Collection([])
    });
    this.showChildView('webServiceList', this.webServiceList);

    chrome.devtools.network.onRequestFinished.addListener(function(request) {
      var contentType = _.findWhere(request.request.headers, { name: 'Content-Type' });
      if(contentType) {
        if(contentType.value.indexOf('text/xml') > -1) {
          var requestXML = $.xml2json(request.request.postData.text, true);
          var webServiceName = Object.getOwnPropertyNames(requestXML.Body[0])[0];
          self.webServiceList.collection.add(new Backbone.Model({
            webServiceName: webServiceName,
            request: request
          }));
        }
      }
    });
  },

  onServiceClick: function(collectionView, model) {
    this.showChildView('serviceDetails', new ServiceDetailsView({
      model: model
    }));
  },

  onClearLog: function() {
    this.ui.serviceDiv.empty();
    this.webServiceList.collection.reset();
  }

});
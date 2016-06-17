
var NetworkView = Marionette.LayoutView.extend({

  template: Util.compile('scripts/app/views/NetworkView/NetworkView.hbs'),

  onBeforeShow: function() {
    chrome.devtools.network.onRequestFinished.addListener(function(request) {
      var contentType = _.findWhere(request.request.headers, { name: 'Content-Type' });
      if(contentType) {
        if(contentType.value.indexOf('text/xml') > -1) {
          console.log(request);
        }
      }
    });
  }

});
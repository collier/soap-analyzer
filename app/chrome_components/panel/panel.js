
var app = new Marionette.Application();

app.addRegions({
  content: '#content'
});

app.on('start', function () {
  chrome.storage.sync.get(null, function(settings) {
    app.content.show(new NetworkView({
      model: new Backbone.Model({
        settings: settings
      })
    }));
  });
});

app.start();
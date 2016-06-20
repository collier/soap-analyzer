
var app = new Marionette.Application();

app.addRegions({
  content: '#content'
});

app.on('start', function () {
  app.content.show(new NetworkView());
});

app.start();
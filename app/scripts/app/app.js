
var app = new Marionette.Application();

app.addRegions({
  header: '#header',
  content: '#content',
  footer: '#footer'
});

app.on('start', function () {
  app.content.show(new NetworkView());
});

app.start();
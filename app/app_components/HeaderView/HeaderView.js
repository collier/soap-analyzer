
var HeaderView = Marionette.LayoutView.extend({

  template: Util.compile('app_components/HeaderView/HeaderView.hbs'),

  ui: {
    clearLog: '.clear-log'
  },

  triggers: {
    'click @ui.clearLog': 'collection:service:cleared'
  }

});
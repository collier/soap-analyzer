
var HeaderView = Marionette.LayoutView.extend({

  template: Util.compile('app_components/views/HeaderView/HeaderView.hbs'),

  ui: {
    clearLog: '.clear-log',
    hideEnvelope: '.hide-envelope-body'
  },

  events: {
    'change @ui.hideEnvelope': 'onChangeHideEnvelope'
  },

  triggers: {
    'click @ui.clearLog': 'collection:service:cleared'
  },

  onChangeHideEnvelope: function(e) {
    this.triggerMethod('toggle:envelope', this.ui.hideEnvelope.is(':checked'));
  }

});
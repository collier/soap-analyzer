
var WebServiceItemView = Marionette.ItemView.extend({

  template: Util.compile('app_components/WebServiceItemView/WebServiceItemView.hbs'),

  className: 'list-group-item-container',

  ui: {
    listItem: '.list-group-item'
  },

  triggers: {
    'click @ui.listItem': 'service:clicked'
  },

  markSelected: function() {
    this.ui.listItem.addClass('selected');
  },

  markDeselected: function() {
    this.ui.listItem.removeClass('selected');
  }

});

var WebServiceListView = Marionette.CollectionView.extend({

  childView: WebServiceItemView,

  className: 'list-container',

  childEvents: {
    'service:clicked': 'onChildServiceClicked'
  },

  onChildServiceClicked: function(childView) {
    this.children.each(function(view) {
      view.markDeselected();
    });
    childView.markSelected();
    this.triggerMethod('collection:service:clicked', childView.model);
  }

});
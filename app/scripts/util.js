
var UtilClass = Marionette.Object.extend({

  compile : function(location) {
    var self = this;
    if(this.templates == null) {
      this.templates = {};
    }
    var template = this.templates[location];
    if (!template) {
      $.ajax({
        url : chrome.extension.getURL(location),
        async : false,
        success : function(data) {
          console.log(data);
          self.templates[location] = Handlebars.compile(data);
          template = self.templates[location];
        }
      });
    }
    return template;
  }

});

var Util = new UtilClass();
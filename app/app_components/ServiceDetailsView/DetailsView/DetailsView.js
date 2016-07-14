
var DetailsView = Marionette.ItemView.extend({

  template: Util.compile('app_components/ServiceDetailsView/DetailsView/DetailsView.hbs'),

  initialize: function() {
    var request = this.model.get('request');
    this.model.set({
      requestSize: filesize(request.request.bodySize),
      responseSize: filesize(request.response.bodySize),
      responseTimeMiliseconds: Math.ceil(request.time * 100) / 100,
      responseTimeSeconds: Math.ceil(request.time / 1000 * 100) / 100,
      startedDateTime: moment(request.startedDateTime).format(Config.DATE_TIME_FORMAT),
      status: request.response.status
    });
  }

});
(function () {

  var ReportDataRequest = function (options) {
    this.form = $('#main form');
    this.queue();
    this.callback = options.callback;
    this.period = options.period || false;
  };
  window.ReportDataRequest = ReportDataRequest;

  ReportDataRequest.requestId = 0;

  ReportDataRequest.hasCurrentRequest = function () {
    return ReportDataRequest.requestId > 0;
  };

  $.extend(ReportDataRequest.prototype, {
    requestUrls: {
      'default' : '/dispatches/totals/last-7-days',
      'day'     : '/dispatches/totals/last-24-hours',
      'week'    : '/dispatches/totals/last-7-days',
      'month'   : '/dispatches/totals/last-30-days',
      'year'    : '/dispatches/totals/last-year-to-date'
    },

    url: function () {
      var url = this.requestUrls[this.period];
      return url !== undefined ? url : this.requestUrls['default'];
    },

    queue: function () {
      if (ReportDataRequest.hasCurrentRequest()) { return; }
      var that = this;
      ReportDataRequest.requestId = setTimeout(function () {
        that.submit();
      }, 250);
    },

    submit: function () {
      var that = this;
      $.post(this.url(), this.form.serialize(), function (data) {
        that.updateData(data);
      }, 'json');
    },

    updateData: function (data) {
      this.callback(data);
      ReportDataRequest.requestId = 0;
    }
  });

})();

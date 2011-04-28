(function () {

  var ReportDataRequest = function (options) {
    this.form = $('#main form');
    this.url = '/dispatches/totals/last-7-days';
    this.queue();
    this.callback = options.callback;
  };
  window.ReportDataRequest = ReportDataRequest;

  ReportDataRequest.requestId = 0;

  ReportDataRequest.hasCurrentRequest = function () {
    return ReportDataRequest.requestId > 0;
  };

  $.extend(ReportDataRequest.prototype, {
    queue: function () {
      if (ReportDataRequest.hasCurrentRequest()) { return; }
      var that = this;
      ReportDataRequest.requestId = setTimeout(function () {
        that.submit();
      }, 250);
    },

    submit: function () {
      var that = this;
      $.post(this.url, this.form.serialize(), function (data) {
        that.updateData(data);
      }, 'json');
    },

    updateData: function (data) {
      this.callback(data);
      ReportDataRequest.requestId = 0;
    }
  });

})();

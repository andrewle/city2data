(function () {

  var ReportDataRequest = function () {
    this.form = $('#main form');
    this.url = '/dispatches/totals/last-7-days';
    this.queue();
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
      $.post(this.url, this.form.serialize(), this.updateData, 'json');
    },

    updateData: function (data) {
      console.log(data); 
      ReportDataRequest.requestId = 0;
    }
  });

})();

(function () {

  var DataServiceRequest = function () {
    this.form = $('#main form');
    this.url = '/dispatches/totals/last-7-days';
    this.queue();
  };
  window.DataServiceRequest = DataServiceRequest;

  DataServiceRequest.requestId = 0;

  DataServiceRequest.hasCurrentRequest = function () {
    return DataServiceRequest.requestId > 0;
  };

  $.extend(DataServiceRequest.prototype, {
    queue: function () {
      if (DataServiceRequest.hasCurrentRequest()) { return; }
      var that = this;
      DataServiceRequest.requestId = setTimeout(function () {
        that.submit();
      }, 250);
    },

    submit: function () {
      $.post(this.url, this.form.serialize(), this.updateData, 'json');
    },

    updateData: function (data) {
      console.log(data); 
      DataServiceRequest.requestId = 0;
    }
  });

})();

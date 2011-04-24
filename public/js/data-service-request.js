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

  DataServiceRequest.prototype.queue = function () {
    if (DataServiceRequest.hasCurrentRequest()) { return; }
    var that = this;
    DataServiceRequest.requestId = setTimeout(function () {
      that.submit();
    }, 250);
  };

  DataServiceRequest.prototype.submit = function () {
    $.getJSON(this.url, this.form.serialize(), this.updateData);
  };

  DataServiceRequest.prototype.updateData = function (data) { 
    console.log(data); 
    DataServiceRequest.requestId = 0;
  };
})();

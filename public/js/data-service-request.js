(function () {

  var DataServiceRequest = function () {
    this.form = $('#main form');
    this.url = '/';
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
    console.log($('#main form').serialize());
    DataServiceRequest.requestId = 0;
  };
})();

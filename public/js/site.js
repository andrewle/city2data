var Chart = function () {
  this.r = Raphael("the-graph");
  this.fetchData();
  return this.chart;
};

Chart.prototype.fetchData = function () {
  var that = this;
  $.getJSON('/dispatches/totals/last-7-days', function (data) {
    var labels = [], values = [];

    $.each(data, function () {
      labels.push(this.emergency_type);
      values.push(this.total_reported);
    });

    that.data = {
      values: values,
      labels: labels
    };
    
    that.draw();
  });
};

Chart.processDataAndDraw = function () {
};

Chart.prototype.generateColors = function () {
  var colors = [
    "rgb(247, 150, 103)",
    "rgb(244, 122, 75)",
    "rgb(242, 93, 69)",
    "rgb(210, 31, 47)",
    "rgb(209, 28, 89)",
    "rgb(237, 0, 136)",
    "rgb(131, 56, 133)",
    "rgb(126, 102, 157)",
    "rgb(128, 160, 207)",
    "rgb(91, 179, 223)",
    "rgb(0, 175, 233)",
    "rgb(0, 156, 211)",
    "rgb(1, 113, 153)",
    "rgb(0, 173, 176)",
    "rgb(52, 144, 123)",
    "rgb(50, 143, 72)",
    "rgb(73, 107, 44)",
    "rgb(115, 118, 40)",
    "rgb(187, 165, 53)",
    "rgb(255, 216, 124)",
    "rgb(243, 235, 8)",
    "rgb(253, 192, 131)"
  ];
  return colors;
};

Chart.prototype.draw = function () {
  var 
      data   = this.data.values,
      labels = this.data.labels,
      opts   = {colors: this.generateColors() },
      chart  = this.r.g.barchart(0, 10, 700, 345, data, opts);
  return (this.chart = chart);
};

$(function () {
  $('#header .nav li').click(function (event) {
    event.preventDefault();
    $(this).siblings().removeClass('current');
    $(this).addClass('current');
  });

  var chart = new Chart();
});

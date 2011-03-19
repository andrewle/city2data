var Chart = function () {
  this.r = Raphael("the-graph");
  this.fetchData();
  this.draw();
  return this.chart;
};

Chart.prototype.fetchData = function () {
  var data = {
    values: [55, 20, 13, 32, 5, 1, 2, 10],
    labels: []
  };

  $.each(data.values, function (i, val) {
    data.labels.push('label'  + i);
  });

  return (this.data = data);
};

Chart.prototype.draw = function () {
  var 
      data   = this.data.values,
      labels = this.data.labels,
      chart  = this.r.g.barchart(0, 10, 700, 345, data);
  chart.label(labels, true);
  return (this.chart = chart);
};

$(function () {
  $('#header .nav li').click(function () {
    $(this).siblings().removeClass('current');
    $(this).addClass('current');
  });

  var chart = new Chart();
});

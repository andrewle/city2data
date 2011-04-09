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
  var hues = [0.6, 0.2, 0.05, 0.1333, 0.75, 0],
      len = this.data.values.length,
      colors = [];

  for (var i = 0; i < len; i++) {
    if (i < hues.length) {
      colors.push("hsb(" + hues[i] + ", .75, .75)");
    } else {
      var m = Math.floor(i/hues.length),
          x = m > 1 ? hues.length : 0;
      colors.push("hsb(" + hues[i - x - hues.length] + ", 1, .5)");
    }
  }
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

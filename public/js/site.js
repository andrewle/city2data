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

Chart.colors = [
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

Chart.prototype.fin = function () {
  var that = this;
  return function () {
    var popup = $('<div class="graph-popup"><span>&#9662;</span></div>');
    var text = that.data.labels[this.bar.id],
        textCount = ": " + this.bar.value;
    popup.appendTo('body');
    popup.prepend("<p>" + text + textCount + "</p>");

    var canvasLeft = this.paper.canvas.offsetLeft,
        canvasTop  = this.paper.canvas.offsetTop,
        pWidth     = popup.outerWidth(),
        pHeight    = popup.outerHeight(),
        xAdjust    = 3,
        yAdjust    = -5,
        pTop       = this.bar.y + canvasTop - pHeight + yAdjust,
        pLeft      = this.bar.x + canvasLeft - pWidth / 2 + xAdjust;

    popup.css({ top: pTop, left: pLeft });
    this.popup = popup;
  };
};

Chart.prototype.fout = function () {
  this.popup.fadeOut('fast');
};

Chart.prototype.draw = function () {
  var 
      data   = this.data.values,
      labels = this.data.labels,
      opts   = {colors: Chart.colors },
      chart  = this.r.g.barchart(0, 25, 700, 345, data, opts);

  chart.hover(this.fin(), this.fout);
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

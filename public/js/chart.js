var Chart = function () {
  $('#the-graph').empty();
  this.r = Raphael("the-graph");
  this.fetchData();
  return this.chart;
};

Chart.prototype.fetchData = function () {
  var that = this;
  return new ReportDataRequest({
    callback: function (data) {
      that.update(data);
    }
  });
};

Chart.prototype.update = function (data) {
  var labels = [], values = [];

  $.each(data, function () {
    labels.push(this.emergency_type);
    values.push(this.total_reported);
  });

  this.data = {
    values: values,
    labels: labels
  };

  this.draw();
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
  "rgb(253, 192, 131)",
  "rgb(223, 181, 91)",
  "rgb(233, 138, 0)",
  "rgb(211, 128, 0)",
  "rgb(176, 64, 0)",
  "rgb(144, 63, 52)",
  "rgb(143, 50, 89)",
  "rgb(100, 44, 107)",
  "rgb(70, 40, 118)",
  "rgb(78, 53, 187)",
  "rgb(131, 124, 255)",
  "rgb(131, 149, 253)"
];

Chart.prototype.fin = function () {
  var that = this;
  return function () {
    var popup = $('<div class="graph-popup"><span>&#9662;</span></div>');
    var text = this.bar.label,
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
  this.popup.fadeOut('fast', function () {
    $(this).remove();
  });
};

Chart.prototype.associateLabels = function (chart) {
  var labels = this.data.labels;
  $.each(chart.bars, function (i, bar) {
    bar.label = labels[i];
  });
};

Chart.prototype.draw = function () {
  var 
      data   = this.data.values,
      labels = this.data.labels,
      opts   = {colors: Chart.colors },
      chart  = this.r.g.barchart(0, 25, 700, 345, data, opts);

  this.associateLabels(chart);
  chart.hover(this.fin(), this.fout);
  return (this.chart = chart);
};

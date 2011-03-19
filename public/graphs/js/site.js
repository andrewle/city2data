window.Data = [55, 20, 13, 32, 5, 1, 2, 10];

$(function () {

  $('#header .nav li').click(function () {
    $(this).siblings().removeClass('current');
    $(this).addClass('current');
  });

  var r = Raphael("holder");
  var data = window.Data;
  var chart = r.g.barchart(0, 10, 700, 345, data);

  var labels = [];
  $.each(data, function (i, val) {
    labels.push('label'  + i);
  });

  chart.label(labels, true);
  console.log(labels);
});

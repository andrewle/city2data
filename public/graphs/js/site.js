$(function () {

  $('#header .nav li').click(function () {
    $(this).siblings().removeClass('current');
    $(this).addClass('current');
  });
});

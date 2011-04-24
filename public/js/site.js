$(function () {
  $('#header .nav li').click(function (event) {
    event.preventDefault();
    $(this).siblings().removeClass('current');
    $(this).addClass('current');
  });

  $('#emergency-types-selector').superSelect({
    optionSelectors: 'li',
    multi: true,
    onSelectOption: {
      DEFAULT: function (value, isSelected) {
        return new DataServiceRequest();
      }
    }
  });

  $('#meta-types-selector').superSelect({
    optionSelectors: 'input',
    multi: false,
    onSelectOption: {
      all: function () {
        var options = $('#emergency-types-selector li');
        options.addClass('selected');
        options.find('input').attr('checked', true);
        return new DataServiceRequest();
      },

      none: function () {
        var options = $('#emergency-types-selector li');
        options.removeClass('selected');
        options.find('input').attr('checked', false);
      }
    }
  });

  $('#date-view-selector').superSelect({
    optionSelectors: 'input',
    multi: false
  });

  $('#graph-type-selector').superSelect({
    optionSelectors: 'input',
    multi: false
  });

  var chart = new Chart();
});

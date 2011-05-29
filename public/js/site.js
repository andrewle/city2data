$(function () {
  function updateData() {
    var period = $('#date-view-selector input.selected').val().toLowerCase();
    var receiveDataCallback = function (data) {
      var store = window.reportData;
      store.loadData(data);

      var swatchUpdater = new SwatchUpdater(store);
      swatchUpdater.update();
    };

    return new ReportDataRequest({
      period: period,
      callback: receiveDataCallback
    });
  }

  $('#header .nav li').click(function (event) {
    event.preventDefault();
    $(this).siblings().removeClass('current');
    $(this).addClass('current');
  });

  $('#emergency-types-selector').superSelect({
    optionSelectors: 'li',
    multi: true,
    onSelectOption: {
      DEFAULT: updateData
    }
  });

  $('#meta-types-selector').superSelect({
    optionSelectors: 'input',
    multi: false,
    onSelectOption: {
      all: function () {
        var options = $('#emergency-types-selector li');
        $.each(options, function (i, opt) {
          opt = $(opt);
          if (opt.find('label').hasClass('disabled')) {
            return;
          }
          opt.addClass('selected');
          opt.find('input').attr('checked', true);
        });
        updateData();
      },

      reset: function () {
        var options = $('#emergency-types-selector li');
        options.removeClass('selected');
        options.find('input').attr('checked', false);
        updateData();
      }
    }
  });

  $('#date-view-selector').superSelect({
    optionSelectors: 'input',
    multi: false,
    onSelectOption: {
      DEFAULT: function () {
        var options = $('#emergency-types-selector li');
        options.removeClass('selected');
        options.find('input').attr('checked', false);

        SwatchUpdater.clearSwatches();
        updateData();
      }
    }
  });

  $('#graph-type-selector').superSelect({
    optionSelectors: 'input',
    multi: false
  });

});

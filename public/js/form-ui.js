(function ($) {

  var superSelect = function (opts, context) {
    this.el = context;
    this.optionSelectors = opts.optionSelectors;
    this.multi = opts.multi || false;
    this.options = $(this.optionSelectors, context);
    this.selectEvents = opts.onSelectOption || {};
    this.bindEvents();
  };

  $.extend(superSelect.prototype, {
    bindEvents: function () {
      this.el.delegate(this.optionSelectors, 'click', this.toggleOption());
    },

    toggleOption: function () {
      var that = this;
      return function (event) {
        event.preventDefault();
        var el = $(this),
            input = el.find('input'),
            isSelected = el.hasClass('selected'),
            shouldBeSelected = !isSelected;

        if (el.find('label').hasClass('disabled')) { return; }

        if (that.multi === false) {
         that.options.removeClass('selected');
        }

        el.toggleClass('selected', shouldBeSelected);

        if (input.length) {
          input.attr('checked', shouldBeSelected);
        }

        that.fireSelectOptionCallback(
          that.optionVal(el, input), shouldBeSelected);
      };
    },

    optionVal: function (el, input) {
      if (el.get(0).tagName.toLowerCase() == 'input') {
        return el.val();
      } else {
        return input.val();
      }
    },

    fireSelectOptionCallback: function (value, isSelected) {
      var callback = this.selectEvents[value];
      callback = callback === undefined ? this.selectEvents.DEFAULT : callback;
      if (callback !== undefined) { callback(value, isSelected); }
    }
  });

  $.fn.superSelect = function (opts) {
    var ss = new superSelect(opts, this);
    return this;
  };

})(jQuery);

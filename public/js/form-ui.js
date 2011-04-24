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
        var el = $(this);
        var input = el.find('input');

        if (that.multi === false) {
         that.options.removeClass('selected');
        }

        el.toggleClass('selected', !el.hasClass('selected'));

        if (input.length) {
          input.attr('checked', el.hasClass('selected'));
        }

        if (el.hasClass('selected') && el.val().length) {
          that.fireSelectOptionCallback(el.val());
        }
      };
    },

    fireSelectOptionCallback: function (key) {
      var callback = this.selectEvents[key];
      if (callback !== undefined) { callback(); }
    }
  });

  $.fn.superSelect = function (opts) {
    var ss = new superSelect(opts, this);
    return this;
  };

})(jQuery);

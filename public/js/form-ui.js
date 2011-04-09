(function ($) {

  var superSelect = function (opts, context) {
    this.el = context;
    this.optionSelectors = opts.optionSelectors;
    this.multi = opts.multi || false;
    this.options = $(this.optionSelectors, context);
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
        if (that.multi === false) {
         that.options.removeClass('selected');
        }
        el.toggleClass('selected', !el.hasClass('selected'));
      };
    }
  });

  $.fn.superSelect = function (opts) {
    var ss = new superSelect(opts, this);
    return this;
  };

})(jQuery);

(function () {
  var SwatchUpdater = function (store) {
    this.store = store;
  };
  window.SwatchUpdater = SwatchUpdater;

  SwatchUpdater.clearSwatches = function () {
    $('#emergency-types-selector .swatch').hide();
    $('#emergency-types-selector label').
      removeClass('disabled').
        addClass('disabled');
  };

  $.extend(SwatchUpdater.prototype, {
    update: function () {
      var that = this;
      this.store.each(function (record) {
        var type = record.get('emergency_type');
        that.updateSwatchColor(type);
      });
    },

    updateSwatchColor: function (type) {
      var color = Chart.getColorForType(type);
      type = type.replace(/(\W|\s)/g, '').toLowerCase();
      var swatch = $("#" + type + " .swatch");
      swatch.css({'background-color': color}).show();
      $("#" + type + " label").removeClass('disabled');
    }
  });
})();

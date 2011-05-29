(function () {
  var SwatchUpdater = function (store) {
    this.store = store;
    this.clearSwatches();
    this.update();
  };
  window.SwatchUpdater = SwatchUpdater;

  $.extend(SwatchUpdater.prototype, {
    clearSwatches: function () {
      $('#emergency-types-selector label').
        removeClass('disabled').
        addClass('disabled');
    },

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

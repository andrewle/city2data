Ext.require('Ext.chart.*');
Ext.require(['Ext.Window', 'Ext.layout.container.Fit', 'Ext.fx.target.Sprite']);

Ext.onReady(function () {
  function createDataStore (data) {
    window.reportData = Ext.create('Ext.data.JsonStore', {
      fields: ['emergency_type', 'total_reported'],
      data: data 
    });

    bootstrap();
  }

  function bootstrap() {
    var win = Ext.create('Ext.Window', {
      width: 710,
      height: 600,
      hidden: false,
      maximizable: false,
      renderTo: Ext.get('the-graph'),
      layout: 'fit',
      resizable: false,
      draggable: false,
      closable: false,
      x: 0,
      y: 0,
      border: 0,
      items: {
        id: 'chartCmp',
        xtype: 'chart',
        style: 'background:#ccc',
        animate: true,
        shadow: true,
        store: reportData,
        axes: [{
          type: 'Numeric',
          position: 'left',
          fields: ['total_reported'],
          label: {
            renderer: Ext.util.Format.numberRenderer('0,0')
          },
          title: 'Total Reported',
          grid: true,
          minimum: 0
        }, {
          type: 'Category',
          position: 'bottom',
          fields: ['emergency_type'],
          title: 'Emergency Type'
        }],
        series: [{
          type: 'column',
          axis: 'left',
          contrast: true,
          highlight: true,
          tips: {
            trackMouse: true,
            width: 140,
            height: 28,
            renderer: function(storeItem, item) {
              this.setTitle(storeItem.get('emergency_type') + ': ' + storeItem.get('total_reported') + ' $');
            }
          },
          label: {
            display: 'insideEnd',
            'text-anchor': 'middle',
            field: 'total_reported',
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'vertical',
            color: '#333'
          },
          xField: 'emergency_type',
          yField: 'total_reported',
          //color renderer
          renderer: function(sprite, record, attr, index, store) {
            var fieldValue = Math.random() * 20 + 10;
            var value = (record.get('total_reported') >> 0) % 5;
            var color = ['rgb(213, 70, 121)', 
              'rgb(44, 153, 201)', 
              'rgb(146, 6, 157)', 
              'rgb(49, 149, 0)', 
              'rgb(249, 153, 0)'][value];
              return Ext.apply(attr, {
                fill: color
              });
          }
        }]
      }
    });
  }

  var data = new ReportDataRequest({
    callback: createDataStore
  });

});

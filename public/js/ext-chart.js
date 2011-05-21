Ext.require('Ext.chart.*');
Ext.require(['Ext.Window', 'Ext.layout.container.Fit', 'Ext.fx.target.Sprite']);

Ext.namespace('Chart');
Chart.colors = [
  "rgb(247, 150, 103)",
  "rgb(244, 122, 75)",
  "rgb(242, 93, 69)",
  "rgb(210, 31, 47)",
  "rgb(209, 28, 89)",
  "rgb(237, 0, 136)",
  "rgb(131, 56, 133)",
  "rgb(126, 102, 157)",
  "rgb(128, 160, 207)",
  "rgb(91, 179, 223)",
  "rgb(0, 175, 233)",
  "rgb(0, 156, 211)",
  "rgb(1, 113, 153)",
  "rgb(0, 173, 176)",
  "rgb(52, 144, 123)",
  "rgb(50, 143, 72)",
  "rgb(73, 107, 44)",
  "rgb(115, 118, 40)",
  "rgb(187, 165, 53)",
  "rgb(255, 216, 124)",
  "rgb(243, 235, 8)",
  "rgb(253, 192, 131)",
  "rgb(223, 181, 91)",
  "rgb(233, 138, 0)",
  "rgb(211, 128, 0)",
  "rgb(176, 64, 0)",
  "rgb(144, 63, 52)",
  "rgb(143, 50, 89)",
  "rgb(100, 44, 107)",
  "rgb(70, 40, 118)",
  "rgb(78, 53, 187)",
  "rgb(131, 124, 255)",
  "rgb(131, 149, 253)"
];

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
      height: 450,
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
          title: 'Emergency Type',
          label: {
            renderer: function () { return ''; }
          }
        }],
        series: [{
          type: 'column',
          axis: 'left',
          contrast: true,
          tips: {
            trackMouse: true,
            'min-width': 140,
            width: 200,
            renderer: function(storeItem, item) {
              this.setTitle(storeItem.get('emergency_type') + ': ' + storeItem.get('total_reported'));
            }
          },
          label: {
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

Ext.require('Ext.chart.*');
Ext.require(['Ext.Window', 'Ext.layout.container.Fit', 'Ext.fx.target.Sprite']);

Ext.onReady(function () {
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
      store: store1,
      axes: [{
        type: 'Numeric',
        position: 'left',
        fields: ['data1'],
        label: {
          renderer: Ext.util.Format.numberRenderer('0,0')
        },
        title: 'Number of Hits',
        grid: true,
        minimum: 0
      }, {
        type: 'Category',
        position: 'bottom',
        fields: ['name'],
        title: 'Month of the Year'
      }],
      series: [{
        type: 'column',
        axis: 'left',
        highlight: true,
        tips: {
          trackMouse: true,
          width: 140,
          height: 28,
          renderer: function(storeItem, item) {
            this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data1') + ' $');
          }
        },
        label: {
          display: 'insideEnd',
          'text-anchor': 'middle',
          field: 'data1',
          renderer: Ext.util.Format.numberRenderer('0'),
          orientation: 'vertical',
          color: '#333'
        },
        xField: 'name',
        yField: 'data1'
      }]
    }
  });
});

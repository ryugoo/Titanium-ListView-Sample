(function () {
    'use strict';
    Ti.UI.setBackgroundColor('#000000');

    // Left
    var left_win = Ti.UI.createWindow({
        backgroundColor: '#FFFFFF',
        title: 'ListView',
        layout: 'vertical'
    });

    // Start prepare ListView
    var list_item_create_start = Date.now();

    // ListView template
    var template = {
        properties: {
            height: '50dp'
        },
        childTemplates: [{
            type: 'Ti.UI.ImageView',
            bindId: 'icon',
            properties: {
                image: 'icon.png',
                top: '0dp',
                left: '0dp',
                width: '50dp',
                height: '50dp',
                bubbleParent: false
            },
            events: {
                click: function (e) {
                    alert('You clicked icon.');
                    Ti.API.debug(e);
                }
            }
        }, {
            type: 'Ti.UI.Label',
            bindId: 'name',
            properties: {
                font: {
                    fontWeight: 'bold',
                    fontSize: '16sp'
                },
                color: '#333333',
                top: '6dp',
                left: '60dp',
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE,
                bubbleParent: false
            },
            events: {
                click: function (e) {
                    alert('You clicked name.');
                    Ti.API.debug(e);
                }
            }
        }, {
            type: 'Ti.UI.Label',
            bindId: 'epoch',
            properties: {
                font: {
                    fontSize: '12sp'
                },
                color: '#666666',
                bottom: '6dp',
                left: '60dp',
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE,
                bubbleParent: false
            },
            events: {
                click: function (e) {
                    alert('You clicked epoch.');
                    Ti.API.debug(e);
                }
            }
        }]
    };

    // ListView item array
    var data = [];
    for (var i = 0, l = 250; i < l; i++) {
        data.push({
            name: {
                text: 'My Task #' + i
            },
            epoch: {
                text: parseInt(Date.now(), 10) + ''
            },
            properties: {
                itemId: 'row' + i,
                accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
            }
        });
    }

    // ListView section
    var section = Ti.UI.createListSection({
        items: data
    });

    // ListView
    var listview = Ti.UI.createListView({
        top: '0dp',
        left: '0dp',
        templates: {
            default: template
        },
        defaultItemTemplate: 'default',
        sections: [section]
    });

    // Finish prepare ListView
    var list_item_create_finish = Date.now();

    // ListView item click event handler
    listview.addEventListener('itemclick', function (e) {
        if (e.bindId === undefined) { // Row click
            var item = e.section.getItemAt(e.itemIndex);
            item.properties.accessoryType = item.properties.accessoryType === Ti.UI.LIST_ACCESSORY_TYPE_NONE ? Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK : Ti.UI.LIST_ACCESSORY_TYPE_NONE;
            e.section.updateItemAt(e.itemIndex, item);
        }
    });

    var list_prepare_view = Ti.UI.createView({
        top: '0dp',
        left: '0dp',
        width: Ti.UI.FILL,
        height: '44dp'
    });
    list_prepare_view.add(Ti.UI.createLabel({
        text: 'ListView : ' + (list_item_create_finish - list_item_create_start) + ' [ms]',
        font: {
            fontSize: '14sp',
            fontWeight: 'bold'
        }
    }));
    left_win.add(list_prepare_view);
    left_win.add(listview);
    var left_tab = Ti.UI.createTab({
        window: left_win,
        title: 'ListView'
    });

    // Right
    var right_win = Ti.UI.createWindow({
        backgroundColor: '#FFFFFF',
        title: 'TableView',
        layout: 'vertical'
    });

    // Start prepare TableView
    var table_item_create_start = Date.now();

    // TableViewRow array
    var table_data = [];
    for (var ii = 0, ll = 250; ii < ll; ii++) {
        var row = Ti.UI.createTableViewRow({
            height: '50dp',
            className: 'compare'
        });
        var row_icon = Ti.UI.createImageView({
            image: 'icon.png',
            top: '0dp',
            left: '0dp',
            width: '50dp',
            height: '50dp'
        });
        var row_name = Ti.UI.createLabel({
            font: {
                fontWeight: 'bold',
                fontSize: '16sp'
            },
            color: '#333333',
            top: '6dp',
            left: '60dp',
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            text: 'My Task #' + ii
        });
        var row_epoch = Ti.UI.createLabel({
            font: {
                fontSize: '12sp'
            },
            color: '#666666',
            bottom: '6dp',
            left: '60dp',
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            text: parseInt(Date.now(), 10) + ''
        });
        row.add(row_icon);
        row.add(row_name);
        row.add(row_epoch);
        table_data.push(row);
    }

    // TableView
    var tableview = Ti.UI.createTableView({
        top: '0dp',
        left: '0dp',
        data: table_data
    });

    // Finish prepare TableView
    var table_item_create_finish = Date.now();

    var table_prepare_view = Ti.UI.createView({
        top: '0dp',
        left: '0dp',
        width: Ti.UI.FILL,
        height: '44dp'
    });
    table_prepare_view.add(Ti.UI.createLabel({
        text: 'TableView : ' + (table_item_create_finish - table_item_create_start) + ' [ms]',
        font: {
            fontSize: '14sp',
            fontWeight: 'bold'
        }
    }));
    right_win.add(table_prepare_view);
    right_win.add(tableview);
    var right_tab = Ti.UI.createTab({
        window: right_win,
        title: 'TableView'
    });

    var tab_group = Ti.UI.createTabGroup();
    tab_group.addTab(left_tab);
    tab_group.addTab(right_tab);

    tab_group.open();
}());
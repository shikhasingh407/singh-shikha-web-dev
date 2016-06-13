module.exports = function(){

    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js")();
    var Widget= mongoose.model("Widget", WidgetSchema);
    var api = {
        createWidget: createWidget,
        deleteWidget: deleteWidget,
        updateWidget: updateWidget,
        findWidgetById: findWidgetById,
        findAllWidgetsForPage: findAllWidgetsForPage,
        reorderWidget:reorderWidget
    };
    return api;

    function reorderWidget(pageId, widgets){
        return Widget
            .update({_page: pageId},{
                $set: widgets
            }, false, true);
    }

    function findAllWidgetsForPage(pageId){
        return Widget.find({"_page": pageId});
    }

    function findWidgetById(widgetId){
        return Widget.findById(widgetId);
    }

    function createWidget(widget){
        return Widget
            .find({_page: widget._page})
            .then(
                function (widgets) {
                    widget.order = widgets.length;
                    return Widget.create(widget);
                },
                function (error) {
                    return null;
                }
            );
    }

    function deleteWidget(widgetId){
        return Widget.remove({_id: widgetId});
    }

    function updateWidget(widgetId , newWidget){
        delete newWidget._id;
        return Widget
            .update({_id: widgetId},{
                $set: newWidget
            });
    }
};
module.exports = function(app){
    var widgets = [
        {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"
        },
        {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {   "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
  
    function WidgetService() {
        var api = {
            findWidgetsForPageId: findWidgetsForPageId,
            findWidgetByWidgetId: findWidgetByWidgetId,
            createWidget: createWidget,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function createWidget(id, widgetType) {
            var newWidget = {
                _id : (new Date()).getTime()+"",
                widgetType: widgetType,
                pageId: id
            };
            widgets.push(newWidget);
            return newWidget;
        }

        function updateWidget (id, newWidget) {
            for(var i in widgets){
                if(widgets[i]._id === id){
                    widgets[i] = newWidget;
                    return true;
                }
            }
            return false;
        }

        function deleteWidget(id) {
            for(var i in widgets) {
                if(widgets[i]._id === id) {
                    widgets.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

        function findWidgetsForPageId(pageId) {
            var resultSet = [];
            for(var i in widgets) {
                if(widgets[i].pageId === pageId) {
                    resultSet.push(widgets[i]);
                }
            }
            return resultSet;
        }
        function findWidgetByWidgetId(widgetId) {
            for(var i in widgets) {
                if(widgets[i]._id === widgetId) {
                    return widgets[i];
                }
            }
            return null;
        }

    }
};
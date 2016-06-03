(function ()
{
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);


  
    function WidgetService($http) {
        var api = {
            findWidgetsForPageId: findWidgetsForPageId,
            findWidgetByWidgetId: findWidgetByWidgetId,
            createWidget: createWidget,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function updateWidget(id, newWidget){
            var url = "/api/widget/:widgetId" + id;
            return $http.put(url, newPage);
        }

        function deleteWidget(id){
            var url = "/api/widget/:widgetId" + id;
            return $http.delete(url);
        }

        function createWidget(newWidget){
            return $http.post("/api/page/:pageId/widget", newWidget);
        }

        function findWidgetById(id){
            var url = "/api/widget/:widgetId" + id;
            return $http.get(url);
        }

        function findAllWidgetsForPage(pageId){
            var url = "/api/page/:pageId/widget" +pageId;
            return $http.get(url);
        }

    }
})();
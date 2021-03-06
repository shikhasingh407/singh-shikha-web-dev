(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http){
        var api = {
            findWidgetsForPageId: findWidgetsForPageId,
            findWidgetByWidgetId: findWidgetByWidgetId,
            createWidget: createWidget,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            reorderWidget: reorderWidget
        };
        return api;

        function updateWidget (id, newWidget) {
            var url = "/api/widget/" + id;
            return $http.put(url, newWidget);
        }

        function deleteWidget(id) {
            var url = "/api/widget/" + id;
            return $http.delete(url);
        }

        function createWidget (newWidget){
            return $http.post("/api/page/:pageId/widget", newWidget);
        }

        function findWidgetByWidgetId(id){
            var url = "/api/widget/" + id;
            return $http.get(url);
        }

        function findWidgetsForPageId(pageId){
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);
        }

        function reorderWidget(pageId, start, end) {
            console.log(pageId);
            console.log(start);
            console.log(end);
            return $http.put("/page/" + pageId + "/widget?start=" + start+ "&end=" + end);
        }
    }
})();
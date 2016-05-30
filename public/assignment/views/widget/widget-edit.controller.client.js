(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($sce, $location, $routeParams, WidgetService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.pageId = $routeParams.pageId;
        vm.websiteId = $routeParams.websiteId;
        vm.widgetId = $routeParams.widgetId;
        vm.widget = WidgetService.findWidgetByWidgetId(vm.widgetId);

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function updateWidget() {
            var result = WidgetService.updateWidget(vm.widgetId, vm.widget);
            if(result) {
                $location.url("/user/"+vm.userId+ "/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            } else {
                vm.error= "Unable to update the widget";
            }
        }

        function deleteWidget (widgetId) {
            var result = WidgetService.deleteWidget(vm.widgetId);
            if(result) {
                $location.url("/user/"+vm.userId+ "/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            } else {
                vm.error= "Unable to delete the widget";
            }
        }
    }
})();
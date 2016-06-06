(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($sce, $location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.pageId = $routeParams.pageId;
        vm.websiteId = $routeParams.websiteId;
        vm.widgetId = $routeParams.widgetId;
        //vm.widget = WidgetService.findWidgetByWidgetId(vm.widgetId);

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            WidgetService
                .findWidgetByWidgetId(vm.widgetId)
                .then(function(response){
                    vm.widget = response.data;
                });
        }
        init();

        function updateWidget() {
            WidgetService
                .updateWidget(vm.widgetId, vm.widget)
                    .then(function(response){
                        if(response.data)
                            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                        else
                            vm.error = "Unable to update";
                    });
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId)
                .then(function (response) {
                    if (response.data)
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    else
                        vm.error = "Unable to delete the widget";
                });
        }
    }
    })();
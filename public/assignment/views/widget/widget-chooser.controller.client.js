(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.pageId = $routeParams.pageId;
        vm.websiteId = $routeParams.websiteId;
        vm.createWidget = createWidget;

        function createWidget(widgetType) {
            var newWidget = {
                // _id: (new Date().getTime() + ""),
                type: widgetType,
                _page: vm.pageId,
                name: "Default"
            };

            WidgetService
                .createWidget(newWidget)
                .then(function (response) {
                    var widget = response.data;
                    if (widget) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
                    } else {
                        vm.error = "Unable to create the widget";
                    }
                });
        }
    }
})();
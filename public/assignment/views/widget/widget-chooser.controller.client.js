(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($sce, $location, $routeParams, WidgetService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.pageId = $routeParams.pageId;
        vm.websiteId = $routeParams.websiteId;
        vm.widgetId = $routeParams.widgetId;
        vm.createWidget = createWidget;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;

        function init(){
            vm.widgets = WidgetService.findWidgetsForPageId(vm.pageId);
        }
        init();
        
        function createWidget(widgetType) {
            var newWidget = WidgetService.createWidget(vm.pageId, widgetType);
            if(newWidget) {
                $location.url("/user/"+vm.userId+ "/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidget._id);
            } else {
                vm.error= "Unable to create the website";
            }
        }

        function getSafeHtml(widget){
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget){
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
    }
})();
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $location, $routeParams, WidgetService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.pageId = $routeParams.pageId;
        vm.websiteId = $routeParams.websiteId;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.reorderWidget = reorderWidget;

        function init() {
            WidgetService
                .findWidgetsForPageId(vm.pageId)
                .then(function(response){
                    vm.widgets = response.data;
                    $(".container")
                        .sortable({
                            axis: 'y'
                        });
                });
        }
        init();

        function reorderWidget(start, end){
            console.log(start+" "+end);
            WidgetService
                .reorderWidget(vm.pageId, start, end)
                .then(
                    function(response){
                        init();
                    },
                    function(response){
                        vm.error = "Unable to reorder widgets";
                    });
        }

        function getSafeHtml(widget){
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget){
            if(widget.url){
                var urlParts = widget.url.split("/");
                var id = urlParts[urlParts.length - 1];
                var url = "https://www.youtube.com/embed/" + id;
                return $sce.trustAsResourceUrl(url);
            }
        }
    }
})();
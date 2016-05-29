(function() {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.page = PageService.findPageByPageId(vm.pageId);
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        // function init() {
        //     vm.page = PageService.findPageByPageId(pageId);
        // }
        //
        // init();

        function updatePage() {
            var result = PageService.updatePage(vm.pageId, vm.page);
            if(result) {
                $location.url("/user/"+vm.userId+ "/website/"+vm.websiteId+"/page");
            } else {
                vm.error= "Unable to update the page";
            }
        }

        // PageService.updatePage(vm.pageId, newPage);
        
        function deletePage () {
            var result = PageService.deletePage(vm.pageId);
            if(result) {
                $location.url("/user/"+vm.userId+ "/website/"+vm.websiteId+"/page");
            } else {
                vm.error= "Unable to delete the page";
            }
        }
    }
})();
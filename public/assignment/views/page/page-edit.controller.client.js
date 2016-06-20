(function() {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
       // vm.page = PageService.findPageByPageId(vm.pageId);
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init(){
            PageService
                .findPageByPageId(vm.pageId)
                .then(function(response){
                    vm.page = response.data;
                });
        }
        init();

        function updatePage(newPage){
            if(newPage.name)
            {
                PageService
                    .updatePage(vm.pageId,newPage)
                    .then(function(response){
                        var updatePage = response.data;
                        if(updatePage) {
                            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                        }
                        else {
                            vm.error="Unable to update page";
                        }
                    });
            }
            else
            {
                vm.error = "Please fill all the required fields";
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
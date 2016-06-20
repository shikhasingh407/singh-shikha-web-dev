(function() {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.createPage = createPage;

        function createPage(name, title){
            if(name)
            {
                var newPage = {
                    // _id: (new Date()).getTime()+"",
                    name: name,
                    title: title,
                    _website: vm.websiteId
                };
                PageService
                    .createPage(vm.websiteId,newPage)
                    .then(function(response){
                        var newWeb = response.data;
                        if(newWeb) {
                            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                        }
                        else {
                            vm.error="Unable to create page";
                        }
                    });
            }
            else {
                vm.error = "You did not fill all the required fields!!";
            }

        }
    }
})();
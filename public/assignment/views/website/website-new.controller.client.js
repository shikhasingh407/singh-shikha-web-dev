(function() {
    angular
        .modile("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteListController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createWebsite = createWebsite;
        
        function createWebsite(name, description) {
            var newWebsite = WebsiteService.createWebsite(vm.userId, name, description);
            if(newWebsite) {
                $location.url("/user/"+vm.userId+ "/websites");
            } else {
                vm.error= "Unable to create the website";
            }
        }
    }
})();
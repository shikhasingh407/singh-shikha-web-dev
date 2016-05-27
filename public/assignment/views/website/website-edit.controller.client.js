(function() {
    angular
        .modile("WebAppMaker")
        .controller("EditWebsiteController", NewWebsiteController);

    function NewWebsiteListController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.deleteWebsite = deleteWebsite;

        function deleteWebsite (websiteId) {
            var result = WebsiteService.deleteWebsite(websiteId);
            if(result) {
                $location.url("/user/"+vm.userId+ "/websites");
            } else {
                vm.error= "Unable to delete the website";
            }
        }
    }
})();
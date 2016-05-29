(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.deleteWebsite = deleteWebsite;

        function updateWebsite() {
            var result = WebsiteService.updateWebsite(vm.websiteId, vm.website);
            if(result) {
                $location.url("/user/"+vm.userId+ "/website/");
            } else {
                vm.error= "Unable to update the website";
            }
        }
        
        function deleteWebsite (websiteId) {
            var result = WebsiteService.deleteWebsite(websiteId);
            if(result) {
                $location.url("/user/"+vm.userId+ "/website");
            } else {
                vm.error= "Unable to delete the website";
            }
        }
    }
})();
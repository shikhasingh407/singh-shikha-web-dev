(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;

        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init(){
            WebsiteService
                .findWebsiteByWebsiteId(vm.websiteId)
                .then(function(response){
                    vm.website = response.data;
                });
        }
        init();

        function updateWebsite(newWebsite){
            if(newWebsite.name)
            {
                WebsiteService
                    .updateWebsite(vm.websiteId,newWebsite)
                    .then(function(response){
                        if(response.data) {
                            $location.url("/user/"+vm.userId+"/website");
                        }
                        else {
                            vm.error="Unable to update website";
                        }
                    });
            }
            else {
                vm.error = " Please fill all the required fields";
            }

        }

        function deleteWebsite () {
            console.log(vm.userId);
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .then(function (response) {
                    var website = response.data;
                    if(website) {
                        $location.url("/user/"+ vm.userId + "/website");
                    } else {
                        vm.error= "Unable to delete the website";
                    }
                });
        }
    }
})();
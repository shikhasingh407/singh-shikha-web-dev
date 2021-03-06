(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createWebsite = createWebsite;

        function createWebsite(name, description) {
            if (name) {
                var newWebsite = {
                    //_id: (new Date()).getTime()+"",
                    name: name,
                    description: description
                };

                WebsiteService
                    .createWebsite(vm.userId, newWebsite)
                    .then(function (response) {
                        var newWebsite = response.data;
                        if (newWebsite) {
                            $location.url("/user/" + vm.userId + "/website");
                        } else {
                            vm.error = "Unable to create the website";
                        }
                    });
            }

            else {
                vm.error = "Please fill all the required fields!";
            }
        }

    }
})();
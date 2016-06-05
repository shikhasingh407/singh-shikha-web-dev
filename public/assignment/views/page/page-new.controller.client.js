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
            var newPage = {
                _id: (new Date()).getTime()+"",
                name: name,
                title: title,
                websiteId: vm.websiteId
            };

            PageService
                .createPage(newPage)
                .then(function(response){
                    var newPage = response.data;
                    if(newPage){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    } else{
                        vm.error = "Unable to create the page";
                    }
                });
        }
    }})();
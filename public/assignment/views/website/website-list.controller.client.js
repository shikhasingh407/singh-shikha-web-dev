(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;

        function init() {
            vm.website = WebsiteService.findWebsitesForUserId($routeParams.userId)
        }

        init();
    }

})();
        
//         vm.website= [
//             {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
//             {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
//             {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
//             {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
//         ];
//
//
//     }
// }}
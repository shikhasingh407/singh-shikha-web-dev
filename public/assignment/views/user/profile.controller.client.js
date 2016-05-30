(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        var id = $routeParams.id;

        vm.updateUser = updateUser;

        function init() {
            vm.user = UserService.findUserById(id);
        }

        init();

        function updateUser(newUser){
            UserService.updateUser(id, newUser);
        }
    }


})();
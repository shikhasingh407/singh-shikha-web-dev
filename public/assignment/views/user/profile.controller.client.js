(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;

        vm.updateUser = updateUser;
        var id = $routeParams.id;

        function init() {
            vm.user = UserService.findUserById(id);
        }

        init();

        function updateUser(newUser) {
            console.log(newUser);
            users[index].firstName = newUser.firstName;
            users[index].lastName = newUser.lastName;
        }

        UserService.updateUser(id, newUser);
    }

})();
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location) {
        var vm = this;
        vm.login = function (username, password) {
            var user = UserService.fundUserByUsernameAndPassword(username, password);
            if(user) {
                $location.url("/profile/" + user._id);
            } else {
                vm.error= "User not found";
            }
        }
    }
})();
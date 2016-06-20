(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService, $rootScope) {
        var vm = this;
        vm.userId = $routeParams.id;
        var id = $rootScope.currentUser._id;

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        function init(){
            UserService
                .findUserById(id)
                .then(function(response){
                    vm.user = response.data;
                });
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(
                    function (response){
                        $location.url("/login");
                    },
                    function() {
                        $location.url("/login");
                    }
                )
        }

        function deleteUser() {
            UserService
                .deleteUser(id)
                .then(
                    function(){
                        $location.url("/login");
                    },
                    function() {
                        vm.error = "OOPS!!! Unable to remove the user";
                    }
                );
        }
        function updateUser(newUser) {
            if(UserService.updateUser(id, newUser)){
                vm.success = "Your profile is saved!"
            }
            else{
                vm.error = "OOPS!!! Unable to save the changes";
            }
        }
    }

})();
(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams.id;

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function init(){
            UserService
                .findUserById(vm.userId)
                .then(function(response){
                    vm.user = response.data;
                });
        }
        init();

        function deleteUser() {
            UserService
                .deleteUser(vm.userId)
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
            if(UserService.updateUser(vm.userId, newUser)){
                vm.success = "Your profile is saved!"
            }
            else{
                vm.error = "OOPS!!! Unable to save the changes";
            }
        }
    }

})();
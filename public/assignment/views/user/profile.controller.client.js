(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams.id;

        vm.updateUser = updateUser;

        function init(){
            UserService
                .findUserById(vm.userId)
                .then(function(response){
                    vm.user = response.data;
                });
        }
        init();

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
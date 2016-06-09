(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $routeParams, UserService){
        var vm = this;
        vm.createUser = createUser;

        function createUser(username, password, vpassword) {
            if(password === vpassword){
                var newUser = {
                   // _id: (new Date()).getTime()+"",
                    username: username,
                    password: password
                };
                UserService
                    .createUser(newUser)
                    .then(function(response){
                        var user = response.data;

                        if(user){
                            $location.url("/user/"+newUser._id);
                        }
                        else{
                            vm.error = "Unable to register the user";
                        }
                    });
            }
            else
                vm.error = "Passwords don't match"
        }
    }
})();

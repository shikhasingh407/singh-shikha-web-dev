(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location,$routeParams,UserService){

        var vm = this;
        var id = $routeParams.uid;
        vm.createUser = createUser;
        vm.error = false;

        function createUser(username,password,vpassword) {
            if(username && password && vpassword)
            {
                if(password === vpassword)
                {
                    var newUser = {
                        // _id: (new Date()).getTime()+"",
                        username: username,
                        password: password
                    };
                    UserService
                        .register(newUser)
                        // .createUser(newUser)
                        .then(function(response){
                                var user = response.data;
                                if(response.data)
                                    $location.url("/user/"+user._id);
                                else
                                    vm.error = "Unable to register, please try again later!";
                            },
                            function(err){
                                vm.error = err.data;
                            });
                }
                else
                    vm.error = "Password doesn't match!!!"
            }
            else {
                vm.error = "You did not fill all the required fields!!";
            }
        }
    }
})();
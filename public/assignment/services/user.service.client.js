(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    

    function UserService($http) {
        var api = {
            createUser: createUser,
            login: login,
            logout: logout,
            loggedIn:loggedIn,
            register:register,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function loggedIn(){
            return $http.get("/api/loggedin");
        }

               function logout(){
            return $http.post("/api/logout");
        }

        function login(username,password){
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/login",user);
        }

        function updateUser(id, newUser){
            var url = "/api/user/" + id;
            return $http.put(url, newUser);
        }

        function deleteUser(id){
            var url = "/api/user/" + id;
            return $http.delete(url);
        }

        function register(newUser) {
            return $http.post("/api/register",newUser);
        }

        function createUser(newUser){
            return $http.post("/api/user", newUser);
        }

        function findUserById(id){
            var url = "/api/user/" + id;
            return $http.get(url);
        }

        function findUserByUsernameAndPassword(username, password){
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }
    }
})();
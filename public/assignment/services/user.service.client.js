(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    

    function UserService($http) {
        var api = {
            createUser: createUser,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function updateUser(id, newUser){
            var url = "/api/user/" + id;
            return $http.put(url, newUser);
        }

        function deleteUser(id){
            var url = "/api/user/" + id;
            return $http.delete(url);
        }

        function createUser(newUser){
            return $http.post("/api/user", newUser);
        }

        function findUserById(id){
            var url = "/api/user/" + id;
            return $http.get(url);
        }

        function findUserByUsernameAndPassword(username, password){
            var url = "/api/user?username="+username+"&password"+password;
            return $http.get(url);
        }
    }
})();
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var api = {
            createWebsite: createWebsite,
            findWebsitesForUserId: findWebsitesForUserId,
            findWebsiteByWebsiteId: findWebsiteByWebsiteId,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function updateWebsite(id, newWebsite){
            var url = "/api/website/" + id;
            return $http.put(url, newWebsite);
        }

        function deleteWebsite(id){
            var url = "/api/website/" + id;
            return $http.delete(url);
        }

        function createWebsite(newWebsite){
            return $http.post("/api/user/:userId/website", newWebsite);
        }

        function findWebsiteByWebsiteId(websiteId){
            var url = "/api/website/" + websiteId;
            return $http.get(url);
        }

        function findWebsitesForUserId(developerId){
            var url = "/api/user/" + developerId + "/website";
            return $http.get(url);
        }
    }

})();
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);


    function PageService($http) {
        var api = {
            findPagesForWebsiteId: findPagesForWebsiteId,
            findPageByPageId: findPageByPageId,
            createPage: createPage,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function updatePage(id, newPage) {
            var url = "/api/page/" + id;
            return $http.put(url, newPage);
        }

        function deletePage(id) {
            var url = "/api/page/" + id;
            return $http.delete(url);
        }

        function createPage(newPage) {
            return $http.post("/api/website/:websiteId/page", newPage);
        }

        function findPageByPageId(id) {
            var url = "/api/page/" + id;
            return $http.get(url);
        }

        function findPagesForWebsiteId(websiteId) {
            var url = "/api/website/"+websiteId + "/page";
            return $http.get(url);
        }
    }
})();
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var api = {
            createPage: createPage,
            findPagesForWebsiteId: findPagesForWebsiteId,
            findPageByPageId: findPageByPageId,
            updatePage: updatePage,
            deletePage: deletePage

        };
        return api;

        function updatePage(id, newPage){
            var url = "/api/page/:pageId" + id;
            return $http.put(url, newPage);
        }

        function deletePage(id){
            var url = "/api/page/:pageId" + id;
            return $http.delete(url);
        }

        function createPage(newPage){
            return $http.post("/api/website/:websiteId/page", newPage);
        }

        function findPageById(id){
            var url = "/api/page/:pageId" + id;
            return $http.get(url);
        }

        function findAllPagesForWebsite(websiteId){
            var url = "/api/website/:websiteId/page" +websiteId;
            return $http.get(url);
        }
    }

})();
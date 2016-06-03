(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    var pages =
        [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
        ];

    function PageService() {
        var api = {
            createPage: createPage,
            findPagesForWebsiteId: findPagesForWebsiteId,
            findPageByPageId: findPageByPageId,
            updatePage: updatePage,
            deletePage: deletePage

        };
        return api;

        function updatePage (id, newPage) {
            for(var i in pages){
                if(pages[i]._id === id){
                    pages[i] = newPage;
                    return true;
                }
            }
            return false;
        }

        function deletePage(id) {
            for(var i in pages) {
                if(pages[i]._id === id) {
                    pages.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
        function createPage(websiteId, name, title) {
            var newPage = {
                _id : (new Date()).getTime()+"",
                name: name,
                title: title,
                websiteId: websiteId
            };
            pages.push(newPage);
            return newPage;
        }
        function findPagesForWebsiteId(websiteId) {
            return pages;
        }
        function findPageByPageId(pageId) {
            for(var i in pages) {
                if(pages[i]._id === pageId) {
                    return pages [i];
                }
            }
            return null;
        }


    }

})();
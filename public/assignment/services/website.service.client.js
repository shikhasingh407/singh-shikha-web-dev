(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    function WebsiteService() {
        var api = {
            createWebsite: createWebsite,
            findWebsitesForUserId: findWebsitesForUserId,
            findWebsiteByWebsiteId: findWebsiteByWebsiteId,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        
        function deleteWebsite(id) {
            for(var i in websites) {
                if(websites[i]._id === id) {
                    websites.splice(i, 1);
                    return true;
                }
            }
            return false;
        }


        function updateWebsite (id, newWebsite) {
            for(var i in websites){
                if(websites[i]._id === id){
                    websites[i] = newWebsite;
                    return true;
                }
            }
            return false;
        }

        function createWebsite(developerId, name, desc) {
            var newWebsite = {
                _id : (new Date()).getTime()+"",
                name: name,
                description: desc,
                developerId: developerId
            };
            websites.push(newWebsite);
            return newWebsite;
        } 
        function findWebsitesForUserId(userId) {
            var resultSet = [];
            for(var i in websites)  {
                if(websites [i].developerId === userId) {
                    resultSet.push(websites[i]);
                }
            }
        return resultSet;
        }

        function findWebsiteByWebsiteId(websiteId) {
            for(var i in websites) {
                if(websites[i]._id === websiteId) {
                    return websites [i];
                }
            }
            return null;
        }
        
    }

})();
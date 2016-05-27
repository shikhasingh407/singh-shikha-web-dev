(function () {
    angular
        .model("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var api = {
            createWebsite: createWebsite,
            findWebsitesForUserId: findWebsitesForUserId
            deleteWebsite: deleteWebsite
        };
        return api;
        
        function deleteWebsite(websiteId) {
            for(var i in websites) {
                if(websites[i]._id === websitesId) {
                    websites.splice(i, 1);
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
            wesites.push(newWebsite);
            return newWebsite;
        } 
        function findWebsitesForUserId(userId) {
            var resultSet = [];
            for(var i in websites)  {
                if(websites [i].developedId === userId) {
                    resultSet.push(websites[i]);
                }
            }
        return resultSet;
        }
        
    }

})
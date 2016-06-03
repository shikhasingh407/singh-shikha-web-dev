module.exports = function(app){

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }

    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function deleteWebsite(req, res){
        var id = req.params.websiteId;
        for(var i in websites){
            if(websites[i].websiteId === id){
                websites.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function updateWebsite(req, res){
        var id = req.params.websiteId;
        var newWebsite = req.body;
        for(var i in websites){
            if(websites[i].websiteId === id){
                websites[i] = newWebsite;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function createWebsite(req, res){
        var website = req.body;
        websites.push(website);
        res.sendStatus(200);
    }

    function findWebsiteById(req, res){
        var websiteId = req.params.websiteId;
        for(var i in websites){
            if(websites[i]._id === websiteId){
                res.json(websites[i]);
                return;
            }
        }
        res.send();
    }

    function findAllWebsitesForUser(req, res){
        var results = [];
        var userId = req.params.userId;
        for(var i in websites){
            if(websites[i].developerId === userId){
                results.push(websites[i]);
            }
        }
        res.json(results);
    }
};
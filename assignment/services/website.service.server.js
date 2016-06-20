module.exports = function(app, models){
    var websiteModel = models.websiteModel;
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
        websiteModel
            .deleteWebsite(id)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
        // for(var i in websites){
        //     if(websites[i].websiteId === id){
        //         websites.splice(i, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(400);
    }

    function updateWebsite(req, res){
        var id = req.params.websiteId;
        var newWebsite = req.body;
        websiteModel
            .updateWebsite(id, newWebsite)
            .then(
                function(stats) {
                    console.log(stats);
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
        // for(var i in websites){
        //     if(websites[i].websiteId === id){
        //         websites[i] = newWebsite;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(400);
    }

    function createWebsite(req, res){
        var website = req.body;
        var userId = req.params.userId;
        websiteModel
            .createWebsite(userId, website)
            .then(
                function(website) {
                    console.log(website);
                    res.json(website);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
        // websites.push(website);
        // res.sendStatus(200);
    }

    function findWebsiteById(req, res){
        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function(website) {
                    res.send(website);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
        // for(var i in websites){
        //     if(websites[i]._id === websiteId){
        //         res.json(websites[i]);
        //         return
        //     }
        // }
        // res.send();
    }

    function findAllWebsitesForUser(req, res) {
        //     var results = [];
        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function (websites) {
                    res.json(websites);
                },
                function (err) {
                    res.statusCode(404).send(err);
                }
            );
    }
    //     for(var i in websites){
    //         if(websites[i].developerId === userId){
    //             results.push(websites[i]);
    //         }
    //     }
    //     res.json(results);
    // }
};
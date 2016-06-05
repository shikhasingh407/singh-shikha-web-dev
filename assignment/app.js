module.exports = function(app) {

    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);

    app.get("/say/:something",function (req, res){
        var msg = req.params ['something'];
        res.send({message: msg});

    });

    app.get("/users/:id", function(req, res){
        var id = req.params.id;
        for(var i in users){
            if(users[i] === id){
                res.send(users[i]);
                return;
            }
        }
        res.send();
    });

};
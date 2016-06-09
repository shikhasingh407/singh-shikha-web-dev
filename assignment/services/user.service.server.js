module.exports = function(app, models) {
        var userModel = models.userModel;
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.get("/api/user?username=username", findUserByUsername);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function deleteUser(req, res){
        var id = req.params.userId;
        userModel
            .deleteUser(id)
            .then(
                function(stats) {
                    console.log(stats);
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
        // for(var i in users){
        //     if(users[i]._id === id){
        //         users.splice(i, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(400);
    }

    function updateUser(req, res){
        var id = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(id, newUser)
            .then(
                function(stats) {
                    console.log(stats);
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
        // for(var i in users){
        //     if(users[i]._id === id){
        //         users[i] = newUser;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(400);
    }

    function createUser(req, res){
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function(user) {
                    console.log(user);
                    res.json(user);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
        // users.push(user);
        // res.sendStatus(200);
    }

    function findUserById(req, res){
        var id = req.params.userId;
        userModel
            .findUserById(id)
            .then(
                function(user) {
                    res.send(user);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            )
        // for(var i in users){
        //     if(users[i]._id === id){
        //         res.json(users[i]);
        //         return;
        //     }
        // }
        // res.json();
    }

    function getUsers(req, res){
        var username = req.query['username'];
        var password = req.query['password'];
        console.log(username);
        console.log(password);
        if(username && password){
            findUserByCredentials(username, password, res);
        } else if(username){
            findUserByUsername(username, res);
        } else{
            res.json(users);
        }
    }

    function findUserByCredentials(username, password, res){
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    res.send(user);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            )
        // for(var i in users){
        //     if(users[i].username === username && users[i].password === password){
        //         res.json(users[i]);
        //         return;
        //     }
        // }
        // res.json();
    }

    function findUserByUsername(username, res){
        for(var i in users){
            if(users[i].username === username){
                res.json(users[i]);
                return;
            }
        }
        res.json();
    }
};
module.exports = function(app, models) {
        var userModel = models.userModel;
    //var users = [
    //    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    //    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    //    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    //    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    //];

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var bcrypt = require("bcrypt-nodejs");

    app.get("/auth/facebook",passport.authenticate('facebook'), facebookLogin);

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
   // app.get("/api/user?username=username&password=password", findUserByCredentials);
   // app.get("/api/user?username=username", findUserByUsername);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/login",passport.authenticate('local'), login);
    app.post("/api/logout",logout);
    app.get("/api/loggedin",loggedIn);
    app.post("/api/register",register);
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/profile',
            failureRedirect: '/assignment/#/login'
        }));

    passport.use('local', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookLogin));

    function facebookLogin(token, refreshToken, profile, done){
        userModel
            .findFacebookUser(profile.id)
            .then(
                function(fbuser){
                    if(fbuser) {
                        return done(null, fbuser);
                    }
                    else {
                        fbuser = {
                            username: profile.displayName.replace(/ /g,''),
                            facebook: {
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        userModel
                            .createUser(fbuser)
                            .then(
                                function(user){
                                    done(null,user);
                                }
                            );
                    }
                }
            )
    }

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


    function register(req,res){
        var username = req.body.username;
        var password = req.body.password;

        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    if(user)
                    {
                        res.status(400).send("Username already exists");
                        return;
                    }
                    else {
                        var user = req.body
                        user.password = bcrypt.hashSync(user.password);
                        userModel
                            .createUser(user)
                            .then(
                                function(user){
                                    if(user) {
                                        req.login(user,function(error){
                                            if(error){
                                                res.status(400).send(error);
                                            }
                                            else {
                                                res.json(user);
                                            }
                                        })
                                    }
                                }
                            );
                    }
                },
                function(error){
                    res.status(400).send(error);
                    return;
                }
            )

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
            );
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
        }
        else{
            userModel
                .getUsers()
                .then(
                    function(users){
                res.json(users);
            },
            function(error){
                res.statusCode(400).send(error);
            }
        );
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
            );
        // for(var i in users){
        //     if(users[i].username === username && users[i].password === password){
        //         res.json(users[i]);
        //         return;
        //     }
        // }
        // res.json();
    }

    function localStrategy(username,password,done){
        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    if(user && bcrypt.compareSync(password, user.password)) {
                        done (null, user);
                    }
                    else
                       done(null,false);
                },
                function(error){
                    done(error);
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(error){
                    done(error, null);
                }
            );
    }


    function login(req, res) {
        var user= req.user;
        res.json(user);
    }

    function loggedIn(req,res){
        if(req.isAuthenticated()){
            res.json(req.user);
        }
        else {
            res.send('0');
        }
    }

    function logout(req,res){
        req.logout();
        res.send(200);
    }

    function findUserByUsername(username, res){
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    res.send(user);
                },
                function(error) {
                    res.statusCode(404).send(error);
                });
    }
};
/**
 * Created by Shikha Singh on 6/8/2016.
 */

module.exports = function() {
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("User", UserSchema);
    var api = {
                createUser: createUser,
                findUserById: findUserById,
                findUserByCredentials: findUserByCredentials,
                updateUser: updateUser,
               deleteUser: deleteUser,
                findUserByUsername: findUserByUsername,
                 findFacebookUser: findFacebookUser
              };
        return api;

    function findFacebookUser(id){
        return User.findOne({"facebook.id": id});
    }

    function updateUser(userId, user)
    {
                    delete user._id;
                    return User
                        .update({_id: userId},{
                             $set:
                             {
                                 firstName: user.firstName,
                                 lastName: user.lastName
                             }
                       });
    }
    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
    function findUserByCredentials(username, password) {
           return User.findOne({username: username, password: password});
    }
    function findUserById(userId) {
        return User.findById(userId);
    }

    function findUserByUsername(username, password){
        return User.findOne({username : username});
    }

    function createUser(user) {
        //console.log("user.model.server.createUser()");
        //console.log(user);
        return User.create(user);
    }
};
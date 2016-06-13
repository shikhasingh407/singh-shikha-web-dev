/**
 * Created by Shikha Singh on 6/9/2016.
 */
module.exports = function() {

    var mongoose = require("mongoose");

    var PageSchema = mongoose.Schema ({

        _website    : {type: mongoose.Schema.ObjectId , ref : "Website"},
        name        : {type: String, required: true},
        description : String,
        dateCreated : {type: Date, default : Date.now}
    }, {collection : "assignment.page"});

    return PageSchema;
};
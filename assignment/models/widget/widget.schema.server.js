/**
 * Created by Shikha Singh on 6/9/2016.
 */

module.exports = function() {

    var mongoose = require("mongoose");

    var WidgetSchema = mongoose.Schema ({

        order: Number,
        _page       : {type : mongoose.Schema.ObjectId, ref  : "Page"},
        type        : {type : String, enum : ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
        name        : String,
        text        : String,
        placeholder : String,
        description : String,
        url         : String,
        width       : String,
        height      : Number,
        rows        : Number,
        size        : Number,
        class       : String,
        icon        : String,
        deletable   : Boolean,
        formatted   : Boolean,
        dateCreated : {type: Date, default : Date.now}
    }, {collection : "assignment.widget"});

    return WidgetSchema;
};

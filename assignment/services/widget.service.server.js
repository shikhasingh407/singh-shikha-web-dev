module.exports = function(app, models){

    var widgetModel = models.widgetModel;

    // var widgets = [
    //     {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
    //     {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     {
    //         "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    //         "url": "http://lorempixel.com/400/200/"
    //     },
    //     {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    //     {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     {   "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
    //         "url": "https://youtu.be/AM2Ivdi9c4E"
    //     },
    //     {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    // ];
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post ("/api/uploads", upload.single('myFile'), uploadImage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.put("/page/:pageId/widget",reorderWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    function reorderWidget(req, res) {
        var pageId = req.params.pageId;
        var start = parseInt(req.query.start);
        var end =  parseInt(req.query.end);

        widgetModel
            .reorderWidget(start, end, pageId)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400);
                });
    }

    function uploadImage(req, res) {

        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var pageId        = req.body.pageId;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var newWidget = {url: "/uploads/" + filename};

        widgetModel
            .updateWidget(widgetId, newWidget)
            .then(
                function (stats) {
                    res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                },
                function (error) {
                    res.sendStatus(400);

                }
            );
    }

    function deleteWidget(req, res){
        var id = req.params.widgetId;
        widgetModel
            .deleteWidget(id)
            .then(
                function(stats){
                    console.log(stats);
                    res.send(200);
                },
                function(error){
                    res.sendStatus(400);
                }
            );
        // for(var i in widgets){
        //     if(widgets[i]._id === id){
        //         widgets.splice(i, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(400);
    }

    function updateWidget(req, res){
        var id = req.params.widgetId;
        var newWidget = req.body;
        widgetModel
            .updateWidget(id, newWidget)
            .then(
                function(newWidget) {
                    console.log(newWidget);
                    res.json(newWidget);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );
        // for(var i in widgets){
        //     if(widgets[i]._id === id){
        //         widgets[i] = newWidget;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(400);
    }

    function createWidget(req, res){
        var widget = req.body;
        widgetModel
            .createWidget(widget)
            .then(
                function(widget) {
                    console.log(widget);
                    res.json(widget);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );
        // widgets.push(widget);
        // res.sendStatus(200);
    }

    function findAllWidgetsForPage(req, res){
        var pageId = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function(widgets) {
                    console.log(widgets);
                    res.json(widgets);
                },
                function(error) {
                    res.sendStatus(400);
                }
            );
        // var results = [];
        // for(var i in widgets){
        //     if(widgets[i].pageId === pageId){
        //         results.push(widgets[i]);
        //     }
        // }
        // res.json(results);
    }

    function findWidgetById(req, res){
        var id = req.params.widgetId;
        widgetModel
            .findWidgetById(id)
            .then(
                function(widget){
                    console.log(widget);
                    res.json(widget);
                },
                function(error){
                    res.sendStatus(400);
                }
            );
        // for(var i in widgets){
        //     if(widgets[i]._id === id){
        //         res.json(widgets[i]);
        //         return;
        //     }
        // }
        // res.send();
    }
};
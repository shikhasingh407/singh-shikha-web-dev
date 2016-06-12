module.exports = function(app, models){

    var widgetModel = models.widgetModel;

    var widgets = [
        {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"
        },
        {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {   "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/page/:pageId/widget" , createWidget);
    app.get("/api/page/:pageId/widget" , findAllWidgetsForPage);
    app.get("/api/widget/:widgetId" , findWidgetById);
    app.put("/api/widget/:widgetId" , updateWidget);
    app.delete("/api/widget/:widgetId" , deleteWidget);
    app.post("/api/uploads",upload.single('myFile'),uploadImage);


    function createWidget(req, res) {
        var newWidget = req.body;
        var pageId = req.params.pageId;

        widgetModel
            .createWidget(pageId, widget)
            .then(
                function(widget) {
                    res.json(widget);
                },
                function(err){
                    res.statusCode(400).send(err);
                }
            );
    }

        function updateWidget (req, res) {
            var widgetId = req.params.widgetId;
            var newWidget = req.body;
            widgetModel
                .updateWidget(widgetId, newWidget)
                .then(
                    function(stats){
                        res.sendStatus(200);
                    },
                    function(err){
                        res.statusCode(404).send(err);
                    }
                );
        }

        function deleteWidget(req, res) {
            var id = req.params.widgetId;
            widgetModel
                .deleteWidget(id)
                .then(
                    function(stats){
                        res.sendStatus(200);
                    },
                    function(err){
                        res.statusCode(404).send(err);
                    }
                );
        }

        function findAllWidgetsForPage(req, res) {
            var pageId = req.params.pageId;
            widgetModel
                .findAllWidgetsForPage(pageId)
                .then(
                    function(widgets){
                        res.json(widgets);
                    },
                    function(err){
                        res.statusCode(404).send(err);
                    }
                );
        }

    function findWidgetById(req, res){
        var id = req.params.widgetId;
        for(var i in widgets){
            if(widgets[i]._id === id){
                res.json(widgets[i]);
                return;
            }
        }
        res.send();
    }

    function uploadImage(req, res) {
        var widgetId = req.body.widgetId ;
        var width = req.body.width ;
        var myFile = req.file;
        var originalname = myFile.originalname;
        var filename = myFile.filename;
        var path = myFile.path;
        var destination = myFile.destination;
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        var userId         = req.body.userId;
        var websiteId      = req.body.websiteId;
        var pageId         = req.body.pageId;

        if(myFile == null){
            res.redirect("/assignment/#/user/"+ userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
            return;
        }
        for(var i in widgets){
            if(widgets[i]._id === widgetId){
                widgets[i].url = "/uploads/"+filename;
            }
        }

        res.redirect("/assignment/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
    }

};
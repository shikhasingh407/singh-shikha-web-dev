module.exports = function(app){

    var pages =
        [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
        ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);


    function deletePage(req, res) {
            var id = req.params.pageId;
            for (var i in pages) {
                if (pages[i]._id === id) {
                    pages.splice(i, 1);
                    res.sendStatus(200);
                    return;
                }
            }
            res.sendStatus(400);
        }

        function updatePage(req, res) {
            var id = req.params.pageId;
            var newPage = req.body;
            for (var i in pages) {
                if (pages[i]._id === id) {
                    pages[i] = newPage;
                    res.sendStatus(200);
                    return;
                }
            }
            res.sendStatus(400);
        }

        function createPage(req, res) {
            var page = req.body;
            pages.push(page);
            res.sendStatus(200);
        }

        function findPageById(req, res) {
            var pageId = req.params.pageId;
            for (var i in pages) {
                if (pages[i]._id === pageId) {
                    res.json(pages[i]);
                    return;
                }
            }
            res.send();
        }

        function findAllPagesForWebsite(req, res) {
            var results = [];
            var websiteId = req.params.websiteId;
            for (var i in pages) {
                if (pages[i].websiteId === websiteId) {
                    results.push(pages[i]);
                }
            }
            res.json(results);
        }
};
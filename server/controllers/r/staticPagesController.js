module.exports = {
    index: function(req, res) {
        res.render('index', function(err, html) {
            if (err) {
                res.send(500);
            }

            res.set('Content-Type', 'text/html');
            res.send(200, new Buffer(html));
        });
    }
};

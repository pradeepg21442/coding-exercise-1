function setup(app) {
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    var updatePayload = require('../service/updatePayload');

    app.post('/formateData', updatePayload);

    var testServer = app.listen(3000, function () {
        console.log('Unit Test Server is up...');
    });
    return testServer;
}

module.exports = {
    setup: setup
};
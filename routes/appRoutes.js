var updatePayload = require('../service/updatePayload');
module.exports = function (app) {
    app.post('/formateData', updatePayload);
};

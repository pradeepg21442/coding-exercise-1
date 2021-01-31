var chai = require('chai');
var req = require('supertest');
var express = require('express');
var server = require('./server');
var expect = chai.expect;
var app;


var data_1 = {
    payload: {
        'name': 'MN',
        'valueType': 'string',
        'value': '{REF_MSISDN}'
    },
    referenceData: {
        'REF_MSISDN': '0406679321',
        'REF_IMSI': '50002312344314',
        'REF_SERVPROFID': '2'
    }
};

var data_2 = {
    payload: {
        "name": "subscriber",
        "valueType": "array",
        "value": [
            {
                "name": "MN",
                "valueType": "string",
                "value": "{REF_MSISDN}"
            }
        ]
    },
    referenceData: {
        'REF_MSISDN': '0406679321',
        'REF_IMSI': '50002312344314',
        'REF_SERVPROFID': '2'
    }
};
describe('Test cases for /formateData api', function () {
    beforeEach(function () {
        app = server.setup(express());
    });

    afterEach(function () {
        app.close();
    });

    it('TC01: it should update the value with referenceData value when valueType is string', function (done) {
        req(app).post('/formateData')
            .send(data_1)
            .end(function (err, res) {if (err) {
                expect.fail();
                done(err);
            } else {
                expect(res.body.name).to.be.equal('MN');
                expect(res.body.value).to.be.equal('0406679321');
                expect(res.body.valueType).to.be.equal('string');
                done();
            }
            });
    });

    it('TC02: it should update the value with referenceData value when valueType is array', function (done) {

        req(app).post('/formateData')
            .send(data_2)
            .end(function (err, res) {if (err) {
                expect.fail();
                done(err);
            } else {
                expect(res.body.name).to.be.equal('subscriber');
                expect(res.body.valueType).to.be.equal('array');
                done();
            }
            });
    });
});
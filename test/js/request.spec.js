"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var sinon = require("sinon");
var request_1 = require("../sources/js/request");
describe('request', function () {
    var xhr, requests;
    beforeEach(function () {
        xhr = sinon.useFakeXMLHttpRequest();
        global.XMLHttpRequest = xhr; // XMLHttpRequest does not exist in node, so set global XMLHttpRequest to FakeXMLHttpRequest
        requests = [];
        xhr.onCreate = function (req) {
            requests.push(req);
        };
    });
    afterEach(function () {
        xhr.restore();
    });
    it('should make a GET request to a URL', function () {
        request_1.request('https://example.com', sinon.spy());
        chai_1.assert.strictEqual(requests.length, 1);
        chai_1.assert.strictEqual(requests[0].url, "https://example.com");
    });
    it('should return an error if the returned HTTP status code is not 200', function () {
        var callback = sinon.spy();
        request_1.request('https://example.com', callback);
        chai_1.assert.strictEqual(requests.length, 1);
        chai_1.assert.strictEqual(requests[0].url, "https://example.com");
        requests[0].respond(404, { "Content-Type": "application/json" }, '');
        chai_1.assert.isTrue(callback.calledWith('Request failed.  Returned status of 404'));
    });
    it('should return JSON result as string', function () {
        var callback = sinon.spy();
        request_1.request('https://example.com', callback);
        chai_1.assert.strictEqual(requests.length, 1);
        chai_1.assert.strictEqual(requests[0].url, "https://example.com");
        requests[0].respond(200, { "Content-Type": "application/json" }, '{"test": "example"}');
        chai_1.assert.isTrue(callback.calledWith(null, '{"test": "example"}'));
    });
});

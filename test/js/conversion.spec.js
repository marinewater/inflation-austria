"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var conversion_1 = require("../../js/conversion");
describe('round', function () {
    it('should round 0 to 0', function () {
        chai_1.assert.strictEqual(conversion_1.round(0), 0);
    });
    it('should round 1.2 to 1.2', function () {
        chai_1.assert.strictEqual(conversion_1.round(1.2), 1.2);
    });
    it('should round 1.23 to 1.23', function () {
        chai_1.assert.strictEqual(conversion_1.round(1.23), 1.23);
    });
    it('should round 1.234 to 1.23', function () {
        chai_1.assert.strictEqual(conversion_1.round(1.234), 1.23);
    });
    it('should round 1.235 to 1.23', function () {
        chai_1.assert.strictEqual(conversion_1.round(1.235), 1.24);
    });
    it('should round 1.245 to 1.25', function () {
        chai_1.assert.strictEqual(conversion_1.round(1.245), 1.25);
    });
    it('should round 1.249 to 1.25', function () {
        chai_1.assert.strictEqual(conversion_1.round(1.249), 1.25);
    });
    it('should round -1.234 to -1.23', function () {
        chai_1.assert.strictEqual(conversion_1.round(-1.234), -1.23);
    });
});

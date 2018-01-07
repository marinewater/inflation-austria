"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var sinon = require("sinon");
var inflation_1 = require("../../js/inflation");
var html = require("../../js/html");
describe('inflation', function () {
    var year_from_getter, month_from_getter, year_to_getter, month_to_getter, euro_from_getter, euro_result_setter, inflation_result_setter;
    before(function () {
        year_from_getter = sinon.stub(html, 'year_from_getter').returns(2017);
        month_from_getter = sinon.stub(html, 'month_from_getter').returns('Jänner');
        year_to_getter = sinon.stub(html, 'year_to_getter').returns(2017);
        month_to_getter = sinon.stub(html, 'month_to_getter').returns('Februar');
        euro_from_getter = sinon.stub(html, 'euro_from_getter').returns(100);
        var euro_result_setter_spy = sinon.spy();
        euro_result_setter = sinon.stub(html, 'euro_result_setter').callsFake(euro_result_setter_spy);
        var inflation_result_setter_spy = sinon.spy();
        inflation_result_setter = sinon.stub(html, 'inflation_result_setter').callsFake(inflation_result_setter_spy);
        inflation_1.inflation_data[2017] = { 'Jänner': 100, 'Februar': 105 };
    });
    after(function () {
        year_from_getter.restore();
        month_from_getter.restore();
        year_to_getter.restore();
        month_to_getter.restore();
        euro_from_getter.restore();
        euro_result_setter.restore();
        inflation_result_setter.restore();
        delete inflation_1.inflation_data[2017];
    });
    it('should calculate inflation', function () {
        inflation_1.update_inflation();
        chai_1.assert.isTrue(euro_result_setter.calledWith(105));
        chai_1.assert.isTrue(inflation_result_setter.calledWith(5));
    });
});

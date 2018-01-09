import { assert } from 'chai';
import 'mocha';
import * as sinon from 'sinon';

import { inflation_data, update_inflation } from '../sources/js/inflation';
import * as html from '../sources/js/html';
import { SinonStub } from "sinon";


describe( 'inflation', function () {

    let year_from_getter: SinonStub, month_from_getter: SinonStub, year_to_getter: SinonStub, month_to_getter: SinonStub,
        euro_from_getter: SinonStub, euro_result_setter: SinonStub, inflation_result_setter: SinonStub;

    before( function () {

        year_from_getter = sinon.stub( html, 'year_from_getter' ).returns( 2017 );
        month_from_getter = sinon.stub( html, 'month_from_getter' ).returns( 'Jänner' );
        year_to_getter = sinon.stub( html, 'year_to_getter' ).returns( 2017 );
        month_to_getter = sinon.stub( html, 'month_to_getter' ).returns( 'Februar' );

        euro_from_getter = sinon.stub( html, 'euro_from_getter' ).returns( 100 );

        const euro_result_setter_spy = sinon.spy();
        euro_result_setter = sinon.stub( html, 'euro_result_setter' ).callsFake( euro_result_setter_spy );

        const inflation_result_setter_spy = sinon.spy();
        inflation_result_setter = sinon.stub( html, 'inflation_result_setter' ).callsFake( inflation_result_setter_spy );

        inflation_data[ 2017 ] = { 'Jänner': 100, 'Februar': 105 };

    });

    after( function() {

        year_from_getter.restore();
        month_from_getter.restore();
        year_to_getter.restore();
        month_to_getter.restore();
        euro_from_getter.restore();
        euro_result_setter.restore();
        inflation_result_setter.restore();

        delete inflation_data[ 2017 ];

    });

    it( 'should calculate inflation', function () {
        
        update_inflation();

        assert.isTrue( euro_result_setter.calledWith( 105 ) );
        assert.isTrue( inflation_result_setter.calledWith( 5 ) );

        
    });

});
import { assert } from 'chai';
import 'mocha';
import * as sinon from 'sinon';

import { request } from '../../js/request';

describe( 'request', function() {

    let xhr: sinon.SinonFakeXMLHttpRequest, requests: sinon.SinonFakeXMLHttpRequest[];

    beforeEach( function() {

        xhr = sinon.useFakeXMLHttpRequest();
        (<any>global).XMLHttpRequest = xhr; // XMLHttpRequest does not exist in node, so set global XMLHttpRequest to FakeXMLHttpRequest
        requests = [];
        xhr.onCreate = function ( req: sinon.SinonFakeXMLHttpRequest ) {
            requests.push( req );
        };

    });

    afterEach( function() {

        xhr.restore();

    });

    it( 'should make a GET request to a URL', function () {

        request( 'https://example.com', sinon.spy() );
        assert.strictEqual( requests.length, 1 );
        assert.strictEqual( requests[ 0 ].url, "https://example.com" );

    });

    it( 'should return an error if the returned HTTP status code is not 200', function () {

        const callback = sinon.spy();

        request( 'https://example.com', callback );
        assert.strictEqual( requests.length, 1 );
        assert.strictEqual( requests[ 0 ].url, "https://example.com" );

        requests[ 0 ].respond(404, { "Content-Type": "application/json" },'' );

        assert.isTrue( callback.calledWith( 'Request failed.  Returned status of 404' ) );

    });

    it( 'should return JSON result as string', function () {

        const callback = sinon.spy();

        request( 'https://example.com', callback );
        assert.strictEqual( requests.length, 1 );
        assert.strictEqual( requests[ 0 ].url, "https://example.com" );

        requests[ 0 ].respond(200, { "Content-Type": "application/json" },'{"test": "example"}' );

        assert.isTrue( callback.calledWith( null, '{"test": "example"}' ) );

    });

});
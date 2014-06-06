/** @jsx React.DOM */

jest.dontMock('../Ticker.js');
jest.dontMock('../reacting.coffee');

describe('Ticker', function () {

  var React, Ticker, TestUtils;

  beforeEach(function () {
    React = require('react/addons');
    Ticker = require('../Ticker');
    TestUtils = React.addons.TestUtils;
  });

  describe('basic functionality', function () {

    var ticker, domTicker;

    beforeEach(function () {
      ticker = <Ticker />;
      TestUtils.renderIntoDocument(ticker);
      domTicker = TestUtils.findRenderedComponentWithType(ticker, Ticker);
    });

    it('state defaults to 0 when initialized', function () {
      expect(domTicker.getDOMNode().textContent).toEqual("0");
    });

    it('displays current when passed in', function () {
      ticker = <Ticker current={10} />;
      TestUtils.renderIntoDocument(ticker);
      domTicker = TestUtils.findRenderedComponentWithType(ticker, Ticker);
      expect(domTicker.getDOMNode().textContent).toEqual("10");
    });

  });

  describe('#shouldComponentUpdate', function () {

    var ticker, domTicker;

    beforeEach(function () {
      ticker = <Ticker />;
      TestUtils.renderIntoDocument(ticker);
      domTicker = TestUtils.findRenderedComponentWithType(ticker, Ticker);
    });

    it('returns false if new value is equal to current', function () {
      expect(domTicker.shouldComponentUpdate({current: 10})).toEqual(false);
    });

    it('returns false on the first call', function () {
      expect(domTicker.shouldComponentUpdate({current: 3})).toEqual(false);
    });

    it('calls @setProps if nextProps._to is undefined', function () {
      var setProps= jest.genMockFunction();
      domTicker.setProps = setProps;
      domTicker.shouldComponentUpdate({current: 3})
      expect(setProps).toBeCalled();
    });

    it('returns false if nextProps._to is undefined', function () {
      expect(domTicker.shouldComponentUpdate({current: 3})).toEqual(false);
    });

    it('returns true otherwise', function () {
      expect(domTicker.shouldComponentUpdate({current: 3, _to: 4})).toEqual(true);
    });

  });

  describe('#componentWillUpdate', function () {

    it('calls setProps with _to value set to current', function () {
      domTicker.setProps({current: 10});

      var setProps = jest.genMockFunction();
      domTicker.setProps = setProps;

      jest.runOnlyPendingTimers();

      expect(setProps).toBeCalled();
      expect(setProps.mock.calls.length).toBe(1);
      expect(setProps.mock.calls[0][0]._to).toBe(10);
    });

  });

});

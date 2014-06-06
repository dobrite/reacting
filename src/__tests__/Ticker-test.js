/** @jsx React.DOM */

jest.dontMock('../Ticker.js');
jest.dontMock('../reacting.coffee');
jest.dontMock('../utils.coffee');

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

    var ticker, domTicker;

    beforeEach(function () {
      ticker = <Ticker />;
      TestUtils.renderIntoDocument(ticker);
      domTicker = TestUtils.findRenderedComponentWithType(ticker, Ticker);
    });

    it('calls setProps with _to value set to current', function () {
      //TODO remove or rewrite this to test componentWillUdpate
      //domTicker.setProps({current: 90});
      //var ogSetProps = domTicker.setProps;
      //var setProps = jest.genMockFunction();

      //domTicker.setProps = setProps;

      //jest.runAllTimers();

      //expect(setProps).toBeCalled();
      //expect(setProps.mock.calls.length).toBe(1);
      //console.log(setProps.mock.calls[1][0]);
      //expect(setProps.mock.calls[1][0]).toBe(90);
    });

  });

  describe('#_setupAnimationProps', function () {

    var ticker, domTicker;

    beforeEach(function () {
      op = require('../utils.coffee');
      ticker = <Ticker />;
      TestUtils.renderIntoDocument(ticker);
      domTicker = TestUtils.findRenderedComponentWithType(ticker, Ticker);
    });

    it('set _to to current', function () {
      var nextProps = domTicker._setupAnimationProps({current: 10});
      expect(nextProps._to).toEqual(10);
    });

    it('sets _step positive if going up', function () {
      var nextProps = domTicker._setupAnimationProps({current: 10});
      expect(nextProps._step).toBeGreaterThan(0);
    });

    it('sets _step negative if going down', function () {
      var nextProps = domTicker._setupAnimationProps({current: -10});
      expect(nextProps._step).toBeLessThan(0);
    });

    it('current is set to initial', function () {
      var nextProps = domTicker._setupAnimationProps({current: 90});
      expect(nextProps.current).toEqual(0);
    });

    it('_func is set to Math.ceil if animating up', function () {
      var nextProps = domTicker._setupAnimationProps({current: 90});
      expect(nextProps._func).toEqual(Math.ceil);
    });

    it('_func is set to Math.floor if animating down', function () {
      var nextProps = domTicker._setupAnimationProps({current: -90});
      expect(nextProps._func).toEqual(Math.floor);
    });

    it('_comp is set to Math.min if animating up', function () {
      var nextProps = domTicker._setupAnimationProps({current: 90});
      expect(nextProps._comp).toEqual(Math.min);
    });

    it('_comp is set to Math.max if animating down', function () {
      var nextProps = domTicker._setupAnimationProps({current: -90});
      expect(nextProps._comp).toEqual(Math.max);
    });

  });

  describe('#_advanceAnimation', function () {

    var ticker, domTicker, op

    beforeEach(function () {
      op = require('../utils.coffee');
      ticker = <Ticker />;
      TestUtils.renderIntoDocument(ticker);
      domTicker = TestUtils.findRenderedComponentWithType(ticker, Ticker);
    });

    it('increases value by step if going up', function () {
      var value = domTicker._advanceAnimation(0, 10, 1, Math.ceil, Math.min);
      expect(value).toEqual(1);
    });

    it('decreases value by step if going down', function () {
      var value = domTicker._advanceAnimation(0, -10, -1, Math.floor, Math.max);
      expect(value).toEqual(-1);
    });

    it('incrs by 1 even if step is between 0 and 1', function () {
      var value = domTicker._advanceAnimation(0, 10, 0.3333, Math.ceil, Math.min);
      expect(value).toEqual(1);
    });

    it('decrs by 1 even if step is between 0 and -1', function () {
      var value = domTicker._advanceAnimation(0, -10, -0.3333, Math.floor, Math.max);
      expect(value).toEqual(-1);
    });

  });

  //describe('_done', function () {

  //  var ticker, domTicker;

  //  beforeEach(function () {
  //    ticker = <Ticker />;
  //    TestUtils.renderIntoDocument(ticker);
  //    domTicker = TestUtils.findRenderedComponentWithType(ticker, Ticker);
  //  });

  //  it('returns true if current > _to going up', function () {
  //    var done = domTicker._done({
  //      current: 11,
  //      _to: 10,
  //      _step: 1,
  //      _up: true,
  //    });
  //    expect(done).toEqual(true);
  //  });

  //  it('returns false if current == _to going up', function () {
  //    var done = domTicker._done({
  //      current: 10,
  //      _to: 10,
  //      _step: 1,
  //      _up: true,
  //    });
  //    expect(done).toEqual(false);
  //  });

  //  it('returns false if current < _to going up', function () {
  //    var done = domTicker._done({
  //      current: 9,
  //      _to: 10,
  //      _step: 1,
  //      _up: true,
  //    });
  //    expect(done).toEqual(false);
  //  });

  //  it('returns true if current < _to going down', function () {
  //    var done = domTicker._done({
  //      current: -11,
  //      _to: -10,
  //      _step: -1,
  //      _up: false,
  //    });
  //    expect(done).toEqual(true);
  //  });

  //  it('returns false if current == _to going down', function () {
  //    var done = domTicker._done({
  //      current: -10,
  //      _to: -10,
  //      _step: -1,
  //      _up: false,
  //    });
  //    expect(done).toEqual(false);
  //  });

  //  it('returns false if current > _to going down', function () {
  //    var done = domTicker._done({
  //      current: -9,
  //      _to: -10,
  //      _step: -1,
  //      _up: false,
  //    });
  //    expect(done).toEqual(false);
  //  });

  //  it('returns false if _up is undefined', function () {
  //    var done = domTicker._done({
  //      current: -10
  //    });
  //    expect(done).toEqual(false);
  //  });

  //});

  describe('integration', function () {

    var ticker, domTicker;

    beforeEach(function () {
      ticker = <Ticker />;
      TestUtils.renderIntoDocument(ticker);
      domTicker = TestUtils.findRenderedComponentWithType(ticker, Ticker);
    });

    it('finishes on current for a positive value', function () {
      domTicker.setProps({current: 90});
      jest.runAllTimers();
      expect(domTicker.getDOMNode().textContent).toEqual("90");
    });

    it('finishes on current for a negative value', function () {
      domTicker.setProps({current: -90});
      jest.runAllTimers();
      expect(domTicker.getDOMNode().textContent).toEqual("-90");
    });

    it('finishes on current for a large positive value', function () {
      domTicker.setProps({current: 100000});
      jest.runAllTimers();
      expect(domTicker.getDOMNode().textContent).toEqual("100000");
    });

    it('finishes on current for a large negative value', function () {
      domTicker.setProps({current: -100000});
      jest.runAllTimers();
      expect(domTicker.getDOMNode().textContent).toEqual("-100000");
    });

  });

});

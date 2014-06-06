/** @jsx React.DOM */

jest.dontMock('../AnimatedProp.react.js');
jest.dontMock('../reacting.coffee');
jest.dontMock('../utils.coffee');

describe('AnimatedProp', function () {

  var React, AnimatedProp, TestUtils, animatedProp, domAnimatedProp, op;

  beforeEach(function () {
    op = require('../utils.coffee');
    React = require('react/addons');
    AnimatedProp = require('../AnimatedProp.react.js');
    TestUtils = React.addons.TestUtils;
    animatedProp = <AnimatedProp />;
    TestUtils.renderIntoDocument(animatedProp);
    domAnimatedProp = TestUtils.findRenderedComponentWithType(animatedProp, AnimatedProp);
  });

  describe('basic functionality', function () {

    it('state defaults to 0 when initialized', function () {
      expect(domAnimatedProp.getDOMNode().textContent).toEqual("0");
    });

    it('displays current when passed in', function () {
      animatedProp = <AnimatedProp current={10} />;
      TestUtils.renderIntoDocument(animatedProp);
      domAnimatedProp = TestUtils.findRenderedComponentWithType(animatedProp, AnimatedProp);
      expect(domAnimatedProp.getDOMNode().textContent).toEqual("10");
    });

  });

  describe('#shouldComponentUpdate', function () {

    it('returns false if new value is equal to current', function () {
      expect(domAnimatedProp.shouldComponentUpdate({current: 10})).toEqual(false);
    });

    it('returns false on the first call', function () {
      expect(domAnimatedProp.shouldComponentUpdate({current: 3})).toEqual(false);
    });

    it('calls @setProps if nextProps._to is undefined', function () {
      var setProps= jest.genMockFunction();
      domAnimatedProp.setProps = setProps;
      domAnimatedProp.shouldComponentUpdate({current: 3})
      expect(setProps).toBeCalled();
    });

    it('returns false if nextProps._to is undefined', function () {
      expect(domAnimatedProp.shouldComponentUpdate({current: 3})).toEqual(false);
    });

    it('returns true otherwise', function () {
      expect(domAnimatedProp.shouldComponentUpdate({current: 3, _to: 4})).toEqual(true);
    });

  });

  describe('#componentWillUpdate', function () {

    it('calls setProps with _to value set to current', function () {
      //TODO remove or rewrite this to test componentWillUdpate
      //domAnimatedProp.setProps({current: 90});
      //var ogSetProps = domAnimatedProp.setProps;
      //var setProps = jest.genMockFunction();

      //domAnimatedProp.setProps = setProps;

      //jest.runAllTimers();

      //expect(setProps).toBeCalled();
      //expect(setProps.mock.calls.length).toBe(1);
      //console.log(setProps.mock.calls[1][0]);
      //expect(setProps.mock.calls[1][0]).toBe(90);
    });

  });

  describe('#_setupAnimationProps', function () {

    it('set _to to current', function () {
      var nextProps = domAnimatedProp._setupAnimationProps({current: 10});
      expect(nextProps._to).toEqual(10);
    });

    it('sets _step positive if going up', function () {
      var nextProps = domAnimatedProp._setupAnimationProps({current: 10});
      expect(nextProps._step).toBeGreaterThan(0);
    });

    it('sets _step negative if going down', function () {
      var nextProps = domAnimatedProp._setupAnimationProps({current: -10});
      expect(nextProps._step).toBeLessThan(0);
    });

    it('current is set to initial', function () {
      var nextProps = domAnimatedProp._setupAnimationProps({current: 90});
      expect(nextProps.current).toEqual(0);
    });

    it('_func is set to Math.ceil if animating up', function () {
      var nextProps = domAnimatedProp._setupAnimationProps({current: 90});
      expect(nextProps._func).toEqual(Math.ceil);
    });

    it('_func is set to Math.floor if animating down', function () {
      var nextProps = domAnimatedProp._setupAnimationProps({current: -90});
      expect(nextProps._func).toEqual(Math.floor);
    });

    it('_comp is set to Math.min if animating up', function () {
      var nextProps = domAnimatedProp._setupAnimationProps({current: 90});
      expect(nextProps._comp).toEqual(Math.min);
    });

    it('_comp is set to Math.max if animating down', function () {
      var nextProps = domAnimatedProp._setupAnimationProps({current: -90});
      expect(nextProps._comp).toEqual(Math.max);
    });

  });

  describe('#_advanceAnimation', function () {

    it('increases value by step if going up', function () {
      var value = domAnimatedProp._advanceAnimation({
        current: 0,
        _to: 10,
        _step: 1,
        _func: Math.ceil,
        _comp: Math.min,
      });
      expect(value).toEqual(1);
    });

    it('decreases value by step if going down', function () {
      var value = domAnimatedProp._advanceAnimation({
        current: 0,
        _to: -10,
        _step: -1,
        _func: Math.floor,
        _comp: Math.max,
      });
      expect(value).toEqual(-1);
    });

    it('incrs by 1 even if step is between 0 and 1', function () {
      var value = domAnimatedProp._advanceAnimation({
        current: 0,
        _to: 10,
        _step: 0.3333,
        _func: Math.ceil,
        _comp: Math.min,
      });
      expect(value).toEqual(1);
    });

    it('decrs by 1 even if step is between 0 and -1', function () {
      var value = domAnimatedProp._advanceAnimation({
        current: 0,
        _to: -10,
        _step: -0.3333,
        _func: Math.floor,
        _comp: Math.max,
      });
      expect(value).toEqual(-1);
    });

  });

  describe('integration', function () {

    it('finishes on current for a positive value', function () {
      domAnimatedProp.setProps({current: 90});
      jest.runAllTimers();
      expect(domAnimatedProp.getDOMNode().textContent).toEqual("90");
    });

    it('finishes on current for a negative value', function () {
      domAnimatedProp.setProps({current: -90});
      jest.runAllTimers();
      expect(domAnimatedProp.getDOMNode().textContent).toEqual("-90");
    });

    it('finishes on current for a large positive value', function () {
      domAnimatedProp.setProps({current: 100000});
      jest.runAllTimers();
      expect(domAnimatedProp.getDOMNode().textContent).toEqual("100000");
    });

    it('finishes on current for a large negative value', function () {
      domAnimatedProp.setProps({current: -100000});
      jest.runAllTimers();
      expect(domAnimatedProp.getDOMNode().textContent).toEqual("-100000");
    });

  });

});

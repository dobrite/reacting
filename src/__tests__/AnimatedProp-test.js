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

    it('returns false if updateAt changed', function () {
      domAnimatedProp.props = {updatedAt: 2}
      expect(domAnimatedProp.shouldComponentUpdate({updatedAt: 1})).toEqual(false);
    });

    it('returns true if updateAt is the same', function () {
      domAnimatedProp.props = {updatedAt: 1}
      expect(domAnimatedProp.shouldComponentUpdate({updatedAt: 1})).toEqual(true);
    });

    it('calls @setProps if updatedAt changed', function () {
      var setProps = jest.genMockFunction();
      domAnimatedProp.setProps = setProps;
      domAnimatedProp.props = {updatedAt: 2}
      domAnimatedProp.shouldComponentUpdate({updatedAt: 1})
      expect(setProps).toBeCalled();
    });

    it('does not call @setProps if updatedAt did not change', function () {
      var setProps = jest.genMockFunction();
      domAnimatedProp.setProps = setProps;
      domAnimatedProp.props = {updatedAt: 1}
      domAnimatedProp.shouldComponentUpdate({updatedAt: 1})
      expect(setProps).not.toBeCalled();
    });

  });

  //TODO write componentWillUpdate

  describe('#_setupAnimationData', function () {

    it('current is set to initial', function () {
      var ad = domAnimatedProp._setupAnimationData(0, 90);
      expect(ad.current).toEqual(0);
    });

    it('creates an advance function', function () {
      var ad = domAnimatedProp._setupAnimationData(0, 90);
      expect(typeof(ad.advance)).toEqual("function");
    });
  });

  describe('animationData', function () {

    it('increases value by step if going up', function () {
      var ad = domAnimatedProp._setupAnimationData(0, 10);
      expect(ad.advance(ad)).toEqual(1);
    });

    it('decreases value by step if going down', function () {
      var ad = domAnimatedProp._setupAnimationData(0, -10);
      expect(ad.advance(ad)).toEqual(-1);
    });

    it('incrs by 1 even if step is between 0 and 1', function () {
      var ad = domAnimatedProp._setupAnimationData(0, 10);
      expect(ad.advance(ad)).toEqual(1);
    });

    it('decrs by 1 even if step is between 0 and -1', function () {
      var ad = domAnimatedProp._setupAnimationData(0, -10);
      expect(ad.advance(ad)).toEqual(-1);
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

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

    animatedProp = <AnimatedProp />;

    TestUtils = React.addons.TestUtils;
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
      animatedProp = <AnimatedProp current={10} />;
      TestUtils.renderIntoDocument(animatedProp);
      domAnimatedProp = TestUtils.findRenderedComponentWithType(animatedProp, AnimatedProp);
      expect(domAnimatedProp.shouldComponentUpdate({current: 10})).toEqual(false);
    });

    it('returns false on the first call', function () {
      expect(domAnimatedProp.shouldComponentUpdate({current: 3})).toEqual(false);
    });

    it('calls @setProps if nextProps.advance is undefined', function () {
      var setProps= jest.genMockFunction();
      domAnimatedProp.setProps = setProps;
      domAnimatedProp.shouldComponentUpdate({current: 3})
      expect(setProps).toBeCalled();
    });

    it('returns true otherwise', function () {
      props = {
        current: {
          current: 3,
          advance: function () {},
        }
      }
      expect(domAnimatedProp.shouldComponentUpdate(props)).toEqual(true);
    });

  });

  describe('#componentWillUpdate', function () {

    // TODO these are wrong!
    //it('calls setProps with _to value set to current', function () {
    //  domAnimatedProp.setProps = setProps = jest.genMockFunction();
    //  var should = domAnimatedProp.shouldComponentUpdate({current: 90});
    //  expect(should).toEqual(false);
    //  expect(setProps).toBeCalled();
    //});

    //it('second time through it should return true', function () {
    //  var should = domAnimatedProp.shouldComponentUpdate({current: 90, advance: 'something'});
    //  expect(should).toEqual(true);
    //});

  });

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

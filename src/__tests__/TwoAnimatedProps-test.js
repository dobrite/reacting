/** @jsx React.DOM */

jest.dontMock('../TwoAnimatedProps.react.js');
jest.dontMock('../reacting.coffee');
jest.dontMock('../utils.coffee');

describe('AnimatedProp', function () {

  var React, TwoAnimatedProps, TestUtils, twoAnimatedProps, domTwoAnimatedProps, op;

  beforeEach(function () {
    op = require('../utils.coffee');
    React = require('react/addons');
    TwoAnimatedProps = require('../TwoAnimatedProps.react.js');

    twoAnimatedProps = <TwoAnimatedProps />;

    TestUtils = React.addons.TestUtils;
    TestUtils.renderIntoDocument(twoAnimatedProps);
    domTwoAnimatedProps = TestUtils.findRenderedComponentWithType(twoAnimatedProps, TwoAnimatedProps);
  });

  describe('basic functionality', function () {

    it('state defaults to "0 0" when initialized', function () {
      expect(domTwoAnimatedProps.getDOMNode().textContent).toEqual("0 0");
    });

  });

});

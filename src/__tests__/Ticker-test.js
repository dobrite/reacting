/** @jsx React.DOM */
jest.dontMock('../Ticker.js');
describe('Ticker', function () {
  it('state defaults to 0 when initialized', function () {
    var React = require('react/addons');
    var Ticker = require('../Ticker');
    var TestUtils = React.addons.TestUtils;

    var ticker = <Ticker />;
    TestUtils.renderIntoDocument(ticker);

    var domTicker = TestUtils.findRenderedComponentWithType(ticker, Ticker);
    expect(domTicker.getDOMNode().textContent).toEqual("0");
  });

  it('displays current when passed in', function () {
    var React = require('react/addons');
    var Ticker = require('../Ticker');
    var TestUtils = React.addons.TestUtils;

    var ticker = <Ticker current="10" />;
    TestUtils.renderIntoDocument(ticker);

    var domTicker = TestUtils.findRenderedComponentWithType(ticker, Ticker);
    expect(domTicker.getDOMNode().textContent).toEqual("10");
  });
  it.only('displays current when passed in', function () {
    var React = require('react/addons');
    var Ticker = require('../Ticker');
    var TestUtils = React.addons.TestUtils;

    var ticker = <Ticker />;
    TestUtils.renderIntoDocument(ticker);

    var domTicker = TestUtils.findRenderedComponentWithType(ticker, Ticker);
    domTicker.setProps({current: 10});
  });
});

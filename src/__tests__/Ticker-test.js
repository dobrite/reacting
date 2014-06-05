/** @jsx React.DOM */
jest.dontMock('../Ticker.js');
jest.dontMock('../reacting.coffee');
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

    var ticker = <Ticker current={10} />;
    TestUtils.renderIntoDocument(ticker);

    var domTicker = TestUtils.findRenderedComponentWithType(ticker, Ticker);
    expect(domTicker.getDOMNode().textContent).toEqual("10");
  });

  it.only('calls setProps with _to value set to current', function () {
    var React = require('react/addons');
    var Ticker = require('../Ticker');
    var TestUtils = React.addons.TestUtils;

    var ticker = <Ticker />;
    TestUtils.renderIntoDocument(ticker);

    var domTicker = TestUtils.findRenderedComponentWithType(ticker, Ticker);
    domTicker.setProps({current: 10});

    //domTicker.setProps = setProps = jest.genMockFunction();

    //jest.runOnlyPendingTimers();
    jest.runAllTimers();

    expect(setProps).toBeCalled();
    expect(setProps.mock.calls.length).toBe(1);
  });
});

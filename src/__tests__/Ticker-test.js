/** @jsx React.DOM */
jest.dontMock('../Ticker.js');
describe('Ticker', function () {
  it('updates value', function () {
    var React = require('react/addons');
    var Ticker = require('../Ticker');
    var TestUtils = React.addons.TestUtils;

    var ticker = <Ticker current="10" />;
    TestUtils.renderIntoDocument(ticker);

    var domTicker = TestUtils.findRenderedComponentWithType(ticker, Ticker);
    expect(domTicker.getDOMNode().textContent).toEqual("10");
  });
});

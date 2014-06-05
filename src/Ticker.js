/** @jsx React.DOM */

var React = require('react/addons');
var Reacting = require('reacting');

var Ticker = React.createClass({
  mixins: [
    Reacting.RecursiveValue('current')
  ],

  getDefaultProps: function () {
    return {
      current: 0
    };
  },

  render: function () {
    console.log("--", this.props.current, "--");
    return (
      <div>{this.props.current}</div>
    );
  }
});

module.exports = Ticker;

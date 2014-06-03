/** @jsx React.DOM */

var React = require('react/addons');
var Reacting = require('reacting');

var Ticker = React.createClass({
  mixins: Reacting.AnimatedValue('value'),

  getDefaultProps: function () {
    return {
      current: "0"
    };
  },

  render: function () {
    return (
      <div>{this.props.current}</div>
    );
  }
});

module.exports = Ticker;

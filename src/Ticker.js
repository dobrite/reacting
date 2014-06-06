/** @jsx React.DOM */

var React = require('react/addons');
var Reacting = require('./reacting.coffee');

var Ticker = React.createClass({
  mixins: [
    Reacting.AnimatedValue('current')
  ],

  getDefaultProps: function () {
    return {
      current: 0
    };
  },

  render: function () {
    return (
      <div>{this.props.current}</div>
    );
  }
});

module.exports = Ticker;

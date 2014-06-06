/** @jsx React.DOM */

var React = require('react/addons');
var Reacting = require('./reacting.coffee');

var AnimatedValue = React.createClass({
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

module.exports = AnimatedValue;

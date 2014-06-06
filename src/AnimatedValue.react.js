/** @jsx React.DOM */

var React = require('react');
var AnimatedValueMixin = require('./animated-value-mixin.coffee');

var AnimatedValue = React.createClass({
  mixins: [
    AnimatedValueMixin('current')
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

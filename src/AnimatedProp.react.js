/** @jsx React.DOM */

var React = require('react');
var AnimatedPropMixin = require('./animated-prop-mixin.coffee');

var AnimatedProp = React.createClass({
  mixins: [
    AnimatedPropMixin('current')
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

module.exports = AnimatedProp;

/** @jsx React.DOM */

var React = require('react');
var AnimatedPropMixin = require('./animated-prop-mixin.coffee');

var TwoAnimatedProps = React.createClass({
  mixins: [
    AnimatedPropMixin([
      'current',
      'value',
    ]),
  ],

  getDefaultProps: function () {
    return {
      current: 0,
      value: 0
    };
  },

  render: function () {
    return (
      <div>
        <span>{this.props.current}</span> <span>{this.props.value}</span>
      </div>
    );
  }
});

module.exports = TwoAnimatedProps;

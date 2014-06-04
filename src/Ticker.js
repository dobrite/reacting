/** @jsx React.DOM */

var React = require('react/addons');
var Reacting = require('reacting');

var Ticker = React.createClass({
  mixins: Reacting.AnimatedValue('value'),

  componentWillReceiveProps: function (nextProps) {
    console.log("R", nextProps);
    this.setProps({current: 55});
  },

  componentWillUpdate: function (nextProps) {
    console.log("U", nextProps);
    if (nextProps.current === 70) return;
    //this.setProps({current: nextProps.current + 1});
  },

  getDefaultProps: function () {
    return {
      current: "0"
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

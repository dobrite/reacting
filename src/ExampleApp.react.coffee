# @cjsx React.DOM
React = require 'react'
AnimatedProp    = require './AnimatedProp.react.js'
TwoAnimatedProp = require './TwoAnimatedProps.react.js'

up = React.renderComponent(
  <AnimatedProp />,
  document.getElementById 'up'
)

down = React.renderComponent(
  <AnimatedProp />,
  document.getElementById 'down'
)

two = React.renderComponent(
  <TwoAnimatedProps />,
  document.getElementById 'two'
)

up.setProps   current: 10000
down.setProps current: -10000
two.setProps  value: 10000, current: -10000

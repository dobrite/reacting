# @cjsx React.DOM
React = require 'react'
AnimatedProp = require './AnimatedProp.react.js'

up = React.renderComponent(
  <AnimatedProp />,
  document.getElementById 'up'
)

down = React.renderComponent(
  <AnimatedProp />,
  document.getElementById 'down'
)

up.setProps   current: 10000
down.setProps current: -10000

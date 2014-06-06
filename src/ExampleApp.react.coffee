# @cjsx React.DOM
React = require 'react'
AnimatedValue = require './AnimatedValue.react.js'

up = React.renderComponent(
  <AnimatedValue />,
  document.getElementById 'up'
)

down = React.renderComponent(
  <AnimatedValue />,
  document.getElementById 'down'
)

up.setProps   current: 10000
down.setProps current: -10000

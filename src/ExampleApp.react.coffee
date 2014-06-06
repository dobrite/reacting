# @cjsx React.DOM
React = require 'react'
Ticker = require './Ticker.js'

upTicker = React.renderComponent(
  <Ticker />,
  document.getElementById 'up'
)

downTicker = React.renderComponent(
  <Ticker />,
  document.getElementById 'down'
)

upTicker.setProps   current: 10000
downTicker.setProps current: -10000

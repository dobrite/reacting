animationData = (current, to) ->
  up   = to > current
  comp = if up then Math.min else Math.max
  func = if up then Math.ceil else Math.floor

  to: to
  current: current
  step: (to - current) / 90
  advance: ->
    comp(func(@current + @step), @to)

AnimatedPropMixin = (animatedProp) ->
  animatedProp = animatedProp || 'value'

  shouldComponentUpdate: (nextProps) ->
    if nextProps.to == undefined
      @setProps @_setupAnimationData @props[animatedProp], nextProps[animatedProp]
      false
    else
      true

  componentWillUpdate: (nextProps) ->
    int = setInterval =>
      clearInterval int
      if nextProps[animatedProp] != nextProps.to
        nextProps.current = nextProps.advance()
        @setProps nextProps
    , 10

  _setupAnimationData: (current, to) ->
    animationData current, to

module.exports = AnimatedPropMixin

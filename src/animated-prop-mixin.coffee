animationData = (current, to) ->
  up   = to > current
  comp = if up then Math.min else Math.max
  func = if up then Math.ceil else Math.floor
  step = (to - current) / 90

  current: current
  advance: (np) ->
    comp(func(np.current + step), to)

AnimatedPropMixin = (animatedProp) ->
  animatedProp = animatedProp || 'value'

  shouldComponentUpdate: (nextProps) ->
    if nextProps.advance == undefined
      @setProps animationData @props[animatedProp], nextProps[animatedProp]
      false
    else
      true

  componentWillUpdate: (nextProps) ->
    int = setInterval =>
      clearInterval int
      next = nextProps.advance(nextProps)
      if nextProps.current != next
        nextProps.current = next
        @setProps nextProps
    , 10

  ##
  # Really only for testing
  ##
  _setupAnimationData: (current, to) ->
    animationData current, to

module.exports = AnimatedPropMixin

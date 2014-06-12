animationData = (current, to) ->

AnimatedPropMixin = (animatedProp) ->
  animatedProp = animatedProp || 'value'

  shouldComponentUpdate: (nextProps) ->
    if @props.updatedAt != nextProps.updatedAt
      [current, to] = [@props[animatedProp], nextProps[animatedProp]]
      @setProps _setupAnimationData current, to
      false
    else
      true

  componentWillUpdate: (nextProps) ->
    int = setInterval =>
      clearInterval int
      next = nextProps.advance(nextProps)
      if nextProps.value != next
        nextProps.value = next
        @setProps nextProps
    , 10

  _setupAnimationData: (current, to) ->
    up   = to > current
    comp = if up then Math.min else Math.max
    func = if up then Math.ceil else Math.floor
    step = (to - current) / 90

    value: current
    advance: (np) ->
      comp(func(np.value + step), to)

module.exports = AnimatedPropMixin

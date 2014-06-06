AnimatedValueMixin = (animatedProp) ->
  shouldComponentUpdate: (nextProps) ->
    if nextProps._to == undefined
      @setProps @_setupAnimationProps nextProps
      false
    else
      true

  componentWillUpdate: (nextProps) ->
    int = setInterval =>
      clearInterval int
      if nextProps.current != nextProps._to
        nextProps.current = @_advanceAnimation(nextProps.current, nextProps._to, nextProps._step, nextProps._func, nextProps._comp)
        @setProps nextProps
    , 10

  _advanceAnimation: (value, to, step, func, comp) ->
    comp(func(value + step), to)

  _setupAnimationProps: (nextProps) ->
    nextProps._to = nextProps.current

    up = nextProps._to > @props.current
    nextProps._comp = if up then Math.min else Math.max
    nextProps._func = if up then Math.ceil else Math.floor

    nextProps.current = @props.current
    nextProps._step = (nextProps._to - nextProps.current) / 90
    nextProps

module.exports = AnimatedValueMixin

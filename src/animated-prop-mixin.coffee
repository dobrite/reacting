AnimatedPropMixin = (animatedProp) ->
  animatedProp = animatedProp || 'value'

  shouldComponentUpdate: (nextProps) ->
    if nextProps._to == undefined
      @setProps @_setupAnimationProps nextProps
      false
    else
      true

  componentWillUpdate: (nextProps) ->
    int = setInterval =>
      clearInterval int
      if nextProps[animatedProp] != nextProps._to
        nextProps.current = @_advanceAnimation nextProps
        @setProps nextProps
    , 10

  _advanceAnimation: (nextProps) ->
    nextProps._comp(nextProps._func(nextProps[animatedProp] + nextProps._step), nextProps._to)

  _setupAnimationProps: (nextProps) ->
    nextProps._to = nextProps[animatedProp]

    up = nextProps._to > @props[animatedProp]
    nextProps._comp = if up then Math.min else Math.max
    nextProps._func = if up then Math.ceil else Math.floor

    nextProps[animatedProp] = @props[animatedProp]
    nextProps._step = (nextProps._to - nextProps[animatedProp]) / 90
    nextProps

module.exports = AnimatedPropMixin

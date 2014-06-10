animationData = (current, to) ->
  up = to > current

  to: to
  comp: if up then Math.min else Math.max
  func: if up then Math.ceil else Math.floor
  current: current
  step: (to - current) / 90

AnimatedPropMixin = (animatedProp) ->
  animatedProp = animatedProp || 'value'

  shouldComponentUpdate: (nextProps) ->
    if nextProps.to == undefined
      @setProps @_setupAnimationData nextProps
      false
    else
      true

  componentWillUpdate: (nextProps) ->
    int = setInterval =>
      clearInterval int
      if nextProps[animatedProp] != nextProps.to
        nextProps.current = @_advanceAnimation nextProps
        @setProps nextProps
    , 10

  _advanceAnimation: (nextProps) ->
    nextProps.comp(nextProps.func(nextProps[animatedProp] + nextProps.step), nextProps.to)

  _setupAnimationData: (nextProps) ->
    animationData(@props[animatedProp], nextProps[animatedProp])


module.exports = AnimatedPropMixin

animationData = (current, to) ->
  up   = to > current
  comp = if up then Math.min else Math.max
  func = if up then Math.ceil else Math.floor
  step = (to - current) / 90

  (curr) ->
    comp(func(curr + step), to)

AnimatedPropMixin = (animatedProps = animatedProps || ['value']) ->
  type = Object::toString.call(animatedProps)
  animatedProps = [animatedProps] unless type is "[object Array]"

  shouldComponentUpdate: (nextProps) ->
    console.log "0"
    for animatedProp in animatedProps
      [current, to] = [@props[animatedProp], nextProps[animatedProp]]
      console.log current, to
      if current == to
        console.log "1"
        return false
      if typeof nextProps[animatedProp]?.advance != 'function'
        console.log "2"
        props = {}
        props[animatedProp] = animationData(current, to)
        @setProps(props)
        return false
    console.log "3"
    return true

  componentWillUpdate: (nextProps) ->
    for animatedProp in animatedProps
      do (animatedProp) =>
        int = setInterval =>
          clearInterval int
          next = nextProps[animatedProp].advance(nextProps[animatedProp])
          if nextProps[animatedProp] != next
            nextProps[aniamtedProp] = next
            @setProps nextProps
        , 10

  ##
  # Really only for testing
  ##
  _setupAnimationData: (current, to) ->
    animationData current, to

module.exports = AnimatedPropMixin

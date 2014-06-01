require.requireActual 'jasmine-expect'

jest.dontMock '../reacting.coffee'

describe 'Reacting.AnimatedValues', ->

  describe 'constructor', ->
    Reacting = {}

    beforeEach ->
      Reacting = require '../reacting.coffee'

    it 'is defined', ->
      expect(Reacting.AnimatedValues).toBeDefined()

    it 'returns an object', ->
      expect(Reacting.AnimatedValues()).toBeObject()

    it 'AnimatedValues is aliased as AnimatedValue', ->
      expect(Reacting.AnimatedValue).toBe Reacting.AnimatedValues

  describe 'animatedProps', ->
    Reacting = {}

    beforeEach ->
      Reacting = require '../reacting.coffee'

    it 'sets prop to 10 when passed a string', ->
      av = Reacting.AnimatedValues 'one'
      expect(av.animatedProps.one).toBe 10

    it 'sets prop to 10 when passed a one Array', ->
      av = Reacting.AnimatedValues ['one']
      expect(av.animatedProps.one).toBe 10

    it 'sets props to 10 when passed a two Array', ->
      av = Reacting.AnimatedValues ['one', 'two']
      expect(av.animatedProps.one).toBe 10
      expect(av.animatedProps.two).toBe 10

    it 'sets to an object when passed one', ->
      av = Reacting.AnimatedValues
        one: 100
        two: 50
      expect(av.animatedProps.one).toBe 100
      expect(av.animatedProps.two).toBe 50

    it 'accepts an object with a function as a value', ->
      av = Reacting.AnimatedValues
        one: ->
      expect(av.animatedProps.one).toBeFunction()

  describe 'componentWillReceiveProps', ->
    Reacting = {}
    nextProps = {}

    beforeEach ->
      Reacting = require '../reacting.coffee'
      nextProps =
        one: 50    # value
        three: 100 # value
        five: 150  # value

    it 'calls animate only for a key in animatedProp', ->
      av = Reacting.AnimatedValues
        one: 100 # delay
        two: 50  # delay
      av.animate = animate = jest.genMockFn()
      av.componentWillReceiveProps nextProps
      expect(animate).toBeCalledWith 'one', 50, 100
      expect(animate).not.toBeCalledWith 'five'

    it 'calls animate only for a key in animatedProp with func as delay', ->
      func = ->
      av = Reacting.AnimatedValues
        one: func # delay
        two: 50   # delay
      av.animate = animate = jest.genMockFn()
      av.componentWillReceiveProps nextProps
      expect(animate).toBeCalledWith 'one', 50, func

    it 'does not call animate for keys in animatedProp', ->
      av = Reacting.AnimatedValues
        one:   100  # delay
        three: 50 # delay
      av.animate = animate = jest.genMockFn()
      av.componentWillReceiveProps nextProps
      expect(animate.mock.calls[0]).toEqual ['one',   50,  100]
      expect(animate.mock.calls[1]).toEqual ['three', 100, 50]

    it 'does not call animate if no keys are in animatedProp', ->
      av = Reacting.AnimatedValues
        two: 50   # delay
        four: 100 # delay
      av.animate = animate = jest.genMockFn()
      av.componentWillReceiveProps nextProps
      expect(animate).not.toBeCalled()

  describe '_getCurrent', ->
    Reacting = {}

    beforeEach ->
      Reacting = require '../reacting.coffee'

    it 'returns the state value set at key', ->
      av = Reacting.AnimatedValues()
      av.state = {}
      av.state.one = 50
      expect(av._getCurrent 'one').toBe 50

    it 'returns 0 if the state at key is undefined', ->
      av = Reacting.AnimatedValues()
      av.state = {}
      av.state.one = undefined
      expect(av._getCurrent 'one').toBe 0

    it 'returns 0 if the state at key is null', ->
      av = Reacting.AnimatedValues()
      av.state = {}
      av.state.one = null
      expect(av._getCurrent 'one').toBe 0

    it 'returns 0 if the state at key is a string', ->
      av = Reacting.AnimatedValues()
      av.state = {}
      av.state.one = 'string'
      expect(av._getCurrent 'one').toBe 0

  describe 'animate', ->
    Reacting = {}

    beforeEach ->
      Reacting = require '../reacting.coffee'

    it 'calls setState directly if to is undefined', ->
      av = Reacting.AnimatedValues()
      av.setState = setState = jest.genMockFn()
      av.animate('one', undefined, 10)
      expect(setState).toBeCalledWith
        one: undefined

    it 'calls setState directly if to is NaN', ->
      av = Reacting.AnimatedValues()
      av.setState = setState = jest.genMockFn()
      av.animate('one', 'string', 10)
      expect(setState).toBeCalledWith
        one: 'string'

    it 'does not call setState if timer is set already', ->
      av = Reacting.AnimatedValues()
      av.state = {}
      av.state.timer = 'set'
      av.setState = setState = jest.genMockFn()
      av.animate('one', 500, 10)
      expect(setState).not.toBeCalled()

    it 'does not call setState if current is to already', ->
      av = Reacting.AnimatedValues()
      av.state = {}
      av.state.one = 100
      av.setState = setState = jest.genMockFn()
      av.animate('one', 100, 10)
      expect(setState).not.toBeCalled()

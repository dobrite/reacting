class Reacting
  @widgets = {}
  @components = {}
  @lastEvents = {}
  @Filters = {}
  @debugMode = false

#Reacting.Filters.prettyNumber = (num) ->
#  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") unless isNaN(num)
#
#Reacting.Filters.dashize = (str) ->
#  dashes_rx1 = /([A-Z]+)([A-Z][a-z])/g;
#  dashes_rx2 = /([a-z\d])([A-Z])/g;
#
#  str.replace(dashes_rx1, '$1_$2').replace(dashes_rx2, '$1_$2').replace(/_/g, '-').toLowerCase()
#
#Reacting.Filters.shortenedNumber = (num) ->
#  return num if isNaN(num)
#  if num >= 1000000000
#    (num / 1000000000).toFixed(1) + 'B'
#  else if num >= 1000000
#    (num / 1000000).toFixed(1) + 'M'
#  else if num >= 1000
#    (num / 1000).toFixed(1) + 'K'
#  else
#    num

Reacting.RecursiveValue = (animatedProps) ->
  shouldComponentUpdate: (nextProps) ->
    if @props.current == @props._to
      return false
    if nextProps._to == undefined
      [nextProps.current, nextProps._to] = [@props.current, nextProps.current]
      @setProps nextProps
      return false
    return true

  componentWillUpdate: (nextProps) ->
    int = setInterval =>
      clearInterval int
      props = {}
      props["current"] = @props.current + 1
      @setProps props
    , 10

Reacting.AnimatedValue = Reacting.AnimatedValues = (animatedProps) ->
  type = Object::toString.call(animatedProps)
  if type isnt "[object Object]"
    if type isnt "[object Array]"
      obj = {}
      obj[animatedProps] = 10
    else
      obj = {}
      for i of animatedProps
        obj[animatedProps[i]] = 10

  animatedProps: obj || animatedProps

  componentWillReceiveProps: (nextProps) ->
    keys = (k for k, v of @animatedProps)
    for key, value of nextProps when key in keys
      delay = @animatedProps[key]
      @animate key, value, delay

  _getCurrent: (key) ->
    current = @state[key]
    if (!isNaN(current) and current?) then current else 0

  _setTimer: (key, current, to, delay) ->
    delay = if Object::toString.call(delay) is "[object Function]" then delay(current, to) else delay
    step = Math.abs(current - to) / 90
    up = to > current
    setInterval =>
      current = if up then Math.ceil(current + step) else Math.floor(current - step)
      state = {}
      if (up and current > to) or (not up and current < to)
        current = to
        clearInterval @state.timer
        state.timer = null
      state[key] = current
      @setState state
    , delay

  _setInterval: () ->
    ''

  animate: (key, to, delay) ->
    if not to? or isNaN to
      state = {}
      state[key] = to
      @setState state
      return
    current = @_getCurrent key
    unless @state.timer? or current == to
      @setState timer: @_setTimer key, current, to, delay

#Reacting.params = Batman.URI.paramsFromQuery(window.location.search.slice(1));

# TODO can remove and rely on finding data-view=Type
# once fully converted
Reacting.register = (type, widget) ->
  Reacting.components[type] = widget

# TODO could refactor to start with "[data-view]" then iterate
# over those Reacting.components[node.dataset.view]
Reacting.initialize = ->
  types = Object.getOwnPropertyNames Reacting.components
  for type in types
    nodes = document.querySelectorAll "[data-view='#{type}']"
    for node in nodes
      constructor = Reacting.components[type]
      Reacting.widgets[node.dataset.id] = React.renderComponent (constructor {}), node

Reacting.run = ->
  source = new EventSource 'events'
  source.addEventListener 'open', (e) ->
    console.log "Connection opened", e

  source.addEventListener 'error', (e)->
    console.log "Connection error", e
    if e.currentTarget.readyState == EventSource.CLOSED
      console.log "Connection closed"
      setTimeout (->
        window.location.reload
      ), 5*60*1000

  source.addEventListener 'message', (e) ->
    data = JSON.parse e.data
    if Reacting.lastEvents[data.id]?.updatedAt != data.updatedAt #could move this into shouldComponentUpdate
      if Reacting.debugMode
        console.log "Received data for #{data.id}", data
      Reacting.widgets[data.id]?.setProps data

  source.addEventListener 'dashboards', (e) ->
    data = JSON.parse e.data
    if Reacting.debugMode
      console.log "Received data for dashboards", data
    if data.dashboard is '*' or window.location.pathname is "/#{data.dashboard}"
      Reacting.fire data.event, data

document.addEventListener 'DOMContentLoaded', ->
  Reacting.initialize()
  Reacting.run()

module.exports = Reacting

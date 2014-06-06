class Reacting
  @widgets = {}
  @components = {}
  @lastEvents = {}
  @Filters = {}
  @debugMode = false

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

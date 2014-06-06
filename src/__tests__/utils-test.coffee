jest.dontMock '../utils.coffee'

describe 'utils', ->
  op = require '../utils.coffee'
  describe 'gt', ->
    it 'works', ->
      expect(op.gt 2, 1).toEqual true
      expect(op.gt 1, 1).toEqual false
      expect(op.gt 1, 2).toEqual false

  describe 'lt', ->
    it 'works', ->
      expect(op.lt 1, 2).toEqual true
      expect(op.lt 1, 1).toEqual false
      expect(op.lt 2, 1).toEqual false

var React = require('react/addons');
var ReactStyle = require('react-style');

var DragDropMixin = require('react-dnd').DragDropMixin;
var ItemTypes = require('./ItemTypes');

var brick = ReactStyle({
  width: 50,
  height: 50,
  backgroundColor: 'red'
});

var Brick = React.createClass({
  mixins: [DragDropMixin],

  getDefaultProps: function() {
    return {
      brick: {
        text: '&nbsp;',
      },
      color: 'yellow'
    };
  },

  configureDragDrop: function(registerType) {
    registerType(ItemTypes.BRICK, {
      dragSource: {
        canDrag: function() {
          return !!this.props.brick;
        },
        beginDrag: function() {
          return {
            item: this.props.brick,
          };
        }
      },
      dropTarget: {
        acceptDrop: function(brick) {
          console.log(brick);
        }
      }
    });
  },

  render: function() {
    var dynamicStyles = ReactStyle({color: this.props.color});
        //styles={[brick, dynamicStyles]}>
    return (
      <div {...this.dropTargetFor(ItemTypes.BRICK)}>
          {this.props.brick &&
            <div {...this.dragSourceFor(ItemTypes.BRICK)}
              className='brick'
              children={this.props.brick.text}/>
          }
      </div>
    );
  }
});

var brick = {
  text: 'blah!',
};

ReactStyle.inject();

React.render(
  <Brick brick={brick} />,
  document.getElementById('b1')
);

React.render(
  <Brick />,
  document.getElementById('b2')
);

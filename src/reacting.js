var React = require('react/addons');
var ReactStyle = require('react-style');

import { DragDropMixin } from 'react-dnd';
import ItemTypes from './ItemTypes';

var brickStyles = ReactStyle({
  width: 50,
  height: 50,
  backgroundColor: 'red'
});

var Brick = React.createClass({
  mixins: [DragDropMixin],

  getDefaultProps() {
    return {
      brick: {
        text: '\u00a0',
      },
      color: 'yellow'
    };
  },

  configureDragDrop(registerType) {
    registerType(ItemTypes.BRICK, {
      dragSource: {
        canDrag() {
          return !!this.props.brick;
        },
        beginDrag() {
          return {
            item: this.props.brick,
          };
        }
      },
      dropTarget: {
        acceptDrop(brick) {
          console.log(brick);
        }
      }
    });
  },

  render() {
    var dynamicStyles = ReactStyle({color: this.props.color});
    return (
      <div {...this.dropTargetFor(ItemTypes.BRICK)}
        styles={[brickStyles, dynamicStyles]}>
          {this.props.brick &&
            <div {...this.dragSourceFor(ItemTypes.BRICK)}
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

if (typeof document !== 'undefined') {
  React.render(
    <Brick brick={brick} />,
    document.getElementById('b1')
  );

  React.render(
    <Brick />,
    document.getElementById('b2')
  );
}

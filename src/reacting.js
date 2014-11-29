var css = require('./stylesheets/reacting.scss');

var React = require('react/addons');

import { DragDropMixin } from 'react-dnd';
import ItemTypes from './ItemTypes';

var Brick = React.createClass({
  mixins: [DragDropMixin],

  getDefaultProps() => { brick: { text: '&nbsp;' } },

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

React.render(
  <Brick brick={brick} />,
  document.getElementById('b1')
);

React.render(
  <Brick />,
  document.getElementById('b2')
);

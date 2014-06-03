var ReactTools = require('react-tools');
var coffee = require('coffee-script');

module.exports = {
  process: function(src, path) {
    if (path.match(/\.coffee$/)) {
      src = coffee.compile(src, {'bare': true});
    }
    return ReactTools.transform(src);
  }
};

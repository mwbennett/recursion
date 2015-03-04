// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(element) {
  if (typeof element === 'function' || element === undefined){
    return;
  }
  if (element === null){
    return 'null';
  }
  if (typeof element === 'string'){
    return '"' + element + '"';
  } else if (typeof element !== 'object'){
    return element.toString();
  }
};

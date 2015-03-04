// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(input) {
  
  // stringify non-object arguments correctly 
  if (typeof input === 'function' || input === undefined){
    return undefined;
  }
  if (input === null){
    return 'null';
  }
  if (typeof input === 'string'){
    return '"' + input + '"';
  } else if (typeof input !== 'object'){
    return input.toString();
  }
  // recursively stringify arrays
  if (Array.isArray(input)){
    var stringyArray = '[';
    for (var i = 0; i < input.length; i++){
      var element = input[i];
      if (typeof element === 'number' || typeof element === 'boolean' || element === null){
        stringyArray = stringyArray + element;
      }else {
        stringyArray = stringyArray + stringifyJSON(element);
      }
      if (i < input.length - 1){
        stringyArray = stringyArray + ',';
      }
    }
    stringyArray = stringyArray + ']';
    return stringyArray;
  }
};

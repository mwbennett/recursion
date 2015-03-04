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
        stringyArray += element;
      } else {
        stringyArray += stringifyJSON(element);
      }
      if (i < input.length - 1){
        stringyArray += ',';
      }
    }
    stringyArray += ']';
    return stringyArray;
  }

  // recursively stringify objects 
  if (typeof input === 'object'){
    var stringyObject = '{';
    for (var key in input){
      if (input[key] === undefined || typeof input[key] === 'function'){
        continue;
      }
      if (typeof key === 'number' || typeof key === 'boolean' || key === null){
        stringyObject += key + ':';
      } else {
        stringyObject += stringifyJSON(key) + ':';
      }
      if (typeof input[key] === 'number' || typeof input[key] === 'boolean' || input[key] === null){
        stringyObject += input[key] + ',';
      } else {
        stringyObject += stringifyJSON(input[key]) + ',';
      }
    }
    if (stringyObject.length > 1){
      stringyObject = stringyObject.slice(0, stringyObject.length - 1);
    }
    stringyObject += '}';
    return stringyObject;
  }

};

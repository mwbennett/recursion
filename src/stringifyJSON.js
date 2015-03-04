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
  
  // helper function for determining which elements to augment in ojects and arrays 
  var untouched = function(item){
    var result = false;
    if (typeof item === 'number' || typeof item === 'boolean' || item === null) {
      result = true;
    } 
    return result;
  }

  // recursively stringify arrays
  if (Array.isArray(input)){
    var stringyArray = '[';
    for (var i = 0; i < input.length; i++){
      var element = input[i];
      if (untouched(element)){
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
      if (untouched(key)){
        stringyObject += key + ':';
      } else {
        stringyObject += stringifyJSON(key) + ':';
      }
      if (untouched(input[key])){
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

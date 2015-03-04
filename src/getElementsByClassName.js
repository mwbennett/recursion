// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  var $body = document.body;
  var result = [];
  
  var test = function(element){
    var nodeClasses = element.classList;
    if(nodeClasses && nodeClasses.contains(className)){
      result.push(element);
    }
  };

  var traverse = function(node, func){
    func(node);
    node = node.firstChild;
    while (node){
      traverse(node, func);
      node = node.nextSibling;
    }
  }

  traverse($body, test);
  return result;
};

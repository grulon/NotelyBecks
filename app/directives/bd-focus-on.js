angular.module('notely')
  .directive('bdFocus',function() {
    return {
      restrict: 'A',
      link: function(scope, elem, attr) {
        elem.ready(function(){
          elem[0].focus();
        });
      }
    };
  });

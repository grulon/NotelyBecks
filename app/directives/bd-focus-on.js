(function(){
  angular.module('notely')
    .directive(
      'bdFocusOn',
      function(){
        return {
            link: function(scope, elem, attr) {
          scope.$on(attr.bdFocusOn, function(e) {
            elem[0].focus();
          });
        }
      };
    });
})();

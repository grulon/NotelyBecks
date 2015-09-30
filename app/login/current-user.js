(function() {
  angular.module('notely.login')
    .service('CurrentUser', CurrentUser);

  CurrentUser['$inject'] = ['$window'];
  function CurrentUser($window) {
    var currentUser = JSON.parse($window.localStorage.getItem('currentUser'));


    this.set = function(token) {
      currentUser = token;
      $window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    this.get = function() {
      return currentUser || {};
    }

    this.clear = function() {
      currentUser = undefined;
      $window.localStorage.removeItem('currentUser');
    }
  }
})();

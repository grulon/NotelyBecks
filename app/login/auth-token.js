(function() {
  angular.module('notely.login')
    .service('AuthToken', AuthToken);

  function AuthToken() {
    var authToken;

    this.set = function(token) {
      authToken = token;
    }

    this.get = function() {
      return authToken;
    }
  }
})();

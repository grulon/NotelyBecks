(function() {
  angular.module('notely.login')
    .service('login', loginService);

  loginService['$inject'] = ['$http', 'constants', 'AuthToken'];
  function loginService($http, constants, AuthToken) {
    this.login = function(user) {
      return $http.post(
        constants.apiBasePath + 'session', {
          user: {
            username: user.username,
            password: user.password
          }
        }
      )
      .success(function(response) {
        AuthToken.set(response.auth_token);
      });
    }

    this.logout = function() {
      AuthToken.clear();
    }
  }
})();

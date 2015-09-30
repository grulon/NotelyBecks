(function() {
  angular.module('notely.login')
    .factory('AuthInterceptor', AuthInterceptor);

  function AuthInterceptor(AuthToken) {
    return {
      request: function(config) {
        var token = AuthToken.get();
        if (token) {
          config.headers['Authorization'] = token;
        }
        return config;
      }
    }
  }

  angular.module('notely')
    .config(function($httpProvider) {
      return $httpProvider.interceptors.push('AuthInterceptor');
    });
})();

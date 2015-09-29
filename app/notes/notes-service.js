(function() {
  angular.module('notely.notes.service', [])
    .service('notes', notesService);

  notesService['$inject'] = ['$http'];
  function notesService($http) {
    var notes = [];
    var nevernoteBasePath = 'https://nevernote-1150.herokuapp.com/api/v1/';
    var user = {
      apiKey: '$2a$10$3UAODMts8D3bK8uqwe2mF.F39vZD3/CypYXLUk1yvhpedfbMiBaFW'
    }

    this.fetchNotes = function(callback) {
      $http.get(nevernoteBasePath + 'notes?api_key=' + user.apiKey)
        .success(function(notesData) {
          notes = notesData;

          if (callback) {
            callback(notes);
          }
        });
    };
  }
})();

(function() {
  angular.module('notely.notes', [
    'ui.router'
  ])
  .controller('NotesController', NotesController)
  .controller('NotesFormController', NotesFormController)
  .config(notesConfig);

  notesConfig['$inject'] = ['$stateProvider'];

  function notesConfig($stateProvider) {
    $stateProvider

      .state('notes', {
        url: '/notes',
        abstract: true,
        templateUrl: '/notes/notes.html',
        controller: NotesController
      })

      .state('notes.form', {     //child state
        url: '/{noteId}',
        templateUrl: '/notes/notes-form.html',
        controller: NotesFormController
      });
  }

  NotesController['$inject'] = ['$scope', '$state', 'notes'];

  function NotesController($scope, $state, notes) {
    notes.fetchNotes(function(notes) {
      $scope.notes = notes;
    });
    //$state.go('notes.form');  Don't need this to redirect since set abstract = true and added / to app.js urlRouterProvider
  }

    NotesFormController['$inject'] = ['$scope', '$state', 'notes'];

    function NotesFormController($scope, $state, notes) {
      $scope.note = angular.copy(notes.findById($state.params.noteId));
      $scope.buttonText = function() {
        if ($scope.note.id) {
          return 'Save';
        }
        return 'Create';
      }

      $scope.save = function() {
      if ($scope.note.id) {
        notes.update($scope.note)
          .success(function(data){
            $scope.note = data.note;
          });
      }
      else {
        notes.create($scope.note);
      }
    }
  }
})();

angular.module('notely')
.directive('bdNotesList', function(notes) {
  return {
    restrict: 'EA',
    replace: true,
    scope: {},
    templateUrl: '/notes/notes-list.html',
    controller: NotesListController,
    controllerAs: 'ctrl'
  };
  function NotesListController() {
    this.notes = notes.all(); 
  }
});

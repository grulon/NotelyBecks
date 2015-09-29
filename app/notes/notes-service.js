(function() {
  angular.module('notely.notes.service', [])
    .service('notes', notesService);

  notesService['$inject'] = ['$http', '$filter', '$state'];
  function notesService($http, $filter, $state) {
    var notes = [];
    var nevernoteBasePath = 'https://nevernote-1150.herokuapp.com/api/v1/';
    var user = {
      apiKey: '$2a$10$M9YKAJ/y08ztCrFV89dR2uwesxwl6RpFQ9V2zJkOJfCcJDHmCaz7O'
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

    this.replaceNote = function(note) {
      for (var i = 0; i < notes.length; i++) {
        if(notes[i].id === note.id) {
          notes.splice(i,1);
          notes.unshift(note);
          break;
        }
      }
    };

//     this.create = function(note){
//       if(note.id) {
//         $http.put(nevernoteBasePath + 'notes/' + note.id, {
//           api_key: user.apiKey,
//           note: note
//         });
//
//       }
//       else {
//       $http.post(nevernoteBasePath + 'notes', {
//         api_key: user.apiKey,
//         note: note
//
//       })
//         .success(function(notesData) {
//           notes.unshift(notesData.note);
//         });
//     }
// }
  this.create = function(note) {
       $http.post(nevernoteBasePath + 'notes', {
         api_key: user.apiKey,
         note: {
           title: note.title,
           body_html: note.body_html
         }
       })
         .success(function(noteData) {
           notes.unshift(noteData.note);
           $state.go('notes.form',{ noteId: noteData.note.id });
         });
     }

     this.update = function(note) {
      var self = this;
       return $http.put(nevernoteBasePath + 'notes/' + note.id, {
         api_key: user.apiKey,
         note: {
           title: note.title,
           body_html: note.body_html
         }
       }).success(function(noteData){

         self.replaceNote(noteData.note);
       });
     }

  this.findById = function(noteId) {
      return note = ($filter('filter')(notes,{ id: parseInt(noteId) }, true)[0] || {});

  }
}
})();

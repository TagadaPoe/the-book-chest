angular.module('BookBookApp', ['schemaForm'])
.controller('BookBookController', function ($scope) {
	
	$scope.showForm = false;
	
  $scope.schema = {
    type: "object",
    properties: {
      author: {	type: "string", title: "Author" },
      title: { type: "string", title: "Title" },
      ISBN: { type: "string", title: "ISBN" }
    }
  };	
	
	
  $scope.form = [
    "*",
    {
      type: "submit",
      title: "Save"
    }
  ];
	
  $scope.newBook = {};

	
	
  $scope.books = [
    {'author': 'Margaret Atwood',
     'title': "The handmaid's tale"},
    {'author': 'Margaret Atwood',
     'title': 'The blind assassin'},
    {'author': 'Margaret Atwood',
     'title': 'The robber bride'}
  ];
  
  
  
});

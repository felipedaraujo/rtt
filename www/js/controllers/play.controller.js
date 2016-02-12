angular.module('starter.controllers')
  .controller('PlayCtrl', function($scope, $timeout, $location) {

    $scope.instructions = [];
    $scope.figures = [];

    $scope.instruction = null;
    var instructionIndex = -1;

    $scope.corrects = 0;
    $scope.wrongs = 0;

    $scope.init = function() {
      loadInstructions();
      loadFigures();

      nextInstruction();
    }

    $scope.setIcon = function(figure){
      return "img/" + figure.shape + ".svg";
    };

    $scope.answer = function(figure) {
      if (figure.color == $scope.instruction.color &&
          figure.shape == $scope.instruction.shape) {
        $scope.corrects++;
      } else {
        $scope.wrongs++;
      };

      nextInstruction();
    };

    loadInstructions = function() {
      $scope.instructions = [
        { message: "touch the blue circle", color: 'blue', shape: 'circle' },
        { message: "touch the yellow square", color: 'yellow', shape: 'square' },
        { message: "touch the white circle", color: 'white', shape: 'circle' },
        { message: "touch the red circle", color: 'red', shape: 'circle' },
        { message: "touch the white square", color: 'white', shape: 'square' }
      ];
    };

    loadFigures = function() {
      colors = ['yellow', 'blue', 'red', 'green', 'white'];
      shapes = ['circle', 'square'];

      shapes.forEach(function(shape) {
        colors.forEach(function(color) {
          $scope.figures.push({shape: shape, color: color, });
        })
      });
    };

    nextInstruction = function() {
      instructionIndex++;

      if(instructionIndex <= $scope.instructions.length - 1) {
        $scope.instruction = $scope.instructions[instructionIndex];
      } else {
        $timeout(function(){
          alert("The End!");
          $location.path("#/home")
        }, 1000)
      }
    };
  });
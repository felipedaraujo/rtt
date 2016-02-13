angular.module('starter.controllers')
  .controller('RTTCtrl', function($scope, $timeout, $location, $interval, Modal) {

    $scope.instructions = [];
    $scope.figures = [];

    $scope.instruction = null;
    var instructionIndex = -1;

    var corrects = 0;

    $scope.countdown = 'Let\'s start!';
    var countdown;

    $scope.init = function() {
      Modal.open($scope, 'start-test');

      startCountdown();

      loadInstructions();
      loadFigures();

      nextInstruction();
    }

    $scope.setIcon = function(figure){
      return "img/" + figure.shape + ".svg";
    };

    $scope.answer = function(figure) {
      if (figure.size == $scope.instruction.size &&
          figure.color == $scope.instruction.color &&
          figure.shape == $scope.instruction.shape) {
        corrects++;
      }

      nextInstruction();
    };

    $scope.goHome = function() {
      Modal.close();
      $location.path('#/home');
    }

    $scope.percentage = function(){
      return (corrects / $scope.instructions.length) * 100;
    }

    loadInstructions = function() {
      $scope.instructions = [
        { message: "Touch the small blue circle", size: 'small', color: 'blue', shape: 'circle' },
        { message: "Touch the small yellow square", size: 'small', color: 'yellow', shape: 'square' },
        { message: "Touch the large white circle", size: 'large', color: 'white', shape: 'circle' },
        { message: "Touch the large red circle", size: 'large', color: 'red', shape: 'circle' },
        { message: "Touch the small white square", size: 'small', color: 'white', shape: 'square' }
      ];
    };

    loadFigures = function() {
      var sizes = ['small', 'large']
      var shapes = ['circle', 'square'];
      var colors = ['yellow', 'blue', 'red', 'green', 'white'];

      sizes.forEach(function(size) {
        shapes.forEach(function(shape) {
          colors.forEach(function(color) {
            $scope.figures.push({shape: shape, size: size, color: color, });
          });
          colors = reorderArray(1, colors);
        });
      });
    };

    nextInstruction = function() {
      instructionIndex++;

      if(instructionIndex <= $scope.instructions.length - 1) {
        $scope.instruction = $scope.instructions[instructionIndex];
      } else {
        $timeout(function(){
          Modal.open($scope, 'end-test');
        }, 1000)
      }
    };

    startCountdown = function(){
      countdown = $interval(function(){
        if (typeof $scope.countdown == 'string') {
          $scope.countdown = 3;
        } else {
          if($scope.countdown > 1) {
            $scope.countdown--;
          } else {
            destroyCountdown();
            Modal.close();
          }
        }
      }, 1500);
    };

    destroyCountdown = function() {
      $interval.cancel(countdown);
    };

    reorderArray = function(places, originalArray) {
      var arrayReordered = [];
      var index = places;

      originalArray.forEach(function(item) {
        if (index >= originalArray.length) {
          index = 0;
        };
        arrayReordered[index] = item;
        index++
      });
      return arrayReordered;
    }
  });
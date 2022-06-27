let app = angular.module("myApp", []);
app.constant("CONVERSION_KEY", 3.24);
app.controller("MyTrainingController", function ($scope, $interval) {
  $scope.myModelVariable = 10;

  const inter = $interval(function () {
    $scope.myModelVariable = Math.random();
  }, 1000);

  $scope.stop = () => $interval.cancel(inter);
  $scope.continue = () =>
    $interval(function () {
      $scope.myModelVariable = Math.random();
    }, 1000);
});
app.directive("minVal", function () {
  return {
    require: "ngModel",
    link: function (scope, elm, attrs, ctrl) {
      ctrl.$validators.minVal = function (modelValue, viewValue) {
        if (
          !viewValue ||
          viewValue === "-" ||
          parseFloat(viewValue) >= parseFloat(attrs.minVal)
        )
          return true;
        return false;
      };
    },
  };
});
app.directive("maxVal", function () {
  return {
    require: "ngModel",
    link: function (scope, elm, attrs, ctrl) {
      ctrl.$validators.maxVal = function (modelValue, viewValue) {
        if (
          !viewValue ||
          viewValue === "-" ||
          parseFloat(viewValue) <= parseFloat(attrs.maxVal)
        ) {
          elm["0"].style.color = "black";
          return true;
        }
        elm["0"].style.color = "red";
        return false;
      };
    },
  };
});
app.directive("allowedChars", function () {
  return {
    require: "ngModel",
    link: function (scope, elm, attrs, ctrl) {
      ctrl.$validators.allowedChars = function (modelValue, viewValue) {
        if (
          !viewValue ||
          viewValue === "-" ||
          new RegExp(attrs.allowedChars).test(viewValue)
        ) {
          elm["0"].style.color = "black";
          return true;
        }
        elm["0"].style.color = "red";
        return false;
      };
    },
  };
});
app.directive("displayFilter", function (CONVERSION_KEY) {
  return {
    require: "ngModel",
    link: function (scope, elm, attrs, ctrl) {
      function parseViewValue(modelValue) {
        return Math.round((modelValue / CONVERSION_KEY) * 100) / 100;
      }
      ctrl.$parsers.push(parseViewValue);
    },
  };
});
app.directive("toFixed", function () {
  return {
    require: "ngModel",
    link: function (scope, elm, attrs, ctrl) {
      ctrl.$validators.toFixed = function (modelValue, viewValue) {
        if (
          !viewValue ||
          viewValue === "-" ||
          !viewValue.includes(".") ||
          viewValue.split(".")[1].length <= attrs.toFixed
        )
          return true;
        return false;
      };
    },
  };
});

let app = angular.module("myApp", []);
app.constant("CONVERSION_KEY", 0.3048);
app.controller("MyTrainingController", function ($scope) {
  $scope.myModelVariable = 10;
});
app.directive("minVal", function () {
  return {
    require: "ngModel",
    link: function (scope, elm, attrs, ctrl) {
      ctrl.$validators.minVal = function (modelValue, viewValue) {
        return (
          !viewValue ||
          viewValue === "-" ||
          parseFloat(viewValue) >= parseFloat(attrs.minVal)
        );
      };
    },
  };
});
app.directive("maxVal", function () {
  return {
    require: "ngModel",
    link: function (scope, elm, attrs, ctrl) {
      ctrl.$validators.maxVal = function (modelValue, viewValue) {
        return (
          !viewValue ||
          viewValue === "-" ||
          parseFloat(viewValue) <= parseFloat(attrs.maxVal)
        );
      };
    },
  };
});
app.directive("allowedChars", function () {
  return {
    require: "ngModel",
    link: function (scope, elm, attrs, ctrl) {
      ctrl.$validators.allowedChars = function (modelValue, viewValue) {
        return (
          !viewValue ||
          viewValue === "-" ||
          new RegExp(attrs.allowedChars).test(viewValue)
        );
      };
    },
  };
});
app.directive("displayFilter", function ($parse, CONVERSION_KEY) {
  return {
    require: "ngModel",
    link: function (scope, elm, attrs, ctrl) {
      function parseViewValue(modelValue) {
        return Math.round(modelValue * CONVERSION_KEY * 100) / 100;
      }
      ctrl.$parsers.push(parseViewValue);
    },
  };
});
app.directive("modelFilter", function (CONVERSION_KEY) {
  return {
    require: "ngModel",
    link: function (scope, elm, attrs, ctrl) {
      function formatModelValue(viewValue) {
        return viewValue;
      }
      ctrl.$formatters.push(formatModelValue);
    },
  };
});
app.directive("toFixed", function () {
  return {
    require: "ngModel",
    link: function (scope, elm, attrs, ctrl) {
      ctrl.$validators.toFixed = function (modelValue, viewValue) {
        return (
          !viewValue ||
          viewValue === "-" ||
          !viewValue.includes(".") ||
          viewValue.split(".")[1].length <= attrs.toFixed
        );
      };
    },
  };
});

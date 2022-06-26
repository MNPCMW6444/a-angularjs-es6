(function (angular) {
  "use strict";
  angular
    .module("myApp", [])
    .controller("MyTrainingController", function ($scope) {
      $scope.myModalVariable = 10;
    })
    .filter("convertToMeters", function () {
      var conversionKey = 0.3048;
      return function (myModalVariable) {
        return myModalVariable * conversionKey;
      };
    })
    .directive("integer", function () {
      return {
        require: "ngModel",
        link: function (scope, elm, attrs, ctrl) {
          ctrl.$validators.integer = function (modelValue, viewValue) {
            if (ctrl.$isEmpty(modelValue)) {
              return true;
            }
            if (
              !viewValue ||
              viewValue === "-" ||
              (new RegExp(attrs.allowedChars).test(viewValue) &&
                parseFloat(viewValue) >= parseFloat(attrs.minVal) &&
                parseFloat(viewValue) <= parseFloat(attrs.maxVal) &&
                (!viewValue.includes(".") ||
                  viewValue.split(".")[1].length <= attrs.toFixed))
            ) {
              return true;
            }
            return false;
          };
        },
      };
    });
})(window.angular);

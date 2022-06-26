(function (angular) {
  "use strict";
  var app = angular.module("form-example1", []);

  app.directive("integer", function () {
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

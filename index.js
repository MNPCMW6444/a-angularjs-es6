let app = angular.module("myApp", []);
app.constant("INIT_CONVERSION_KEY", 0.304);
app.controller("MyTrainingController", function ($scope, $interval) {
  $scope.myModelVariable = 10;
  /* $scope.promise = $interval(function () {
    $scope.myModelVariable = Math.random();
  }, 1000); */
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
app.directive("displayFilter", function () {
  return {
    require: "ngModel",
    link: function (scope, elm, attrs, ctrl) {
      debugger;
      ctrl.$$scope.myForm.$$controls[0].$options.$$options.updateOn = "default";
      ctrl.$$scope.myForm.$$controls[1].$options.$$options.updateOn = "default";
      if (scope.isConversionToMeters)
        ctrl.$formatters.push(function (value) {
          return (
            Math.round((parseFloat(value) / scope.conversionKey) * 100) / 100
          );
        });
      else
        ctrl.$formatters.push(function (value) {
          return (
            Math.round(parseFloat(value) * scope.conversionKey * 100) / 100
          );
        });
    },
  };
});
app.directive("modelFilter", function () {
  return {
    require: "ngModel",
    link: function (scope, elm, attrs, ctrl) {
      if (scope.isConversionToMeters)
        ctrl.$parsers.push(function (value) {
          return (
            Math.round(parseFloat(value) * scope.conversionKey * 100) / 100
          );
        });
      else
        ctrl.$parsers.push(function (value) {
          return (
            Math.round((parseFloat(value) / scope.conversionKey) * 100) / 100
          );
        });
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
app.directive("switchConversion", function (INIT_CONVERSION_KEY) {
  return {
    require: "ngModel",
    restrict: "A",
    link: function (scope, ele, attr, ctrl) {
      const event = "click";
      scope.isConversionToMeters =
        ctrl.$$attr.displayFilter === "convertToMeters";
      scope.conversionKey = scope.isConversionToMeters
        ? 1 / INIT_CONVERSION_KEY
        : INIT_CONVERSION_KEY;
      scope.conLabel1 = scope.isConversionToMeters ? "feets" : "meters";
      scope.conLabel2 = scope.isConversionToMeters ? "meters" : "feets";
      ele.on(event, function () {
        scope.isConversionToMeters = !scope.isConversionToMeters;
        scope.conversionKey = scope.isConversionToMeters
          ? 1 / INIT_CONVERSION_KEY
          : INIT_CONVERSION_KEY;
        scope.conLabel1 = scope.isConversionToMeters ? "feets" : "meters";
        scope.conLabel2 = scope.isConversionToMeters ? "meters" : "feets";
      });
    },
  };
});
/* app.directive("handleFocusAndBlur", function ($interval) {
  return {
    link: function (scope, element, attrs) {
      element.bind("focus", function () {
        $interval.cancel(scope.promise);
      });
      element.bind("blur", function () {
        scope.promise = $interval(function () {
          scope.myModelVariable = Math.random();
        }, 1000);
      });
    },
  };
});
 */

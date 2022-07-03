let app = angular.module("myApp", []);
app.constant("INIT_CONVERSION_KEY", 3.2894);
app.controller("MyTrainingController", function ($scope, $interval) {
  $scope.myModelVariable = 10;
  /*  $scope.promise = $interval(function () {
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
app.directive("displayFilter", function (INIT_CONVERSION_KEY) {
  return {
    require: "ngModel",
    link: function (scope, elm, attrs, ctrl) {
      if (attrs.displayFilter === "convertToMeters") {
        scope.conLabel2 = "Meters";
        ctrl.$formatters.push((value) => {
          return Math.round(value * INIT_CONVERSION_KEY * 100) / 100;
        });
      }
      if (attrs.displayFilter === "convertToFeets") {
        scope.conLabel2 = "Feets";
        ctrl.$formatters.push((value) => {
          return Math.round((value / INIT_CONVERSION_KEY) * 100) / 100;
        });
      }
    },
  };
});
app.directive("modelFilter", function (INIT_CONVERSION_KEY) {
  return {
    require: "ngModel",
    link: function (scope, elm, attrs, ctrl) {
      if (attrs.modelFilter === "convertToFeets") {
        scope.conLabel1 = "Feets";
        ctrl.$parsers.push((value) => {
          return Math.round((value / INIT_CONVERSION_KEY) * 100) / 100;
        });
        scope.myModelVariable =
          Math.round((scope.myModelVariable / INIT_CONVERSION_KEY) * 100) / 100;
      }
      if (attrs.modelFilter === "convertToMeters") {
        scope.conLabel1 = "Meters";
        ctrl.$parsers.push((value) => {
          return Math.round(value * INIT_CONVERSION_KEY * 100) / 100;
        });
        scope.myModelVariable =
          Math.round(scope.myModelVariable * INIT_CONVERSION_KEY * 100) / 100;
      }
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
/* app.directive("switchConversion", function (INIT_CONVERSION_KEY) {
  return {
    require: "ngModel",
    restrict: "A",
    link: function (scope, ele, attr, ctrl) {
      scope.conversionKey = scope.isConversionToMeters
        ? INIT_CONVERSION_KEY
        : 1 / INIT_CONVERSION_KEY;
      const event = "click";
      ele.on(event, function () {
        scope.isConversionToMeters = !scope.isConversionToMeters;
        scope.conversionKey = scope.isConversionToMeters
          ? INIT_CONVERSION_KEY
          : 1 / INIT_CONVERSION_KEY;
      });
    },
  };
}); */
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

let app = angular.module("myApp", []);
app.constant("INIT_CONVERSION_KEY", 0.304);
app.controller("MyTrainingController", function ($scope, $interval) {
  $scope.myModelVariable = 10;
  $scope.promise = $interval(function () {
    $scope.myModelVariable = Math.random();
  }, 1000);
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
      scope.isConversionToMeters = attrs.displayFilter === "convertToMeters";
      if (scope.isConversionToMeters)
        scope.$watch("myModelVariable", function (newValue, oldValue) {
          scope.myModelVariable = Math.round(scope.myModelVariable * 100) / 100;
          if (!scope.conversionKey) scope.conversionKey = INIT_CONVERSION_KEY;
          scope.conLabel1 = scope.isConversionToMeters ? "Meters" : "Feets";
          scope.conLabel2 = scope.isConversionToMeters ? "Feets" : "Meters";
          if (scope.dontConvertToM) scope.dontConvertToM = false;
          else
            scope.myViewVariable =
              Math.round(scope.myModelVariable * scope.conversionKey * 100) /
              100;
        });
      else
        scope.$watch("myModelVariable", function (newValue, oldValue) {
          scope.myModelVariable = Math.round(scope.myModelVariable * 100) / 100;
          if (!scope.conversionKey)
            scope.conversionKey = 1 / INIT_CONVERSION_KEY;
          scope.conLabel1 = scope.isConversionToMeters ? "Feets" : "Meters";
          scope.conLabel2 = scope.isConversionToMeters ? "Meters" : "Feets";
          if (scope.dontConvertToF) scope.dontConvertToF = false;
          else
            scope.myViewVariable =
              Math.round(scope.myModelVariable * scope.conversionKey * 100) /
              100;
        });
      /*   function parseViewValue(modelValue) {
        conKey = scope.conversionKey || INIT_CONVERSION_KEY;
        scope.myViewVariable =
          Math.round(parseFloat(modelValue) * conKey * 100) / 100;
        return scope.myViewVariable;
      }
      ctrl.$parsers.push(parseViewValue); */
    },
  };
});
/* app.directive("modelFilter", function () {
  return {
    require: "ngModel",
    link: function (scope, elm, attrs, ctrl) {
      function formatModelValue(viewValue) {
        return viewValue;
      }
      ctrl.$formatters.push(formatModelValue);
    },
  };
}); */
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
app.directive("switchConversion", function () {
  return {
    restrict: "A",
    link: function (scope, ele, attr) {
      const event = "click";
      ele.on(event, function () {
        scope.isConversionToMeters = !scope.isConversionToMeters;
        const modelVal = scope.myModelVariable;
        scope.myModelVariable = scope.myViewVariable;
        scope.myViewVariable = modelVal;
        scope.dontConvertToM = true;
        scope.dontConvertToF = true;
      });
    },
  };
});
app.directive("handleFocusAndBlur", function ($interval) {
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

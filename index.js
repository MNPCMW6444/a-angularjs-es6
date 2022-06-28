let app = angular.module("myApp", []);
app.constant("INIT_CONVERSION_KEY", 0.304);
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
app.directive("displayFilter", function (INIT_CONVERSION_KEY) {
  return {
    require: "ngModel",
    link: function (scope, elm, attrs, ctrl) {
      function parseViewValue(modelValue) {
        conKey = scope.conversionKey || INIT_CONVERSION_KEY;
        scope.myViewVariable =
          Math.round(parseFloat(modelValue) * conKey * 100) / 100;
        return scope.myViewVariable;
      }
      ctrl.$parsers.push(parseViewValue);
    },
  };
});
app.directive("modelFilter", function () {
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
app.directive("switchConversion", function (INIT_CONVERSION_KEY) {
  return {
    restrict: "A",
    link: function (scope, ele, attr) {
      const event = "click";
      ele.on(event, function () {
        if (scope.conversionKey) {
          scope.conversionKey = 1 / scope.conversionKey;
        } else scope.conversionKey = INIT_CONVERSION_KEY;
        scope.conLabel1 =
          scope.conversionKey !== INIT_CONVERSION_KEY ? "Feets" : "Meters";
        scope.conLabel2 =
          scope.conversionKey === INIT_CONVERSION_KEY ? "Feets" : "Meters";
        const modelVal = scope.myModelVariable;
        scope.myModelVariable = scope.myViewVariable;
        scope.myViewVariable = modelVal;
      });
    },
  };
});

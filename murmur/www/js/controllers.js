angular.module('app.controllers', [])

  .controller('getStartedCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state) {
      $scope.enter = function () {
        $state.go('login');
      }

    }])

  .controller('page2Ctrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state) {
      $scope.createAudioMessage = function () {
        $state.go('createAudioMessage');
      }
      $scope.open = function () {
        $state.go('open');
      }
    }])

  .controller('loginCtrl', ['$scope', '$stateParams', '$state', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state, $http) {
      $scope.signup = function () {
        $state.go('signup');
      }
      $scope.page2 = function () {
        var email = this.formdata.log_email;
        var password = this.formdata.password;
        console.log(email + " " + password);
        $http.post('http://localhost:3000/login', {
          email: this.formdata.log_email,
          password: this.formdata.log_pass
        })
        $state.go('page2');
      }
    }
  ])

  .controller('signupCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state) {
      $scope.confirmation = function () {
        $state.go('confirmation');
      }

    }])

  .controller('confirmationCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state) {
      $scope.page2 = function () {
        $state.go('page2');
      }

    }])

  .controller('yourInformationCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state) {


    }])

  .controller('settingsCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state) {


    }])

  .controller('createAudioMessageCtrl', ['$scope', '$stateParams', '$state', '$cordovaMedia', '$cordovaFile', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state, $cordovaMedia, $cordovaFile) {

      var fileName = 'test.mp3';


      var media = $cordovaMedia.newMedia(cordova.file.externalCacheDirectory + fileName);
      $scope.record = function () {
        $cordovaFile.checkFile(cordova.file.externalCacheDirectory, fileName)
          .then(function (success) {
            console.log('SSS' + success);
            $cordovaFile.removeFile(cordova.file.externalCacheDirectory, fileName)
              .then(function (success) {
                console.log('SSS');
                media = $cordovaMedia.newMedia(cordova.file.externalCacheDirectory + fileName);
                console.log("Removed file. Record starting ...");
                media.startRecord();
              }, function (error) {
                console.log('opps');
              })
          }, function (error) {
            console.log('EEE' + error);
            console.log("record starting ...");
            media.startRecord();
          });
      };
      $scope.stop_record = function () {
        console.log("record stopping ...");
        media.stopRecord();

      };

      $scope.play = function () {
        console.log("playing");
        media.play();
      };



    }])

  .controller('openCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state) {


    }])

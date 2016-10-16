angular.module('app.controllers', [])

    .controller('getStartedCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $state) {
            $scope.enter = function () {
                $state.go('login');
            }

        }])

    .controller('page2Ctrl', ['$scope', '$stateParams', '$state', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state, $http) {
      $scope.createAudioMessage = function () {
        $state.go('createAudioMessage');
      };
      $scope.open = function () {
           console.log($state.get('login').params.username);
           $http.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBZdcOGYsmaOhA4YhvhLqbraui0FH_1rD4')
             .then(res => $http.post('http://dmartelly.com:3000/message',{
               long: res.data.location.lng,
               lat: res.data.location.lat,
               userid: $state.get('login').params.username
           }));
     //    $state.go('open');
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
        $state.current.params.username=email;
        console.log($state.current.params.username)
        $http.post('http://dmartelly.com:3000/login', {
          email: this.formdata.log_email,
          password: this.formdata.password
     }).then(res => res.data.success ? $state.go('page2',email) : console.log(res.data.success))
     //    $state.go('page2',{username:email});
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
            var startTime, endTime;

            var media = $cordovaMedia.newMedia(cordova.file.externalCacheDirectory + fileName);
            $scope.record = function () {
                startTime = new Date().getTime();
                $cordovaFile.checkFile(cordova.file.externalCacheDirectory, fileName)
                    .then(function (success) {
                        console.log('Removing File ' + fileName);
                        $cordovaFile.removeFile(cordova.file.externalCacheDirectory, fileName)
                            .then(function (success) {
                                console.log(fileName + ' has been removed');
                                media = $cordovaMedia.newMedia(cordova.file.externalCacheDirectory + fileName);
                                console.log("Record starting ...");
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
                endTime = new Date().getTime();
                if (endTime - startTime < 1000) {
                    setTimeout(function () {
                        console.log('Too damn fast');
                    }, 1000);
                    media.stopRecord();
                } else if (endTime - startTime > 10000) {
                    console.log('Too damn long')
                } else {
                    console.log("record stopping ...");
                    media.stopRecord();
                }
            };

            $scope.play = function () {
                $cordovaFile.checkFile(cordova.file.externalCacheDirectory, fileName)
                    .then(function (success) {
                        console.log("playing file");
                        media.play();
                    }, function (error) {
                        console.log('File doesn\'t exist yet');
                    })
            };

            $scope.stop = function () {
                console.log("stopping file");
                media.stop();
            };

        }])

    .controller('openCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $state) {


        }])

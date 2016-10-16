angular.module('app.controllers', [])

    .controller('getStartedCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $state) {
            $scope.enter = function () {
                $state.go('login');
            }

        }])

    .controller('page2Ctrl', ['$scope', '$stateParams', '$state', '$http', '$cordovaFile',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $state, $http, $cordovaFile) {
            $scope.createAudioMessage = function () {
                $state.go('createAudioMessage');
            };
            $scope.open = function () {
                 console.log($state.get('login').params.username);
                $http.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBZdcOGYsmaOhA4YhvhLqbraui0FH_1rD4')
                    .then(function (res) {
                         var long = res.data.location.lng;
                       var lat = res.data.location.lat;
                         document.getElementById('map').innerHTML =
                         "<iframe width='300' height='400' src='https://www.google.com/maps/embed/v1/streetview?key=AIzaSyDp-CLdtzjT40ZtInBzhfg2Lrp3wgn0DsI&location="+lat+","+long+"' />"
                    //     $cordovaFile.readAsBinaryString(cordova.file.externalCacheDirectory, 'test.mp3')
                                $http.post('http://dmartelly.com:3000/message/n',{
                                     long:long,
                                     lat:lat
                                }).then(function(res){
                                     console.log(res);
                                     var snd = new Audio("data:audio/mp3;base64," + res.data);
                                     snd.play();
                                     document.getElementById('map').innerHTML =
                                     "<audio controls src='data:audio/ogg;base64,"+res.data+"' />"
                                });
                    });
            }
        }])

    .controller('loginCtrl', ['$scope', '$stateParams', '$state', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $state, $http) {
            $scope.signup = function () {
                $state.go('signup');
            };
            $scope.page2 = function () {
                var email = this.formdata.log_email;
                var password = this.formdata.password;
                console.log(email + " " + password);
                $state.current.params.username = email;
                $http.post('http://dmartelly.com:3000/login', {
                    email: this.formdata.log_email,
                    password: this.formdata.password
               }).then(res => res.data.success ? $state.go('page2') : console.log(res));

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

    .controller('createAudioMessageCtrl', ['$scope', '$stateParams', '$state', '$cordovaMedia', '$cordovaFile','$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $state, $cordovaMedia, $cordovaFile,$http) {

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
                    console.log('Too damn long');
                } else {
                    console.log("record stopping ...");
                    media.stopRecord();
                    console.log($state.get('login').params.username);
                   $http.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBZdcOGYsmaOhA4YhvhLqbraui0FH_1rD4')
                       .then(function (res) {
                           $cordovaFile.readAsBinaryString(cordova.file.externalCacheDirectory, 'test.mp3')
                              .then(function (success) {
                                   console.log(success);
                                   $http.post('http://dmartelly.com:3000/message', {
                                      long: res.data.location.lng,
                                      lat: res.data.location.lat,
                                      email: $state.get('login').params.username,
                                      audio: success
                                   });
                              }, function (error) {
                                   console.log('nope');
                              });
                       });
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

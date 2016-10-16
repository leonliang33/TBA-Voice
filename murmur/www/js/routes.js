angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



      .state('getStarted', {
    url: '/start',
    templateUrl: 'templates/getStarted.html',
    controller: 'getStartedCtrl'
  })

  .state('page2', {
    url: '/page2',
    templateUrl: 'templates/page2.html',
    controller: 'page2Ctrl',
    params: {
         username: null
     }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl',
    params: {
         username: null
     }
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('yourInformation', {
    url: '/userinfo',
    templateUrl: 'templates/yourInformation.html',
    controller: 'yourInformationCtrl'
  })

  .state('settings', {
    url: '/settings',
    templateUrl: 'templates/settings.html',
    controller: 'settingsCtrl'
  })

  .state('createAudioMessage', {
    url: '/create',
    templateUrl: 'templates/createAudioMessage.html',
    controller: 'createAudioMessageCtrl'
  })

  .state('open', {
    url: '/open',
    templateUrl: 'templates/open.html',
    controller: 'openCtrl'
  })

  .state('confirmation', {
    url: '/confirmation',
    templateUrl: 'templates/confirmation.html',
    controller: 'confirmationCtrl'
  })

$urlRouterProvider.otherwise('/start')



});

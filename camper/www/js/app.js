var app = angular.module('bridgeItApp', ['ionic', 'ngCordova'])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) StatusBar.styleDefault();
    });
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;

    delete $httpProvider.defaults.headers.common["X-Requested-With"];

    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
  }])
  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    // Routes (found in templates folder)
    $stateProvider
      .state('main', {
        cache: false,
        url: "/",
        templateUrl: "templates/main.html",
        controller: "mainCtrl"
      })
      .state('health', {
        cache: false,
        url: "/next",
        templateUrl: "templates/health.html",
        controller: "healthCtrl"
      });
    $urlRouterProvider.otherwise('/');

    // Removes transitions (else looks ugly with background image)
    $ionicConfigProvider.views.transition('none');
  });


// Controllers
app
  .controller('mainCtrl', function($scope, $cordovaMedia) {
    $scope.playAudio = function() {
      var src = "/android_asset/www/audio/audio_example.mp3";
      var media = $cordovaMedia.newMedia(src);
		media.setVolume(1);
      media.play();
    }
  })
  .controller('healthCtrl', function($scope, $http) {
    $scope.title = 'Health';
    //$http.get('http://makoto2014.com/port15/get_categories.php')
    //  .success(function(data) {
    //    $scope.posts = data;
    //    console.log(data);
    //  })
    //  .error(function(data, status, headers, config) {
    //    console.log(status);
    //  });

	$scope.showHealthTitle = true;
	$scope.showHealthFaq = false;

	$scope.showFaq = function() {
    	$scope.showHealthTitle = false;
    	$scope.showHealthFaq = true;
    };
    
    var url = (ionic.Platform.isAndroid() ? "/android_asset/www/" : "") + "data/faq.json";
    $http.get(url).success(function(response){
        $scope.faqList = response;
//        alert("success");
    }).error(function() {
//    	alert("fail");
    });
        
    // Let's mock it up for now
  });

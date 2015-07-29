// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
$ionicConfigProvider.tabs.position('bottom');
})


.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
      .state('tabs',{
        url:'/tab',
        abstract:true,
        templateUrl:'templates/tabs.html'
      })

     .state('tabs.home',{
        url:'/home',
        views:{
          'home-tab':{
            templateUrl:'templates/home.html'
          }
        }
      })

      .state('tabs.list',{
        url:'/list',
        views:{
          'list-tab':{
            templateUrl:'templates/list.html',
            controller:'list'
          }
        }
       })

      .state('tabs.aboutUs',{
        url:'/aboutUs',
        views:{
          'aboutUs-tab':{
            templateUrl:'templates/aboutUs.html'
          }
        }
      })

      .state('tabs.detail',{
        url:'/list/:Carid',
        views:{
          'list-tab':{
            templateUrl:'templates/detail.html',
            controller:'list'
          }
        }
       })

      $urlRouterProvider.otherwise('/tab/home');
})



.controller('list',['$scope','$http','$state',function($scope,$http, $state){



  if (window.localStorage.getItem("carprofile") !== undefined){



    $http.get('http://reklamprice.site50.net/data.php?action=get_cars').success(function(data){
      
      $scope.cars= data;

      $scope.whichcar = $state.params.Carid;

      window.localStorage.setItem("carprofile", JSON.stringify(data));

      // console.log(data);
      console.log($scope.whichcar);

         $scope.doRefresh= function(){

         $http.get('http://reklamprice.site50.net/data.php?action=get_cars').success(function(data){
      
          $scope.cars= data;
          $scope.whichcar=$state.params.Carid;

          window.localStorage.setItem("carprofile", JSON.stringify(data));
          $scope.$broadcast('scroll.refreshComplete') ;
     
              });
          };

   
      
    })

    // .error(function (data){

    //   if(window.localStorage.getItem("carprofile") !== undefined) {
    //             scope.cars = JSON.parse(window.localStorage.getItem("carprofile"));
    //         }

    //   //$scope.cars= "request failed";
    // });

    }

    else {
         
         scope.cars = JSON.parse(window.localStorage.getItem("carprofile"));
         $scope.whichcar=$state.params.Carid;
         $scope.doRefresh= function(){

         $http.get('http://reklamprice.site50.net/data.php?action=get_cars').success(function(data){
      
          $scope.cars= data;
          $scope.whichcar=$state.params.Carid;
          window.localStorage.setItem("carprofile", JSON.stringify(data));
          $scope.$broadcast('scroll.refreshComplete') ;
     
              });
          };
    }

}])


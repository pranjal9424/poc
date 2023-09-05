(function () {
    'use strict';
    var myApp = angular.module('app');
    
    myApp.controller('FileUploadController', function ($scope, fileUploadService,$http) {
        $scope.conversation=[];
        $scope.isLoading=true;
        $scope.toggle=false;
        var index=1;
        $scope.slide=false;
        $scope.frontSlide=false;

        $scope.frontSwitchSlide = function (){
            $scope.toggle=false;
            $scope.conversation=[];
        };

        $scope.switchSlide = function (){
            if($scope.slide){
                $scope.slide=false;
            }else{
                $scope.slide=true;
            }
        };
        
        
          $scope.ask = function (questions) {
            $scope.toggle=true;
            var temp={id: index++,value: questions};
            $scope.conversation.push(temp);
            var uploadUrl = "lhttp://127.0.0.1:5000/askQuestion?"; //Url of askQuestion
            $http({
                method: 'POST',
                url: uploadUrl,
                data: {'questions': questions}
            })
            .then(function successCallback(response) {
                if(response.answer  !== null){
                    var temp={id: index++,value: response.answer};
                    $scope.conversation.push(temp);
                }else{
                    var temp={id: index++,value: "No response"};
                $scope.conversation.push(temp);
                }
            }, function () {
                var temp={id: index++,value: "An error has occurred"};
                $scope.conversation.push(temp);
            })
        };
        $scope.uploadFile = function () {
            var files = $scope.myFile;
            $scope.isLoading=true;
            var uploadUrl = "http://127.0.0.1:5000/upload", //Url for upload
                promise = fileUploadService.uploadFileToUrl(files, uploadUrl);

            promise.then(function (response) {
                if(response.result="Files upload successfully!"){
                    $scope.toggle=true;
                }else{
                    $scope.serverResponse = 'An error has occurred';
                }
            }, function () {
                $scope.serverResponse = 'An error has occurred';
            })
        };
    });

})();
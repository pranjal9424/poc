(function () {
    'use strict';
    var myApp = angular.module('app');
    
    myApp.controller('FileUploadController', function ($scope, fileUploadService,$http) {
        $scope.isLoading=true;
        $scope.toggle=false;
        var index=1;
        
        $scope.conversation=[];
          $scope.ask = function (question) {
            $scope.toggle=true;
            var temp={id: index++,value: question};
            $scope.conversation.push(temp);
            var uploadUrl = "../server/service.php"; //Url of upload
            $http({
                method: 'POST',
                url: uploadUrl,
                data: {'question': question}
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
            var file = $scope.myFile;
            $scope.isLoading=true;
            var uploadUrl = "../server/service.php", //Url of upload
                promise = fileUploadService.uploadFileToUrl(file, uploadUrl);

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
app.controller("profil", function($scope,$http,$routeParams,eleveFactory) {
    $scope.test="hello";
    // console.log($routeParams);
    $scope.monProfil=eleveFactory.get({userId:$routeParams.id});
    // $http({
    //     "method":"GET",
    //     "url":"http://localhost:3000/api/liste/"+$routeParams.id
    // }).then(function successCallback(reponse){
    //     $scope.monProfil=reponse.data;
    // },function errorCallback(reponse){
    //     console.log(reponse);
    // });
});
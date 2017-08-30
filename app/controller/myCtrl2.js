app.controller("myCtrl2", function($scope, $rootScope,$http,liste, eleveFactory) {
    // $scope.monTableau = [{nom : "casagrande", prenom:"leo"},{nom : "vador", prenom:"dark"}];
    // $http({
    //     "method":"GET",
    //     "url":"http://localhost:3000/api/liste"
    // }).then(function successCallback(reponse){
    //     $scope.maListe=reponse.data;
    // },function errorCallback(reponse){
    //     console.log(reponse);
    // });

    $scope.maListe=liste;

    $scope.deleteEleve = function(eleve){
        console.log(eleve);
        eleveFactory.delete({userId:eleve._id});
        //permet de supprimer aussi l'affichage
        $scope.maListe.splice($scope.maListe.indexOf(eleve),1);
    };

    $scope.updateEleve = function (eleve)
    {
        $scope.parametre.ajout=0;
        // console.log(eleve._id);
        $scope.person=eleve;
    }

    $scope.ajoutEleve = function(eleve,mode){
        if(mode==1)
        {
            console.log('Ajout');
            $scope.maListe.push($scope.person);
            // console.log(eleve);
            eleveFactory.save({eleve});
            $scope.person = {};
        }
        else
        {
            console.log('edit');
            // $scope.maListe.push($scope.person);
            console.log(eleve._id);
            eleveFactory.update({userId:eleve._id},eleve);
            $scope.person={};
        }

    };


});
app.controller('playerController', ['$scope', '$location', 'playerService', '$routeParams', function($scope, $location, playerService, $routeParams) {
    if($routeParams.id) {
        playerService.getPlayer($routeParams.id)
            .success(function (result) {
                $scope.player = result;
            });
    }

    $scope.save = function(player) {
        if($routeParams.id == undefined) {
            playerService.savePlayer(player)
                .success(function (result) {
                    console.log(result);
                    $location.path('/players');
                });
        }
        else {
            playerService.updatePlayer($routeParams.id, player)
                .success(function (result) {
                    console.log(result);
                    $location.path('/players');
                });
        }
    };
}]);

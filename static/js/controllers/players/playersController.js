app.controller('playersController', ['$scope', 'playerService', function($scope, playerService) {
    playerService.getPlayers()
        .success(function (result) {
            $scope.players = result;
        });

    // set order to display players,
    // lastName by default
    $scope.order = 'lastName';

    // set new order to display players
    $scope.setOrder = function (order) {
        $scope.order = order;
    };

    // Remove a player
    $scope.remove = function(index) {
        var player = $scope.players[index];

        if(confirm('Are you sure you want to delete ' + player.firstName + ' ' + player.lastName)) {
            playerService.removePlayer(player._id)
                .success(function (result) {
                    console.log(result);
                    $scope.players.splice(index, 1);
                });
        }
    };
}]);

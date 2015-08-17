app.service('playerService', ['$http', function ($http) {
    var urlBase = 'http://localhost:3000/api/v1/players';

    this.getPlayers = function () {
        return $http.get(urlBase);
    };

    this.getPlayer = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    this.savePlayer = function (data) {
        return $http({
            url: urlBase,
            method: 'POST',
            data: data
        });
    };

    this.updatePlayer = function (id, data) {
        return $http({
            url: urlBase + '/' + id,
            method: 'PUT',
            data: data
        });
    };

    this.removePlayer = function (id) {
        return $http({
            url: urlBase + '/' + id,
            method: 'DELETE'
        });
    };
}]);

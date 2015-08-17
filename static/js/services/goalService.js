app.service('goalService', ['$http', function ($http) {
    var urlBase = 'http://localhost:3000/api/v1/goals';

    this.getGoals = function () {
        return $http.get(urlBase);
    };

    this.getGoal = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    this.saveGoal = function (data) {
        return $http({
            url: urlBase,
            method: 'POST',
            data: data
        });
    };

    this.updateGoal = function (id, data) {
        return $http({
            url: urlBase + '/' + id,
            method: 'PUT',
            data: data
        });
    };

    this.removeGoal = function (id) {
        return $http({
            url: urlBase + '/' + id,
            method: 'DELETE'
        });
    };
}]);

/**
 * Created by Administrator on 2015/4/15.
 */
function table($scope,$http) {
    $http.get("data/Customers_JSON.php").success(function(response) {$scope.names = response;});
}

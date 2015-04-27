/**
 * Created by Administrator on 2015/4/14.
 */
function control2($scope,$http) {
    $http.get("data/Customers_JSON.php")
        .success(function(response) {$scope.names = response;});
}

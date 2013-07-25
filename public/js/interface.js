localStorage.removeItem('id_carre');
var id_existe = false;

function Ctrl($scope) {
    $scope.templates = [
	    {url: './partials/menu.html'},
	    {url: './partials/game.html'}
    ];
    
	$scope.templateMenu = $scope.templates[0];
	$scope.templateGame = $scope.templates[1];
}
function Ctrl($scope) {    
    $scope.templateMenu             = './partials/menu.html';
    $scope.templateGame             = './partials/game.html';
    $scope.templateJoinNetGame      = './partials/join_netgame.html';
    $scope.templateCreateNetGame    = './partials/create_netgame.html';
    $scope.templateOptions          = './partials/options.html';
    $scope.templateRules            = './partials/rules.html';
}

jQuery(function ($){
    console.log("interface.js ok");
    
    $('body').on('click', '.changeViewButton', function(event){
        var target = "view_" + $(this).attr("data-viewTarget");
        $(".activeView").removeClass("activeView").fadeOut(100, function(){
            $("#" + target).addClass("activeView").fadeIn(100);
        });
    });

    $('body').on('click', '.quitButton', function(event){
        window.close();
    });
});
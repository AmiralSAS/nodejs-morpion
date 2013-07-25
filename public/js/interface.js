function Ctrl($scope) {    
    $scope.templateMenu    = './partials/menu.html';
    $scope.templateGame    = './partials/game.html';
    $scope.templateOptions = './partials/options.html';
    $scope.templateRules   = './partials/rules.html';
}

jQuery(function ($){
    console.log("interface.js ok");
    
    $('body').on('click', '.changeViewButton', function(event){
        var target = "view_" + $(this).attr("data-viewTarget");
        $(".activeView").removeClass("activeView").fadeOut(300, function(){
            $("#" + target).addClass("activeView").fadeIn(300);
        });
    });

    $('body').on('click', '.quitButton', function(event){
        window.close();
    });
});
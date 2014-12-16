/**
 * @ngdoc filter
 * @name testapp.mod:dplMod
 * @function
 * @description
 * # dplMod
 * Mod in the testapp.
 */
KISSY.add(function(S, require) {
    return {
        var myApp = new Framework7();
        var mainView = myApp.addView('.view-main',{
            dynamicNavbar: true
        });
        S.on('pageInit', function(e){
            var page = e.detail.page;
            if(page.name === 'about'){
                myApp.alert('here comes About page');
            }
        })

        S.on('pageInit','.page[data-page="about"]',function(e){
            myApp.alert('here comes About page');
        })
    };

});

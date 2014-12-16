/**
 * @jsdoc function
 * @name testapp.page:dplpage
 * @description
 * # Dplpage
 * page of the testapp
 */
KISSY.add(function (S, require) {

    S.use('touch'); //引入touch事件模块，才支持tap

    var $ = S.all;
    //需要包含的各种模块和组件在这里引入
    //定义各种MTOP接口
    var getInRangeApi = 'mtop.taobao.bullet.inRange';

    //定义页面上的各种UI操作dom
    var ui = {
        $container: $('.views'),
        $loading: $('.loading-text')
    };

    var menuClick = function(){
        console.log('aa');
    }
    //入口函数
    return {
        init: function () {
            menuClick();
            console.log('page inited');
        }
    };

});

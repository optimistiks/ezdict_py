/**
 * Created with JetBrains PhpStorm.
 * User: Mr.D.Slack
 * Date: 13.08.13
 * Time: 0:47
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    $("#reg-button").on('click', function(){
        $.when(
                $('#princ-wrapper').fadeOut()
               ).done(function(){
                $('#registration').fadeIn();
            });
    });
});
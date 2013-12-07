$(document).ready(function(){
    $("#reg-button").on('click', function(){
        $.when(
                $('#princ-wrapper').fadeOut()
               ).done(function(){
                $('#registration').fadeIn();
            });
    });
    $('input, textarea').placeholder();

    $(document).on('click','.header-login-btn', function (){
        $('.login-form').fadeToggle();
    });

    $(document).on('click', function(event){
        var el = event.target || event.srcElement;
        if (!$(el).is('#login-button') && !$(el).is('.login-form') && $(el).parents().index($('.login-form')) === -1) {
            $('.login-form').fadeOut()
        }
    });

    $('#login-button').on('click',function(){
        $('.login-form').find('input[type=text]').focus();
    });


});
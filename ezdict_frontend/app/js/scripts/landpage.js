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
        var $form = $('.login-form');
        $form.fadeToggle().promise().done(function(){
            if ($form.is(':visible')) {
                $form.find('input').first().focus();
            }
        });
    });

    $(document).on('click', function(event){
        var el = event.target || event.srcElement;
        if (!$(el).is('#login-button') && !$(el).is('.login-form') && $(el).parents().index($('.login-form')) === -1) {
            $('.login-form').fadeOut()
        }
    });
    $(document).on('click','#log-in a', function(){
        $.when($('#log-in').fadeOut()).done(function(){
            $('#pass-recovery').fadeIn();
        });
    });
    $(document).on('click','#pass-recovery a', function(){
        $.when($('#pass-recovery').fadeOut()).done(function(){
            $('#log-in').fadeIn();
        });
     });

});
$(document).ready(function () {
    $(document).on('click', '#his-label', function () {
        if ($('#third-col').width() == '200') {
            $('#third-col').animate({
                width: "10px"
            }, 300).css('overflow', 'visible');
            $('#second-col-wrapper').animate({
                "margin-right": "10px"
            }, 300);
            $('.history').css('padding', '0');
            $('.his-tag').siblings('div').hide();
        } else {
            $.when(
                    $('#third-col').animate({width: "200px"}, 300).css('overflow', 'visible'),
                    $('#second-col-wrapper').animate({"margin-right": "200px"}, 300)
                ).done(function(){
                    $('.his-tag').siblings('div').fadeIn('600');
                });
            }
    });
    $(document).on('click', '.words-wrapper div', function(){
        $('.words-wrapper').find('div').removeClass('words-in-history-opened').addClass('words-in-history-closed')
        $(this).removeClass('words-in-history-closed').addClass('words-in-history-opened').fadeIn('400');
    });
/*    $(document).on('click', '.basket-wrapper', function(){
        $('.active-sticker').stop().slideToggle()
    });*/
//    --------------- код для анимации редактора сикеров через Transition--------------
//    $('#edit-sticker').on('click',function(){
//       $('#footer').toggleClass('edit-field');
//    });
    // -----------Анимация редактора стикеров---------
    $(document).on('click', '#edit-sticker', function(){
        if($('#footer').height() == '70') {
            $.when(
                $(this).toggleClass('edit-sticker-active'),
                $('#footer').animate({'height':'50%','min-height':'460px'},400).css('overflow', 'visible')
            ).done( function(){
                    $('.desk-wrapper').fadeIn('slow');
                });
        } else {
            $.when(
                $('.desk-wrapper').fadeOut('fast')
                ).done(function(){
                    $('#footer').animate({'height':'70px','min-height':'0'},400).css('overflow', 'visible');
                    $('.edit-sticker').toggleClass('edit-sticker-active');
                });


        }
    });

//    код для расширения общего поля при закрытии всех виджетов(на данный момент 1 виджет))
    $(document).on('click', '#rw-close-btn', function(){
        $.when(
        $('#random-words-widget').fadeOut()
            ).done(function(){
                if ($('#random-words-widget').not(':visible')) {
                    $('.first-col').width('30');
                    $('.two-col-wrapper').animate({
                        'left': '30px'
                    },300);
                    $('#widgets-btn').animate({
                        'width': '20px'
                    },300);
                }
            });
    });

    $(document).on('click', '.widgets-btn', function(){
        if ($('#random-words-widget').not(':visible').length === 1){
            $.when(
                $('.first-col').width('210'),
                $('.two-col-wrapper').animate({'left': '210px'},300),
                $('#widgets-btn').animate({
                    'width': '50px'
                },300)
            ).done($('#random-words-widget').fadeIn());
        }
    });


});
$(document).ready(function () {
    window.onbeforeunload = function(){ return 'Стой!'; }

    var cashWrap = $('.cash_wrap'),
        cashWrapMinius = $('.cash_wrap_minus');

    /*add plus*/
    $('.add_cash').click(function (e) {
        $('body').append(cashWrap);
        var this_plus = $(this);
        $('.cash_wrap').show();
        var person_score = $(this).parent('.col1').parent('.row');
        var person_score_cash = $(this).parent('.col1').find('p');
        add_cash(this_plus, person_score_cash, person_score);
    });

    function add_cash(this_plus, pers_score, row) {
        $(".close").click(function (e) {
            $('.cash_wrap').remove();
        });
        $('.cash').click(function () {
            $('.cash').off("click");
            var value = $(this).text();
            if ($(this).hasClass('cash_last')) {
                console.log("posled");
                lastBall(row);
                return;
            }
            var el = pers_score.append("<span class='mini_cash cash_" + value + "'>" + value + "</span>");
            scrollToEnd(pers_score);
            if (row.hasClass("row_first")) {
                $(".row_last").find('.col2').find('p').append("<span class='mini_cash cash_" + value + "'>" + value + "</span>");
            }
            else {
                row.prev().find('.col2').find('p').append("<span class='mini_cash cash_" + value + "'>" + value + "</span>");
            }

            $('.cash_wrap').fadeOut(300).hide();
            $('.cash').on("click");
            // scoreCalc(row);
            this_plus.show();
        });
    }

    function lastBall(row) {
        $('.cash_wrap').remove();
        $('.last_ball').fadeIn(500);
        $('.cash').click(function () {
            var value = $(this).text(),
                thisPlayerName = row.find('.col1').find('.name').text(),
                prevPlayerName,
                colPlayers = $('.row').length;
            console.log(colPlayers);
            if (row.hasClass("row_first")) {
                $(".row_last").find('.col2').find('p').append("<span class='mini_cash cash_last'>" + (value * 2) + "</span>");
                prevPlayerName = $(".row_last").find('.col1').find('.name').text();
            }
            else {
                row.prev().find('.col2').find('p').append("<span class='mini_cash cash_last'>" + (value * 2) + "</span>");
                prevPlayerName = row.prev().find('.col1').find('.name').text();
            }

            $('.row').each(function (i) {
                if ($(this).find('.col1').find('.name').text() == prevPlayerName) {
                }
                else if ($(this).find('.col1').find('.name').text() == thisPlayerName) {
                    $(this).find('.col1').find('p').append("<span class='mini_cash cash_last'>" + (value * colPlayers) + "</span>");
                }
                else {
                    console.log("-1");
                    $(this).find('.col2').find('p').append("<span class='mini_cash cash_last'>" + value + "</span>");
                }
            });
            $('.last_ball').hide();
        });
    }

    /*add minus*/
    $('.fa-minus').click(function (e) {
        $('body').append(cashWrapMinius);
        var this_minus = $(this);
        $(this).hide();
        $('.cash_wrap_minus').show();
        var person_score = $(this).parent('.col2').parent('.row');
        var person_score_cash = $(this).parent('.col2').find('p');
        add_minus(this_minus, person_score_cash, person_score);
    });

    function add_minus(this_minus, pers_score, row) {
        $(".close").click(function (e) {
            $(".cash_wrap_minus").remove();
            this_minus.show();
        });
        $('.cash_minus').click(function () {
            $('.cash_minus').off("click");
            var value = $(this).text();
            pers_score.append("<span class='mini_cash minus_" + value + "'>" + value + "</span>");
            scrollToEnd(pers_score);
            if (row.hasClass("row_first")) {
                $(".row_last").find('.col1').find('p').append("<span class='mini_cash minus_" + value + "'>" + value + "</span>");
            }
            else {
                row.prev().find('.col1').find('p').append("<span class='mini_cash minus_" + value + "'>" + value + "</span>");
            }
            $('.cash_wrap_minus').fadeOut(300).hide();
            $('.cash_minus').on("click");
            this_minus.show();
        });
    }

    function scrollToEnd(el) {
        el.scrollLeft(10000);
    }

    /*score calc*/
    setInterval(function (e) {
        $('.row').each(function (i) {
            scoreCalc($(this));
        })
    }, 1000);

    function scoreCalc(player) {
        console.log('start calc');
        var minus = 0, plus = 0, total = 0;
        player.find('.col1').find('p').find('span').each(function (i) {
            plus = plus + +$(this).text();
        });
        player.find('.col2').find('p').find('span').each(function (i) {
            minus = minus + parseInt($(this).text());
        });
        player.find('.col3').find('.score_plus')
        total = plus - minus;
        player.find('.col3').find('.score_plus').find('.score').text(plus);
        player.find('.col3').find('.score_minus').find('.score').text(minus);
        player.find('.col3').find('.score_total').find('.score').text(total);

        /*need del*/
        /*view in console*/
        // console.log(player.find('.col0').find('.name').text() + " plus = " + plus);
        // console.log(player.find('.col0').find('.name').text() + " minus = " + minus);
        // console.log(player.find('.col0').find('.name').text() + " total = " + total);
    }


    /**************init*******************/
    /*add player*/
    // var playerNumber = 3;
    // $(".add-player").click(function (e) {
    //     playerNumber++;
    //     var html = '<div class="init-player">' +
    //         '<input type="text" maxlength="20" class="init-player_input" placeholder="имя ' + playerNumber + ' игрока">' +
    //         '</div>';
    //     $(".init-players").append(html);
    // });


    /*start game*/
    // $('#next_1').click(startGame);
    //
    // function startGame(playerNumber, name) {
    //     $('.init-player_input').each(function (i) {
    //         console.log('');
    //     })
    // }
    //
    // $("body").on("change", ".window_init-players", function () {
    //     $('.init-player_input').off("change");
    //     var timeout = setTimeout(initPlayerOnChange(timeout), 100);
    // });
    // var canStart = false;

    // function initPlayerOnChange(timeout) {
    //     $('.init-player_input').on("change", function () {
    //         if ($(this).val().length > 0) {
    //             $(this).css({
    //                 "border-color": "#008d65"
    //             });
    //         }
    //         canStart = true;
    //         $('.init-player_input').each(function (i) {
    //             console.log("i= " + i + "   |||  canStart = " + canStart + "   ||||   val = " + $(this).val());
    //             if ($(this).val().length == 0) {
    //                 canStart = false;
    //             }
    //         });
    //         if (canStart) {
    //             $('#next_1').css({
    //                 'background': 'green'
    //             })
    //         }
    //     });
    //     clearTimeout(timeout);
    // }


    /*   $('.init-player_input').on( "change", function(){
           if($(this).val().length > 0){
               $(this).css({
                  "border-color" : "#16d87d"
               });
               $(this).next('.init-player_btn').show();
           }
           else{
               $(this).css({
                   "border-color" : "#16b261"
               });
               $(this).next('.init-player_btn').hide();
           }
           var flag = false;
           $(".init-player_input").each(function(i){
               if($(this).val().length > 0){
                   flag = true;
               }
               else{
                   flag = false;
               }
           });



           if(flag){
               $('.init-players_next').fadeIn(200);
           }
           else{
               $('.init-players_next').fadeOut(200);
           }
       });
   */


    //var localValue = localStorage.getItem('myKey');
    //$('h2').text(localValue);
    //
    //
    //$('h1').click(function(){
    //    var text = $(this).text();
    //    console.log(text);
    //    localStorage.setItem('myKey', text);
    //});


});


var app = new Vue({
    el: '#appy',
    data: {
        message: 'Hello Vue!',
        state: 'init',
        popupState: '',
        player: {
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
            '6': '',
            '7': '',
            '8': ''
        },
        players: 3,
    },
    methods: {
        startGame() {
            this.state = 'score';
            this.startGameJQery();
        },
        addPlayer() {
            this.players++
        },
        startGameJQery() {
            var cashWrap = $('.cash_wrap'),
                cashWrapMinius = $('.cash_wrap_minus');

            /*add plus*/
            $('.add_cash').click(function (e) {
                $('body').append(cashWrap);
                var this_plus = $(this);
                $('.cash_wrap').show();
                var person_score = $(this).parent('.col1').parent('.row');
                var person_score_cash = $(this).parent('.col1').find('p');
                add_cash(this_plus, person_score_cash, person_score);
            });

            function add_cash(this_plus, pers_score, row) {
                $(".close").click(function (e) {
                    $('.cash_wrap').remove();
                });
                $('.cash').click(function () {
                    $('.cash').off("click");
                    var value = $(this).text();
                    if ($(this).hasClass('cash_last')) {
                        console.log("posled");
                        lastBall(row);
                        return;
                    }
                    var el = pers_score.append("<span class='mini_cash cash_" + value + "'>" + value + "</span>");
                    scrollToEnd(pers_score);
                    if (row.hasClass("row_first")) {
                        $(".row_last").find('.col2').find('p').append("<span class='mini_cash cash_" + value + "'>" + value + "</span>");
                    }
                    else {
                        row.prev().find('.col2').find('p').append("<span class='mini_cash cash_" + value + "'>" + value + "</span>");
                    }

                    $('.cash_wrap').fadeOut(300).hide();
                    $('.cash').on("click");
                    // scoreCalc(row);
                    this_plus.show();
                });
            }

            function lastBall(row) {
                $('.cash_wrap').remove();
                $('.last_ball').fadeIn(500);
                $('.cash').click(function () {
                    var value = $(this).text(),
                        thisPlayerName = row.find('.col1').find('.name').text(),
                        prevPlayerName,
                        colPlayers = $('.row').length;
                    console.log(colPlayers);
                    if (row.hasClass("row_first")) {
                        $(".row_last").find('.col2').find('p').append("<span class='mini_cash cash_last'>" + (value * 2) + "</span>");
                        prevPlayerName = $(".row_last").find('.col1').find('.name').text();
                    }
                    else {
                        row.prev().find('.col2').find('p').append("<span class='mini_cash cash_last'>" + (value * 2) + "</span>");
                        prevPlayerName = row.prev().find('.col1').find('.name').text();
                    }

                    $('.row').each(function (i) {
                        if ($(this).find('.col1').find('.name').text() == prevPlayerName) {
                        }
                        else if ($(this).find('.col1').find('.name').text() == thisPlayerName) {
                            $(this).find('.col1').find('p').append("<span class='mini_cash cash_last'>" + (value * colPlayers) + "</span>");
                        }
                        else {
                            console.log("-1");
                            $(this).find('.col2').find('p').append("<span class='mini_cash cash_last'>" + value + "</span>");
                        }
                    });
                    $('.last_ball').hide();
                });
            }

            /*add minus*/
            $('.fa-minus').click(function (e) {
                $('body').append(cashWrapMinius);
                var this_minus = $(this);
                $(this).hide();
                $('.cash_wrap_minus').show();
                var person_score = $(this).parent('.col2').parent('.row');
                var person_score_cash = $(this).parent('.col2').find('p');
                add_minus(this_minus, person_score_cash, person_score);
            });

            function add_minus(this_minus, pers_score, row) {
                $(".close").click(function (e) {
                    $(".cash_wrap_minus").remove();
                    this_minus.show();
                });
                $('.cash_minus').click(function () {
                    $('.cash_minus').off("click");
                    var value = $(this).text();
                    pers_score.append("<span class='mini_cash minus_" + value + "'>" + value + "</span>");
                    scrollToEnd(pers_score);
                    if (row.hasClass("row_first")) {
                        $(".row_last").find('.col1').find('p').append("<span class='mini_cash minus_" + value + "'>" + value + "</span>");
                    }
                    else {
                        row.prev().find('.col1').find('p').append("<span class='mini_cash minus_" + value + "'>" + value + "</span>");
                    }
                    $('.cash_wrap_minus').fadeOut(300).hide();
                    $('.cash_minus').on("click");
                    this_minus.show();
                });
            }

            function scrollToEnd(el) {
                el.scrollLeft(10000);
            }

            /*score calc*/
            setInterval(function (e) {
                $('.row').each(function (i) {
                    scoreCalc($(this));
                })
            }, 1000);

            function scoreCalc(player) {
                console.log('start calc');
                var minus = 0, plus = 0, total = 0;
                player.find('.col1').find('p').find('span').each(function (i) {
                    plus = plus + +$(this).text();
                });
                player.find('.col2').find('p').find('span').each(function (i) {
                    minus = minus + parseInt($(this).text());
                });
                player.find('.col3').find('.score_plus')
                total = plus - minus;
                player.find('.col3').find('.score_plus').find('.score').text(plus);
                player.find('.col3').find('.score_minus').find('.score').text(minus);
                player.find('.col3').find('.score_total').find('.score').text(total);

                /*need del*/
                /*view in console*/
                // console.log(player.find('.col0').find('.name').text() + " plus = " + plus);
                // console.log(player.find('.col0').find('.name').text() + " minus = " + minus);
                // console.log(player.find('.col0').find('.name').text() + " total = " + total);
            }
        }
    }
})

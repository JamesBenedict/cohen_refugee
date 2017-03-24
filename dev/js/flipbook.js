// helpful terms
    // card: the container for your content, in this example it is the white rectangle
    // page: the container for your card(s) and the div that the animations/transitions are applied to. In this example it is the color background
       // each page is 100vh and 100vw, with overflow scrolling on. It can be populated with as many cards as needed
    // book: the entire interactive that contains all pages
        // the book disbales overflow scrolling and the js uses trasnlateY to move up and down to the appropriate page 
    // window: the actively seen page

// sets up the domain and defines the start page
$( ".page" ).first().addClass('active');
$( ".page" ).first().addClass('first');
$(".page").last().addClass('last');

function indexPages() {
    // adds index number to each instance of the page class
    $('.page').each(function (index, value) { 
        $(this).attr('data-item', index+1);
    });
}


function checkNavigation() {
    // hides / shows the next/back buttons depending if the page is the first or last page in the book
    if ($('.active').hasClass('first') || $('.active').prev('.page').hasClass('character_page') ) {
        $('#prev').hide();
        $('#next').show();
        $('#restart').hide();
    } else if ($('.active').hasClass('last')) {
        $('#next').hide();
        $('#prev').show();
        $('#restart').show();
    } else {
        $('#prev').show();
        $('#next').show();
        $('#restart').hide();
    }

    if ($('.active').hasClass('exitable')){
        $('#exit').show();
    } else {
        $('#exit').hide();
    }

    if ($('.active').hasClass('character_page')){
        $('.button_wrap').hide();
    } else{
        $('.button_wrap').show();
    }
}


var advance = function (activePage, nextPage){
    // transition to advance to next page 
    if (activePage.hasClass('last')){
        // stops people from going past the last page
        console.log('swoop');
    } else{
        nextPage.addClass('active')
        activePage.removeClass('active')

        var pageIndex = parseInt(activePage.attr('data-item')),
        nextWindow = activePage.height() * pageIndex;
        $('#book').css('transform', 'translateY(-' +nextWindow +'px)').css('transition', '.6s ease-in-out');
        // alert(nextWindow)
    }
}

function advance_conditions (){
    var activePage = $('.active'),
    nextPage = activePage.next('.page');

    // Conditonal logic goes here
    if (nextPage.hasClass('conditional')){
        var direction = 'next',
        newPage = nextPage;
        conditional(activePage, newPage, direction);
    } else {
        // regular slide transition
        advance(activePage, nextPage);
        checkNavigation();
    }
}


var retreat = function (activePage, prevPage){
    if (activePage.hasClass('first')){
       console.log('swoop');
    } else{
       // transitions to the previous page
        prevPage.addClass('active')
        activePage.removeClass('active')

        var pageIndex = parseInt(activePage.attr('data-item')),
        pageDepth = activePage.height() * pageIndex,
        prevWindow =  pageDepth - (2 * activePage.height() );
        // alert(depth)
        $('#book').css('transform', 'translateY(-' + prevWindow+'px)').css('transition', '.6s ease-in-out');    
    }
}


function retreat_conditions (){
    var activePage = $('.active'),
    prevPage = activePage.prev('.page');

    if (prevPage.hasClass('conditional')){
        var direction = 'prev',
        nextPage = prevPage;
        conditional(activePage, nextPage, direction);
    } else {
        // regular slide transition
        retreat(activePage, prevPage);
        checkNavigation();
    }        
}

var navigation = function () {
    // calls the advance/retreat functions based on button clicks
    // adds conditional alterations for transitions
    checkNavigation();

    // keystroke
    $(document).keyup(function(key) {
        if (key.which === 40) {
            advance_conditions();
            $('#test').css('color', 'yellow');

        } else if (key.which == 38) {
            retreat_conditions(); 
            $('#test').css('color', 'green');
        }
    });

    $('html').on('swipe',function(){
       
        $('#test').css('color', 'orange');

    });

    $('.active').on('swipedown',function(){
        advance_conditions();
        console.log('swoop');
        alert('ys');
        $('#test').css('color', 'purple');

    });
    $('.active').on('swipeup',function(){alert("swipeup..");} );

    // button input
    $('#next').click(function () {
        advance_conditions();
    });

    $('#prev').click(function () {
        //prev slide function
        retreat_conditions();
    });

    $('#restart').click(function () {
        $('#book').css('transform', 'translateY(0px)').css('transition', '.6s ease-in-out'); 
        window.location.reload();
        $('.active').removeClass('active')
        $('.page').first().addClass('active')
        $('#restart').hide()
        checkNavigation();
    });

    $('#exit').click(function () {

        $('.exit_card').css('display', 'inline-block');
        $('.exit_cancel').click(function () {
        $('.exit_card').css('display', 'none');
        })
    $('.exit_reset').click(function () {
        $('.exit_card').css('display', 'none');
        $('#book').css('transform', 'translateY(0px)').css('transition', '.6s ease-in-out'); 
        window.location.reload();
        })
    
    // alert(nextWindow)
        checkNavigation();
    });
}

function conditional (activePage, newPage, direction){
    videos = $('.autoplay'),
    videos[0].play();
    // checkNavigation();
    if (direction == 'next'){
        advance(activePage, newPage);
    } else if (direction == 'prev'){
        retreat(activePage, newPage);
    }   
}


function resizeWindow () {
    // console.log('test')
    // would prefer something that didnt jump as much as this does during the scroll 
    // at least this keeps the viewr on ther right page
    currentWindow = $('.active').height() * parseInt($('.active').attr('data-item')-1);
    $('#book').css('transform', 'translateY(-' + currentWindow +'px)');
   
}

function scrollWatch (){
// all credit due http://stackoverflow.com/questions/7154967/how-to-detect-scroll-direction
// http://stackoverflow.com/questions/7018919/how-to-bind-touchstart-and-click-events-but-not-respond-to-both
    triggered = false;

    // firefox
    $(document).bind('DOMMouseScroll', function(e){
        if(e.originalEvent.detail > 0) {
        //scroll down
        console.log('Down');
        $('#test').css('color', 'blue');
    } else {
         //scroll up
        console.log('Up');
        $('#test').css('color', 'purple');
     }
     //prevent page fom scrolling
     return false;
 });

    //IE, Opera, Safari, chrome
    $(document).bind('mousewheel', function(e){
    if(e.originalEvent.wheelDelta < 0) {
        //scroll down
        console.log('Down');
        $('#test').css('color', 'blue');
        
        if (!triggered){
            triggered = true;
            setTimeout(function(){
                triggered = false;
            }, 1000);
            advance_conditions();
        } 
        return false
     

     }else {
         //scroll up
         console.log('Up');
        $('#test').css('color', 'purple');
        if (!triggered){
            triggered = true;
            setTimeout(function(){
                triggered = false;
            }, 1000);
            retreat_conditions();
        } 
        return false

     }
     //prevent page fom scrolling
     return false;
 });
}

// loads the script duuuuuuuude
$(document).ready(function () {
    indexPages();
    navigation();
    scrollWatch();
});

$(window).resize(function (){
    resizeWindow();
    
});

$(document).on('touchmove', function(e) {
    e.preventDefault();
    // alert('yo');
    $('#test').css('color', 'blue');
    // $(document).on('swipedown',function(){
       
    //     $('#test').css('color', 'orange');

    // });
});

// works referenced 
// http://jsfiddle.net/794f4yvw/12/
// www.nytimes.com/interactive/2016/08/05/sports/olympics-gymnast-simone-biles.html?_r=0

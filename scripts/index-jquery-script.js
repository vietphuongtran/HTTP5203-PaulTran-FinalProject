jQuery(document).ready(function () {
    
    //uniform header show up when leave the h1 part
    $(window).scroll(function() {
   var hT = $('#reservation').offset().top,
       hH = $('#reservation').outerHeight(),
       wH = $(window).height(),
       wS = $(this).scrollTop();
   if (wS > (hT+hH-wH+350)){
       $('#uniform-header').fadeIn(1000);
   }else {
       $('#uniform-header').fadeOut(100);
   }
});    
    
    //hide h1, show description when scroll down
    $(window).scroll(function(){
        $('#h1').fadeOut(1000);
        $('#scrolldown').fadeOut(1000);
        $('#header_description').fadeIn(1200);
    });
    
    //navbar effect
        $('li').hover(
        function() {
        $(this).toggleClass('hover');
        }
    );
});

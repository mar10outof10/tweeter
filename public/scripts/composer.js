$(document).ready(() => {
  // top of page button functions
  $('#top-page').on('mouseleave', () => {
    $('#move-up').html('&#11014;'); // default pageup button icon (up arrow)
  });

  $('#top-page').on('mouseenter', () => {
    $('#move-up').html('&#129304&#11014;&#11014;'); // pageup button icon on mouseover (more up)
  });

  $('#top-page').on('click' , () => { // top of page on click
    window.scrollTo(0,0);
  });
  // makes nav bar disappear and button appear when scrolling past designated area, opposite happens when scrolling back up.
  $(window).on('scroll', function() {
    if ($(this).scrollTop() < 200) {
      $('#top-page').css('display', 'none');
      $('nav').css('visibility', 'visible');
    } else {
      $('#top-page').css('display', 'flex');
      $('nav').css('visibility', 'hidden');
    }
  });
});
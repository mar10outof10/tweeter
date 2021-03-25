$('#top-page').on('mouseenter', () => {
  $('#move-up').html('&#129304&#11014;&#11014;');
})

$('#top-page').on('mouseleave', () => {
  $('#move-up').html('&#11014;');
})

$('#top-page').on('click' , () => {
  window.scrollTo(0,0);
})

$(window).on('scroll', function() {
  if ($(this).scrollTop() < 200) {
    $('#top-page').css('display', 'none');
    $('nav').css('display', 'flex');
  } else {
    $('#top-page').css('display', 'flex');
    $('nav').css('display', 'none');
  }
});
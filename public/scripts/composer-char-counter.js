// $(document).ready(() => {
//   console.log('ready');
// })

$('#profilepic').on('click', () => alert('heya'));

$('#tweet-text').on('input', function() {
  const counterLength = 140 - $(this).val().length;
  const counter = $(this).siblings('.button-count').children('.counter');
  if (counterLength >= 0) {
    counter.css('color', '#545149');
  } else {
    counter.css('color', '#ea2929');
  }
  counter.html(counterLength);
});
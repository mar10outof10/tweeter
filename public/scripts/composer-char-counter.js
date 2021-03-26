$(document).ready(() => {
  // function displays counter length and changes colour if tweet length is valid or not
  $('#tweet-text').on('input', function() {
    const counterLength = 140 - $(this).val().length;
    const counter = $(this).siblings('.button-count').children('.counter');
    if (counterLength >= 0) {
      counter.css('color', '#545149'); // grey if valid tweet length
    } else {
      counter.css('color', '#ea2929'); // spooky red if invalid
    }
    counter.html(counterLength); // set counter === length of textarea.val()
  });
});
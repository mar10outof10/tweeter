/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// converts unix time value to amount of time passed since that time
const parseDate = date => {
  const millisecondsAgo = Date.now() - date;
  // seconds, minutes, hours, days
  if (millisecondsAgo < 60000) {
    if (Math.floor(millisecondsAgo / 1000) === 1) {
      return `1 second ago`;
    } else {
      return `${Math.floor(millisecondsAgo / 1000)} seconds ago`;
    }
  } else if (millisecondsAgo < 3600000) {
    if (Math.floor(millisecondsAgo / 60000) === 1) {
      return `1 minute ago`;
    } else {
      return `${Math.floor(millisecondsAgo / 60000)} minutes ago`;
    }
  } else if (millisecondsAgo < 86400000) {
    if (Math.floor(millisecondsAgo / 3600000) === 1) {
      return `1 hour ago`;
    } else {
      return `${Math.floor(millisecondsAgo / 3600000)} hours ago`;
    }
  } else {
    if (Math.floor(millisecondsAgo / 86400000) === 1) {
      return `Yesterday`;
    } else {
      return `${Math.floor(millisecondsAgo / 86400000)} days ago`;
    }
  }
}
// function avoids XSS by escaping string of problematic characters
const escapeString = str => {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = tweetObject => {
  const avatar = tweetObject.user.avatars;
  const name = tweetObject.user.name;
  const username = tweetObject.user.handle;
  const content = escapeString(tweetObject.content.text);
  const dateCreated = parseDate(tweetObject.created_at);

  const article = `
    <article class="tweet">
      <header class="tweet-header">
        <img class="avatar" src=${avatar}>
        <div class="name">${name}</div>
        <div class="username">${username}</div>
      </header>
      <div class="tweet-body">${content}</div>
      <footer class="tweet-footer">
        <div class="date-since">${dateCreated}</div>
        <div class="hyperlinks">
          <a>I</a><a>L</a><a>U</a>
        </div>
      </footer>
    </article>  
  `;

  const parsedArticle = $(article);
  
  return parsedArticle;
};

const renderTweets = tweetArray => {
  for (const tweet of tweetArray) {
    const tweetElement = createTweetElement(tweet);
    $('#tweet-container').prepend(tweetElement);
  }
}

const loadTweets = () => {
  $.ajax({
    url: '/tweets',
    method: 'GET'
  })
  .then(req => renderTweets(req));
}

$("#tweet-form").on ('submit', (function (event) {
  event.preventDefault();
  const value = $(this).serialize(); // returns text=[text in form]
  const url = $('#tweet-form').attr('action'); // /tweets
  const inputLength = $('#tweet-text').val().length;

  if (inputLength <= 0) {
    $('#tweet-error').slideDown();
    $('#tweet-error').text('⚠️ Error: tweet may not be empty.');
    return;
  } else if (inputLength > 140) {
    $('#tweet-error').slideDown();
    $('#tweet-error').text('⚠️ Error: tweet may not be greater than 140 characters.');
    return;
  }

  $('#tweet-error').slideUp();

  $.ajax({ 
    url: '/tweets',
    method: 'POST',
    data: value
  })
  .then((req) => { // POST to /tweets returns a tweet element as req
    $('#tweet-container').prepend(createTweetElement(req));
    $('.new-tweet').slideUp();
    $('#tweet-form').trigger("reset"); // resets form to empty
    $('.counter').html('140');
  });

}));

$('.write-tweet').on('click', () => {
  $('.new-tweet').slideDown();
});

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


loadTweets();
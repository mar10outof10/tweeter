/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
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

const createTweetElement = tweetObject => {
  const avatar = tweetObject.user.avatars;
  const name = tweetObject.user.name;
  const username = tweetObject.user.handle;
  const content = tweetObject.content.text;
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
    alert('Tweet may not be empty');
    return;
  } else if (inputLength > 140) {
    alert('Tweet may not be more than 140 characters');
    return;
  }

  $.ajax({ 
    url: '/tweets',
    method: 'POST',
    data: value
  })
  .then((req) => { // POST to /tweets returns a tweet element as req
    $('#tweet-container').prepend(createTweetElement(req));
    $('#tweet-form').trigger("reset"); // resets form to empty
    $('.counter').html('140');
  });
  
}));

loadTweets();
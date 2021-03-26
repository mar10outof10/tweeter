$(document).ready(() => {
  // gets current UNIX time and subtracts it from tweet creation date to return string of how long ago tweet was
  const parseDate = date => {
    const millisecondsAgo = Date.now() - date;
    console.log(millisecondsAgo);
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
  };

  // function avoids XSS by escaping string of problematic characters
  const escapeString = str => {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  // creates tweet object after post request is submitted through new tweet button
  const createTweetElement = tweetObject => {
    const avatar = tweetObject.user.avatars;
    const name = tweetObject.user.name;
    const username = tweetObject.user.handle;
    const content = escapeString(tweetObject.content.text); // content escaped to avoid xss
    const dateCreated = parseDate(tweetObject.created_at); // string `[time] ago`

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
  // renders existing tweets in order
  const renderTweets = tweetArray => {
    for (const tweet of tweetArray) {
      const tweetElement = createTweetElement(tweet);
      $('#tweet-container').prepend(tweetElement); // prepend results in most recent tweet on top
    }
  };
  // overall loading function
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
      .then(req => renderTweets(req));
  };
  // submits tweet written in form textarea
  $("#tweet-form").on('submit', (function(event) {
    event.preventDefault();
    const value = $(this).serialize(); // returns text=[text in form]
    const inputLength = $('#tweet-text').val().length;
  
    if (inputLength <= 0) { // check length to make sure tweet is valid
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

  loadTweets();

});
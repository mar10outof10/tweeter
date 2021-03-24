/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const createTweetElement = tweetObject => {
  const avatar = tweetObject.user.avatars;
  const name = tweetObject.user.name;
  const username = tweetObject.user.handle;
  const content = tweetObject.content.text;
  const dateCreated = tweetObject.created_at;

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
    $('#tweet-container').append(tweetElement);
  }
}

$("#tweet-form").submit(function (event) {
  event.preventDefault();
  const value = $(this).serialize(); // returns text=[text in form]
  const url = $('#tweet-form').attr('action'); // /tweets
  $.ajax({ 
    url: '/tweets',
    method: 'POST',
    data: value
  })
  .then((req) => {
    $('#tweet-container').prepend(createTweetElement(req));
  });
});


renderTweets(data);
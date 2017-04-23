/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(() => {

  // AJAX
  function ajax(url, method, data){
    return $.ajax({url, method, data});
  }

  // READ
  Handlebars.registerHelper('time_ago', (timestamp) => moment(timestamp).fromNow());
  const templateText = $('#tweet-template').text();
  // because is a function we can call it in map directly
  const tweetTemplate = Handlebars.compile(templateText);

  function renderTweets(tweets) {
    $('#tweets-container').empty()
                          .append(tweets.map(tweetTemplate));

    // LIKES
    $('.tweet img').on('click',function(event){
      $tweetId = $(this).closest('.tweet').data('tweetId');
      $likesSpan = $(this).next();
      $tweetLikes = $likesSpan.data('tweetLikes');
      ajax(`/tweet/${$tweetId}`,'PUT').then(function(){
        const totalLikes = $tweetLikes + 1;
        $likesSpan.data('tweetLikes', totalLikes);
        $likesSpan.text(totalLikes);
      });
    });
  }

  function loadTweets(){
     ajax('/tweets','GET').then(renderTweets);
  }

  loadTweets();

  // SHOW FORM FOR CREATING NEW TWEETS
  $('.compose').on('click', function(event){
    $('.new-tweet').slideToggle()
                   .find('textarea').focus();
  });

  // CREATE
  $('.new-tweet form').on('submit', function(event) {
      event.preventDefault();
      const $form  = $(this);
      const $tweetText = $form.find('textarea');
      const $tweetCounter = $form.find('.counter');
      if(!$tweetText.val()){
        $('#status').flash_message({
            text: "The tweet can't be empty",
            how: 'append'
        });
        return;
      }
      if($tweetText.val().length > 140){
        $('#status').flash_message({
            text: "Too many characters",
            how: 'append'
        });
       return;
      }
      ajax('/tweets','POST', $form.serialize()).then(() => {
          $form[0].reset();
          loadTweets();
      });
  });

});
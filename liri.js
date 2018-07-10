require('dotenv').config();
const http      = require('request'),
      keys      = require('./keys'),
      twitter   = require('twitter'),
      spotify   = require('node-spotify-api');

// Create variables to hold user input
const input     = process.argv,
      task      = input[2],
      parameter = input[3];


// Create object that holds all of the keys for spotify and twitter api
const spotifyKey = new spotify(keys.spotify);
const client = new twitter(keys.twitter);

const params = {
    screen_name: 'justinbieber',
    count: 10
}
if (task == 'my-tweets')
    client.get('statuses/user_timeline', params, function (error, tweet, response) {
        if (!error)
            console.log(tweet);

            tweet.forEach((element, index) => {

             console.log(tweet)
            });

         if (error)
            console.log(error);

    });

    /* 
    function myTweets() {
    let params = {
        screen_name: "Blizzard_Ent",
        count: 10
    };
    twitter.get("statuses/user_timeline", params, function (
        error,
        tweets,
        response
    ) {
        if (error) {
            console.log(error);
        } else {
            log('');
            log('');
            colorHeader('orange', '10 most recent tweets for', params.screen_name);

            tweets.forEach((element, index) => {

                colorHeader('yellowgreen', 'Tweet', index+1);
                //reformat date and time
                let dt = luxon.DateTime.fromFormat(element.created_at, 'EEE MMM dd HH:mm:ss ZZZ yyyy');
                dt = dt.toLocaleString(luxon.DateTime.DATETIME_FULL);

                log(wrap(dt + ': ' + element.text));
            });
            console.log('');
            console.log(chalk.keyword('lightblue').bold('TIP: ⌘  + Left-click links to open them in browser'));
            console.log('');
        }
    });
}
    */

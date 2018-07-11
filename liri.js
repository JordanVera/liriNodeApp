require('dotenv').config();
const fs      = require('fs'),
      Spotify = require('node-spotify-api'),
      Twitter = require('twitter'),
      request = require('request'),
      keys    = require('./keys.js'),
      chalk   = require('chalk'),
      luxon   = require('luxon'),
      wrap    = require('wordwrap')(4, 60);

let spotify = new Spotify(keys.spotify),
    twitter = new Twitter(keys.twitter),
    command = process.argv[2],
    query = process.argv[3];

function getTweets(){
    const params = {screen_name: 'justinbieber'};
    twitter.get('statuses/user_timeline', params, function(
        error,
        tweets,
        response) {
    
        if (error) {
            console.log(error);
        } else {

            let tweetCount = 0;
            
            tweets.forEach(element => {
                tweetCount ++
                let timeFormat = luxon.DateTime.fromFormat(element.created_at, 'EEE MMM dd HH:mm:ss ZZZ yyyy');
                timeFormat = timeFormat.toLocaleString(luxon.DateTime.DATETIME_FULL);
                console.log(wrap(`${timeFormat}: 
                 ${element.text}
                
                `));
            });
        }
    })
}

function getSpotify(query){
    if (query === undefined || query === null) {
        query = 'tunnel+vision+artist:kodak+black';
    } 

    spotify.search({type: 'track', query: query, limit: '3'}, function(error, data){
        if (!error) {
            let songs = data.tracks.items
            songs.forEach(element=> {
                console.log(
chalk`
{green Artist:}  ${element.artists[0].name}
{green Album:} ${element.album.name}
{green Song Name:} ${element.name}
{green Preview:} ${element.preview_url}`)

                if(element.preview_url === null) {
                    console.log('preview: No preview available \n')
                } 
            });
        }
    })
}

function getMovie(query) {
    if(query === undefined || query === null) {
        query = 'kill bill'
    }
    request(`https://www.omdbapi.com/?t=${query}&y=&plot=short&apikey=trilogy`, function(error, response, body){
        movieObj = JSON.parse(body);

        if (error) {
            console.log(error)
        } else {
                console.log(
chalk`
{green Title:}  ${movieObj.Title}
{green Release Date:} ${movieObj.Year}
{green IMDB Rateing:} ${movieObj.imdbRating}
{green Actors:} ${movieObj.Actors}
{green Plot:} ${movieObj.Plot}`);
        };
    });
};

function doThis(){
    fs.readFile('./random.txt', 'utf8', function(error, data){
        if(error){
            console.log(error);
        } else {
            query = data.split(',')
            getSpotify(query[1])
        }
    })
}


switch (command) {
    case 'my-tweets': 
    getTweets();
    break;
    case 'spotify-this-song': 
    getSpotify(query);
    break;
    case 'movie-this': 
    getMovie(query);
    break;
    case 'do-what-it-says': 
    doThis();
    break;
    default: return console.log('that is not an accepted input');
}
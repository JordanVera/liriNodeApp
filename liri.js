require('dotenv').config();
const keys = require('keys.js');

const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

console.log(spotify);
console.log(client);
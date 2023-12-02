const SpotifyApi = require('@spotify/web-api-ts-sdk')
const express = require("express");
const app = express();




const spotifyAuth = async (req,res)=>{
    const auth = {
      token: process.env.SPOTIFY_TOKEN,
      secret:process.env.SPOTIFY_SECRET,
    };


const client_id = auth.token; 
const client_secret = auth.secret;

async function getToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: new URLSearchParams({
      'grant_type': 'client_credentials',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
    },
  });

  return await response.json();
}

async function getTrackInfo(access_token) {
    //TODO change name
  const response = await fetch(
    "https://api.spotify.com/v1/users/Clarence Edward/playlists",
    {
      method: "GET",
      headers: { Authorization: "Bearer " + access_token },
    }
  );

  return await response.json();
}

getToken().then(response => {
  getTrackInfo(response.access_token).then(profile => {
    console.log(profile)
  })
});
    
    data = getToken()
    console.log(data)
    }
 



    



//TODO create a post request for this in another spot then use that as auth
module.exports = { spotifyAuth };
const SpotifyApi = require('@spotify/web-api-ts-sdk')
const express = require("express");
const app = express();




const spotifyAuth = async (req,res)=>{
  const auth = {
    token: process.env.SPOTIFY_TOKEN,
    secret: process.env.SPOTIFY_SECRET,
  };

  const client_id = auth.token;
  const client_secret = auth.secret;

  async function getToken() {
    // generate token 
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
    });

    return await response.json();
  }
  // api call to playlist
  //https://api.spotify.com/v1/users/{user_id}
  async function getTrackInfo(access_token) {
    const username = "22rhj2mcszox72nnewbr4swri";
    const response = await fetch(
      // Endpoint
      `https://api.spotify.com/v1/users/${username}/playlists?limit=50&offset=0`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + access_token },
      }
    );

    return await response.json();
  }
  //==================================>

  async function fetchPlaylist() {
    try {
      const response = await getToken();
      const profile = await getTrackInfo(response.access_token);

      const playlists = profile.items.map((playlist) => ({
        name: playlist.name,
        src: playlist.tracks.href,
      }));
      getSongs(playlists)
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  // Call the async function
  fetchPlaylist();

  //==========================>
async function getSongs(songs) {
  try {
    const songDataArray = await Promise.all(
      songs.map(async (src) => {
        try {
          const token = await getToken();
          const response = await fetch(src.src, {
            method: "GET",
            headers: { Authorization: "Bearer " + token.access_token },
          });

          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }

          const responseData = await response.json();
          return responseData; // Accumulate the data
        } catch (e) {
          console.log("An error has occurred: " + e);
          return null; // Handle the error, or return a default value
        }
      })
    );

    // songDataArray now contains the data from all responses
    const data = songDataArray.map((data) => data.items);
    console.log("===================> data");
    const songAndArtistData = data.map((data)=>{

        const songName = data.map((data) => data.track.name);
        const artist = data.map((data) => data.track.artists);
       
        songAndArtist = {
          spotifyArtistandSong: [songName, artist],
        };

        //!Logic returns hrere
        //TODO get name of play list
        console.log(songAndArtist);
        return songAndArtist;
    });
    // how to get name =====> data[0].track.name
    //how to get artist =====> data[0].track.artists[0]
    return songAndArtistData;
  } catch (e) {
    console.log("An error has occurred: " + e);
    return null; // Handle the error, or return a default value
  }
}
}
 



    



//TODO create a post request for this in another spot then use that as auth
module.exports = { spotifyAuth };
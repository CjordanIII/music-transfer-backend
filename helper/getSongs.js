
const getToken = require('./getToken')

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
    console.log("===================> get songs data");
    const songAndArtistData = data.map((data) => {
      const songName = data.map((data) => data.track.name);
      const artist = data.map((data) => data.track.artists);

      const songAndArtist = {
        songName: songName,
        artist: artist,
      };

      return songAndArtist;
    });

    const playlistName = songs.map((data) => data.name);
    //created playlist data
    const playlist = {
      playlistName: playlistName,
      songName: songAndArtistData.map((data) => data.songName),
      artist: songAndArtistData.map((data) => data.artist),
    };
    //!Logic returns here
  
    return playlist;
  } catch (e) {
    console.log("An error has occurred: " + e);
    return null; // Handle the error, or return a default value
  }
}

module.exports = (getSongs);
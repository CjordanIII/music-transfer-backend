

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

  module.exports = (getTrackInfo);
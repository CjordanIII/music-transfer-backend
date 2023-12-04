
const getSongs = require('./getSongs')
const getToken = require('./getToken')
const getTrackInfo = require('./getTrackInfo')

  async function fetchPlaylist() {
    try {
      const response = await getToken();
      const profile = await getTrackInfo(response.access_token);

      const playlists = profile.items.map((playlist) => ({
        name: playlist.name,
        src: playlist.tracks.href,
      }));
      getSongs(playlists);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  module.exports = (fetchPlaylist);


const fetchPlaylist = require('../helper/fetchPlaylist')

const spotifyAuth = async (req,res)=>{
  fetchPlaylist();
}
 



    



//TODO create a post request for this in another spot then use that as auth
module.exports = { spotifyAuth };
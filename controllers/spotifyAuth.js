
const fetchPlaylist = require('../helper/fetchPlaylist')

const spotifyAuth = async (req,res)=>{

  try{
      const playlistData = await fetchPlaylist();
      res.status(200).send(playlistData);
  }catch(e){
    console.log("spotifyAuth.js error",e)
  }
}
 



    



//TODO create a post request for this in another spot then use that as auth
module.exports = { spotifyAuth };
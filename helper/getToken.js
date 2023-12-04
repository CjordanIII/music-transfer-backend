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
        Buffer.from(
          process.env.SPOTIFY_TOKEN + ":" + process.env.SPOTIFY_SECRET
        ).toString("base64"),
    },
  });

  return await response.json();
}

module.exports = (getToken)
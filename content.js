// ============================================================
// SITE CONTENT: edit this file to change what the site says.
// Anything left as "" or with [BRACKETS] shows as a placeholder.
// ============================================================
window.SITE = {
  name: "Spang Aerials",

  // Which film loops at the top of the page: "scotland" or "wyoming"
  heroFilm: "scotland",

  // video / video4k / poster: self-hosted files in /media (used instead of YouTube when set)
  // youtubeId = the part after watch?v= in the YouTube URL (fallback)
  films: [
    {
      key: "scotland",
      place: "Scotland",
      country: "United Kingdom",
      when: "Summer 2026",
      runtime: "0:23",
      video: "media/scotland-720.mp4",
      video4k: "media/scotland-1080.mp4",
      poster: "media/scotland-poster.jpg",
      youtubeId: "9yStl9l6Mik",
      blurb: "Five castles, two tents, one very judgmental herd of sheep. Louie and I drove from Edinburgh into the Highlands, caught a ferry off the west coast, and camped beside a castle ruin on the remote Isle of Kerrera. The fish and chips on the way up are still one of the best meals of my life."
    },
    {
      key: "wyoming",
      place: "The West",
      country: "Wyoming · South Dakota · Minnesota",
      when: "Summer 2026",
      runtime: "0:23",
      video: "media/west-720.mp4",
      video4k: "media/west-1080.mp4",
      poster: "media/west-poster.jpg",
      youtubeId: "8u2hW86oaec",
      blurb: "Bailey had a truck and a route to Minneapolis. I had a drone and nowhere better to be. We rolled into the Badlands after dark and found out over coffee the next morning that we'd parked at the edge of \"the Wall.\""
    }
  ],

  comingSoon: { place: "Porto, Portugal", when: "In the edit" },

  // Put photos in the /images folder, then list them here.
  // shape: "wide" (16:9), "square" (1:1) or "tall" (4:5)
  stills: [
    { src: "images/kerrera-coast.jpg", place: "Isle of Kerrera, Scotland", shape: "wide" },
    { src: "images/gylen-camp.jpg", place: "Camp at Gylen Castle, Kerrera", shape: "wide" },
    { src: "images/scotland-glencoe.jpg", place: "Glen Coe, Scotland", shape: "wide" },
    { src: "images/inveraray-castle.jpg", place: "Inveraray Castle, Scotland", shape: "wide" },
    { src: "images/porto-river.jpg", place: "Douro River, Porto", shape: "wide" },
    { src: "images/porto-bridge.jpg", place: "Dom Luís I Bridge, Porto", shape: "wide" },
    { src: "images/wyoming-devils-tower.jpg", place: "Devils Tower, Wyoming", shape: "wide" },
    { src: "images/badlands.jpg", place: "Badlands, South Dakota", shape: "wide" }
  ],

  about: "Some friendships are built in one place and then scattered by the roads that carry everyone onward. Right now, we're all moving into the next stage of life, and the time we get together is getting shorter. These films are my way of making it count: one trip, one friend, each from a different chapter of my life. From the air you can see what you miss on the ground, the river that divides a valley and the road that crosses it anyway.",

  gear: [
    ["Drone", "DJI Mini 4K"],
    ["Based in", "New York"]
  ],

  // Leave a url as "" to hide that button
  links: {
    email: "wsspang@gmail.com",
    instagram: "https://www.instagram.com/instaspang/",
    youtube: ""
  }
};

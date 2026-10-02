// ============================================================
// SITE CONTENT: edit this file to change what the site says.
// Anything left as "" or with [BRACKETS] shows as a placeholder.
// ============================================================
window.SITE = {
  name: "Spang Aerials",

  // Which film loops at the top of the page: "scotland" or "wyoming"
  heroFilm: "scotland",

  // youtubeId = the part after watch?v= in the YouTube URL
  films: [
    {
      key: "scotland",
      place: "Scotland",
      country: "United Kingdom",
      when: "Summer 2026",
      runtime: "0:23",
      youtubeId: "9yStl9l6Mik",
      blurb: "[Two lines on Scotland: the light, the moment, why you went.]"
    },
    {
      key: "wyoming",
      place: "Wyoming",
      country: "United States",
      when: "Summer 2026",
      runtime: "0:23",
      youtubeId: "8u2hW86oaec",
      blurb: "[Two lines on Wyoming: the light, the moment, why you went.]"
    }
  ],

  comingSoon: { place: "Porto, Portugal", when: "In the edit" },

  // Put photos in the /images folder, then list them here.
  // shape: "wide" (3:2), "square" (1:1) or "tall" (4:5)
  stills: [
    { src: "images/scotland-glencoe.jpg", place: "Glen Coe, Scotland", shape: "wide" },
    { src: "images/porto-river.jpg", place: "Douro River, Porto", shape: "wide" },
    { src: "images/porto-bridge.jpg", place: "Dom Luís I Bridge, Porto", shape: "wide" }
  ],

  about: "",

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

// ============================================================
// SITE CONTENT: edit this file to change what the site says.
// Anything left as "" or with [BRACKETS] shows as a placeholder.
// ============================================================
window.SITE = {
  name: "[YOUR NAME]",

  // Which film loops at the top of the page: "scotland" or "wyoming"
  heroFilm: "scotland",

  // youtubeId = the part after watch?v= in the YouTube URL
  films: [
    {
      key: "scotland",
      place: "Scotland",
      country: "United Kingdom",
      when: "Summer 2026",
      runtime: "0:2X",
      youtubeId: "9yStl9l6Mik",
      blurb: "[Two lines on Scotland: the light, the moment, why you went.]"
    },
    {
      key: "wyoming",
      place: "Wyoming",
      country: "United States",
      when: "Summer 2026",
      runtime: "0:2X",
      youtubeId: "8u2hW86oaec",
      blurb: "[Two lines on Wyoming: the light, the moment, why you went.]"
    }
  ],

  comingSoon: { place: "[Next place]", when: "In the edit" },

  // Put photos in the /images folder, then list them here.
  // shape: "wide" (3:2), "square" (1:1) or "tall" (4:5)
  stills: [
    { src: "", place: "Scotland", shape: "wide" },
    { src: "", place: "Wyoming", shape: "wide" },
    { src: "", place: "Scotland", shape: "square" },
    { src: "", place: "Wyoming", shape: "square" },
    { src: "", place: "Scotland", shape: "wide" },
    { src: "", place: "Wyoming", shape: "wide" }
  ],

  about: "",

  gear: [
    ["Drone", "[DRONE MODEL]"],
    ["Edit & grade", "[SOFTWARE]"],
    ["Based in", "New York"]
  ],

  // Leave a url as "" to hide that button
  links: {
    email: "",
    instagram: "",
    youtube: ""
  }
};

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
      blurb: "Two old friends, single-track roads and weather that changed by the hour. On a remote island off Oban, a castle ruin and a tent at dusk."
    },
    {
      key: "wyoming",
      place: "The West",
      country: "Wyoming · South Dakota · Minnesota",
      when: "Summer 2026",
      runtime: "0:23",
      youtubeId: "8u2hW86oaec",
      blurb: "We drove into the Badlands after dark with no idea what was out there. In the morning, over coffee, the Wall was just there, as if it had been waiting."
    }
  ],

  comingSoon: { place: "Porto, Portugal", when: "In the edit" },

  // Put photos in the /images folder, then list them here.
  // shape: "wide" (16:9), "square" (1:1) or "tall" (4:5)
  stills: [
    { src: "images/wyoming-devils-tower.jpg", place: "Devils Tower, Wyoming", shape: "wide" },
    { src: "images/edinburgh-castle-rock.jpg", place: "Edinburgh Castle, Scotland", shape: "wide" },
    { src: "images/scotland-glencoe.jpg", place: "Glen Coe, Scotland", shape: "wide" },
    { src: "images/kerrera-coast.jpg", place: "Isle of Kerrera, Scotland", shape: "wide" },
    { src: "images/edinburgh-castle.jpg", place: "Edinburgh, Scotland", shape: "wide" },
    { src: "images/kerrera-tower.jpg", place: "Gylen Castle at dusk", shape: "wide" },
    { src: "images/inveraray-river.jpg", place: "Inveraray Castle, Scotland", shape: "wide" },
    { src: "images/inveraray-castle.jpg", place: "Inveraray, Argyll", shape: "wide" },
    { src: "images/inveraray-bridge.jpg", place: "Aray Bridge, Inveraray", shape: "wide" },
    { src: "images/porto-river.jpg", place: "Douro River, Porto", shape: "wide" },
    { src: "images/porto-bridge.jpg", place: "Dom Luís I Bridge, Porto", shape: "wide" }
  ],

  about: "Some friendships are built in one place and then scattered by the roads that carry everyone onward. These films are about finding the way back: one trip, one friend, each from a different chapter of my life. From the air you can see what you miss on the ground, the river that divides a valley and the road that crosses it anyway.",

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

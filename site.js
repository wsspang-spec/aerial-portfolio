(function () {
  var S = window.SITE || {};
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var validId = function (id) { return /^[A-Za-z0-9_-]{6,20}$/.test(id || ""); };

  function embed(id, opts) {
    var p = "autoplay=1&mute=1&loop=1&playlist=" + id + "&controls=" + (opts.controls ? 1 : 0) +
      "&playsinline=1&rel=0&modestbranding=1";
    return '<iframe src="https://www.youtube-nocookie.com/embed/' + id + "?" + p +
      '" title="' + esc(opts.title) + '" loading="' + (opts.lazy ? "lazy" : "eager") +
      '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
  }
  function placeholder(text) {
    return '<span class="ph">[ ' + esc(text) + " ]</span>";
  }

  // Name
  if (S.name) { $("brand-name").textContent = S.name; $("footer-name").textContent = S.name; }
  $("year").textContent = new Date().getFullYear();

  // Hero reel: sharper file on large screens, lighter file on phones / data saver
  var films = S.films || [];
  var hv = $("hero-video");
  if (hv) {
    var c = navigator.connection || {};
    var big = window.innerWidth * (window.devicePixelRatio || 1) > 1400 && !c.saveData;
    if (big) { hv.querySelector("source").src = "media/hero-1440.mp4"; hv.load(); }
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) { hv.removeAttribute("autoplay"); hv.pause(); }
    var p = hv.play && hv.play(); if (p && p.catch) p.catch(function () {});
  }

  // Films
  $("film-list").innerHTML = films.map(function (f, i) {
    var num = String(i + 1).padStart(2, "0");
    var media = validId(f.youtubeId)
      ? embed(f.youtubeId, { title: f.place + " aerial film", controls: true, lazy: true })
      : placeholder(f.place + " film");
    var watch = validId(f.youtubeId)
      ? '<a class="text-link" href="https://www.youtube.com/watch?v=' + f.youtubeId + '" target="_blank" rel="noopener">Play with sound →</a>'
      : "";
    return '<article class="film' + (i % 2 ? " flip" : "") + '">' +
      '<div class="frame">' + media + "</div>" +
      '<div class="film-text">' +
      '<span class="num">' + num + "</span>" +
      "<h3>" + esc(f.place) + "</h3>" +
      '<p class="label">' + esc([f.country, f.when, f.runtime].filter(Boolean).join(" · ")) + "</p>" +
      '<p class="blurb">' + esc(f.blurb) + "</p>" + watch +
      "</div></article>";
  }).join("");

  // Coming soon
  var c = S.comingSoon || {};
  $("coming-num").textContent = String(films.length + 1).padStart(2, "0") + " · Coming soon";
  if (c.place) $("coming-place").textContent = c.place;
  if (c.when) $("coming-when").textContent = c.when;

  // Stills
  $("stills-grid").innerHTML = (S.stills || []).filter(function (s) { return s.src; }).map(function (s) {
    var inner = s.src
      ? '<img src="' + esc(s.src) + '" alt="Aerial photo, ' + esc(s.place) + '" loading="lazy">'
      : placeholder("Photo · " + s.place);
    return '<figure class="still ' + esc(s.shape || "wide") + '"><div class="frame">' + inner +
      "</div><figcaption>" + esc(s.place) + " · Summer 2026</figcaption></figure>";
  }).join("");

  // About + gear
  if (S.about) $("about-text").textContent = S.about;
  $("gear").innerHTML = (S.gear || []).map(function (g) {
    return "<div><dt>" + esc(g[0]) + "</dt><dd>" + esc(g[1]) + "</dd></div>";
  }).join("");

  // Contact
  var L = S.links || {};
  var btns = [];
  if (L.email) btns.push('<a class="btn btn-solid" href="mailto:' + esc(L.email) + '">' + esc(L.email) + "</a>");
  if (L.instagram) btns.push('<a class="btn" href="' + esc(L.instagram) + '" target="_blank" rel="noopener">Instagram</a>');
  if (L.youtube) btns.push('<a class="btn" href="' + esc(L.youtube) + '" target="_blank" rel="noopener">YouTube</a>');
  if (!btns.length) btns.push('<span class="btn btn-solid">[EMAIL]</span><span class="btn">Instagram</span><span class="btn">YouTube</span>');
  $("contact-links").innerHTML = btns.join("");
  if (L.instagram) $("coming-link").href = L.instagram;
})();

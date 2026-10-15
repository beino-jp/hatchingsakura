(function(){
  /* ▼ LINE公式アカウントのURLが決まったら、この1行だけ書き換えてください */
  var LINE_URL = "";

  if (LINE_URL) {
    document.querySelectorAll("[data-line]").forEach(function(a){
      a.href = LINE_URL;
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  var head = document.querySelector(".site-head");
  var onScroll = function(){ head.dataset.stuck = window.scrollY > 8 ? "true" : "false"; };
  onScroll();
  window.addEventListener("scroll", onScroll, {passive:true});

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  toggle.addEventListener("click", function(){
    var open = nav.dataset.open === "true";
    nav.dataset.open = open ? "false" : "true";
    toggle.setAttribute("aria-expanded", open ? "false" : "true");
    toggle.textContent = open ? "MENU" : "CLOSE";
  });
  nav.addEventListener("click", function(e){
    if (e.target.tagName === "A" && window.innerWidth <= 1040) {
      nav.dataset.open = "false";
      toggle.setAttribute("aria-expanded","false");
      toggle.textContent = "MENU";
    }
  });

  var items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach(function(el){ el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, {rootMargin:"0px 0px -12% 0px", threshold:.08});
    items.forEach(function(el){ io.observe(el); });
  }
})();

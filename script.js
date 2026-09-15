document.addEventListener("DOMContentLoaded",()=>{
  // Wystarczy podmienić placeholder w HTML na:
  // <img src="images/photo-01.jpg" alt="Opis zdjęcia">
  // Skrypt automatycznie obsłuży powiększanie zdjęć.
  const lightbox=document.querySelector(".lightbox");
  const lightImg=lightbox.querySelector("img");
  const close=()=>{lightbox.classList.remove("active");document.body.style.overflow=""};
  document.querySelectorAll(".photo-card").forEach(card=>{
    card.addEventListener("click",()=>{
      const img=card.querySelector("img");
      if(!img) return;
      lightImg.src=img.src; lightImg.alt=img.alt||"";
      lightbox.classList.add("active"); document.body.style.overflow="hidden";
    });
  });
  lightbox.querySelector("button").addEventListener("click",close);
  lightbox.addEventListener("click",e=>{if(e.target===lightbox)close()});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
  const reveal=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity="1";e.target.style.transform="translateY(0)";reveal.unobserve(e.target)}})
  },{threshold:.08});
  document.querySelectorAll(".photo-card,.about-grid,.service-row").forEach(el=>{
    el.style.opacity="0";el.style.transform="translateY(25px)";el.style.transition="opacity .8s ease,transform .8s ease";
    reveal.observe(el);
  });
});

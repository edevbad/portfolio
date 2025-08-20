const scroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
});
gsap.registerPlugin(ScrollTrigger) 

// each time Locomotive Scroll updates, tell ScrollTrigger
scroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use Locomotive's scroll
ScrollTrigger.scrollerProxy("[data-scroll-container]", {
  scrollTop(value) {
    return arguments.length
      ? scroll.scrollTo(value, 0, 0)
      : scroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0, left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  pinType: document.querySelector("[data-scroll-container]").style.transform
    ? "transform"
    : "fixed"
});


// Add click event to links
document.querySelectorAll("[data-scroll-to]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      scroll.scrollTo(target); // Locomotive's built-in scroll method
    }
  });
});
setTimeout(() => {
  scroll.update();
}, 300);


  // Always refresh after setup
ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();

function page1Anim() {
  let boundingElem = document.querySelectorAll(".boundingElem");
  let t1 = gsap.timeline();

   t1.to(".about-img", {
    opacity : 1,
    duration: 2,
    ease: "expo.inOut",
  });
  t1.to("nav", {
    y: "0",
    delay:-2 ,
    duration: 0.8,
    ease: Expo.easeInOut,
  });
  t1.to(boundingElem, {
    y: "0",
    delay : -1.5,
    stagger: 0.3,
    duration: 0.8,
    ease: Expo.easeInOut,
  });
  t1.to(".boundingSocials", {
    x: "0",
    delay : -1,
    ease: Expo.easeInOut,
    duration: 0.8,
    stagger: 0.1,
  });

  let t2 = gsap.timeline({
    scrollTrigger: {
      trigger: "#skills",   // the section/container
      scroller: "[data-scroll-container]", 
      start: "top 80%",    // when section enters viewport
      toggleActions: "play none none none", 
      // play once, don’t repeat
    }
  });
  t2.to(".chip",{
    y:'0',
    opacity:'1',
    duration:0.5,
    stagger:0.1,
  })
}


function menu() {
const menuBtn = document.querySelector(".nav-menu-btn");
const navMenu = document.querySelector(".nav-menu");
const menuCross = document.querySelector(".menu-cross");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuCross.classList.toggle("active");
});

}


document.getElementById("year").textContent = new Date().getFullYear();
const hrefs = ["https://poplynk.onrender.com"];
let mouseX;
let mouseY;

function mouseFollower() {
  let circle = document.querySelector("#minicircle");
  window.addEventListener("mousemove", (dets) => {
    mouseX = dets.clientX;
    mouseY = dets.clientY;
    circle.style.opacity = "1";
    circle.style.top = `${dets.clientY - 20}px`;
    circle.style.left = `${dets.clientX - 31}px`;
  });
}

function elements() {
  let minicircle = document.querySelector("#minicircle");

  const elems = document.querySelectorAll(".elem");

  elems.forEach((elem, index) => {
    const img = elem.querySelector(".hover-img");
    let rotate = 0;
    let diffX = 0;

    elem.addEventListener("mousemove", (e) => {
      const rect = elem.getBoundingClientRect();
      const relX = mouseX - rect.left;
      const relY = mouseY - rect.top;

      const imgWidth = img.offsetWidth;
      const imgHeight = img.offsetHeight;

      diffX = mouseX - rotate;
      rotate = mouseX;

      gsap.to(img, {
        opacity: 1,
        ease: Power1.easeOut,
        duration: 0.2,
        top: relY - imgHeight / 2,
        left: relX - imgWidth / 2,
        rotate: gsap.utils.clamp(-20, 20, diffX * 0.5),
      });

      minicircle.innerHTML = `<a href = "${hrefs[index]}">view</a>`;

      minicircle.style.color = "black";
      minicircle.style.transform = "scale(1)";
    });

    elem.addEventListener("mouseleave", () => {

      minicircle.style.color = "white";
      minicircle.style.transform = "scale(0.2)";
      gsap.to(img, {
        opacity: 0,
        duration: 0.3,
      });
    });
  });
}
menu();
page1Anim();
mouseFollower();
elements();

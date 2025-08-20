

const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});

let copy = document.querySelector(".logos-slide").cloneNode(true);
document.querySelector(".logos").appendChild(copy);


function page1Anim(){
    let t1 = gsap.timeline();

    t1.to(".boundingelemdown",{
        y : '0',
        duration : 1,
        stagger : 0.2,
        delay : -0.2,
        ease : Expo.easeInOut
    })
    t1.to(".boundingelemup",{
        y : '0',
        duration : 1,
        stagger : 0.2,
        delay : -0.2,
        ease : Expo.easeInOut
    })
    t1.from(".herofooter",{
        opacity : 0,
        duration : 0.5,
        delay : -0.45,
        ease : Expo.easeInOut
    })
}
let mouseX=0;
let mouseY=0;
function updateMinicircle(xscale,yscale) {
    let minicircle = document.querySelector('.minicircle');
    const scrollY = scroll.scroll.instance.scroll.y;
    minicircle.style.transform = `translate(${mouseX - 4}px, ${mouseY + scrollY - 4}px) scale(${xscale}, ${yscale})`;
}
function skewmousefollower(){
    let xscale = 0;
    let yscale = 0;
    let xprev = 0 ;
    let yprev = 0;
    let timeout;

    window.addEventListener("mousemove",(dets)=>{
        mouseX = dets.x;
        mouseY = dets.y;
        clearTimeout(timeout);
        xscale = gsap.utils.clamp(0.8,1.2,dets.x - xprev);
        yscale = gsap.utils.clamp(0.8,1.2,dets.y - yprev);
        xprev = dets.x;
        yprev = dets.y;
        
        updateMinicircle(xscale,yscale);

        timeout = setTimeout(() => {
        
        updateMinicircle(1,1);
            
        }, 100);

    })
}
scroll.on("scroll", () => {
    updateMinicircle(1,1);
});
function elements() {
    const elems = document.querySelectorAll('.elem');

    elems.forEach(elem => {
        const img = elem.querySelector("img");
        let rotate = 0;
        let diffX = 0;

        elem.addEventListener("mousemove", (e) => {
            const rect = elem.getBoundingClientRect();
            const relX = e.clientX - rect.left;
            const relY = e.clientY - rect.top;

            const imgWidth = img.offsetWidth;
            const imgHeight = img.offsetHeight;

            diffX = e.clientX - rotate;
            rotate = e.clientX;
            gsap.to(img, {
                opacity: 1,
                ease: Power1.easeOut,
                duration: 0.2,
                top: relY - imgHeight / 2,
                left: relX - imgWidth / 2,
                rotate : gsap.utils.clamp(-20,20,diffX*0.5)
            });
        });

        elem.addEventListener("mouseleave", () => {
            gsap.to(img, {
                opacity: 0,
                duration: 0.3
            });
        });
    });
}





elements();
skewmousefollower();
page1Anim()
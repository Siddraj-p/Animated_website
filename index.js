function scroll(){
  
gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
scroll();

function cursor(){
    var page1content = document.querySelector(".content")
    var cursor =  document.querySelector(".cursor");
    page1content.addEventListener('mousemove',function(aaa){
        // cursor.style.left = aaa.x + "px";
        // cursor.style.top = aaa.y + "px";
        // cursor.style.scale=1
        gsap.to(cursor,{
            x:aaa.x,
            y:aaa.y
        })
    })
    
    page1content.addEventListener('mouseenter',function(){
        // cursor.style.scale = 1
        opacity=1
        gsap.to(cursor,{scale:1})
    })
    page1content.addEventListener('mouseleave',function(){
        gsap.to(cursor,{scale:0})
        opacity=0
        // cursor.style.scale = 0
    })  
}
cursor();


gsap.registerPlugin(ScrollTrigger);

// Select all target elements
const textElements = gsap.utils.toArray('.page2 .middle p');

// Animate all elements together with stagger
gsap.fromTo(
  textElements,
  {
    opacity: 0,
    y: 70, 
    },
  {
    scale:1,
    opacity: 1, // Fully visible
    y: 0, // Move to original position
    duration: 0.3 , // Animation duration
    ease: 'power1.out',
    stagger: 0.2, // 0.2 seconds between each element's animation
    scrollTrigger: {
      trigger: '.page2 .middle', // Trigger the animation when this section is in view
      start: 'top 80%', // Start animation when .middle top is 85% down the viewport
      end: 'top 10%', // Animation continues until the section's bottom is 50% up
      // scrub: 1, // Smooth scrolling animation is disabled
      markers: false, // Enable for debugging
      toggleActions: 'play reverse play reverse',
    },
  }
);



let gett = document.querySelector('.content .center h1');
let getWord = gett.textContent;
let splt =  getWord.split('');
let stores =''
splt.forEach(function(e) {
 stores+= `<span>${e}</span>`
});
gett.innerHTML = stores

gsap.from(' span ',{
 y:100,
 opacity:0,
 delay:0.5,
 duration:0.5,
 stagger:1
})

gsap.registerPlugin(ScrollTrigger); // Ensure ScrollTrigger is registered

gsap.to('.page3 h1', {
 transform:'translate(-100)', // Moves horizontally by 100px
 duration:0.5,
  scrollTrigger: {
    trigger: '.page3', // The element triggering the animation
    scrub: 1,            // Smooth scrubbing effect
    pin: true,           // Pins the element during the animation
    markers: true,       // Shows markers for debugging
    start: "top 90%", // Animation starts when top of '.page3 h1' hits the center of the viewport
    end: "bottom top",   // Animation ends when bottom of '.page3 h1' hits the top of the viewport
    },
});

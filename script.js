const words=[
"Full Stack Developer",
"JavaScript Developer",
"Cloud Enthusiast"
];

let i=0;

function typingEffect(){

let word=words[i].split("");

function loop(){

if(word.length>0){
document.querySelector(".typing").innerHTML+=word.shift();
setTimeout(loop,150);
}
else{
deletingEffect();
}

}

loop();
} 

function deletingEffect(){

let word=words[i].split("");

function loop(){

if(word.length>0){
word.pop();
document.querySelector(".typing").innerHTML=word.join("");
setTimeout(loop,100);
}
else{
i++;
if(i>=words.length){i=0;}
typingEffect();
}

}

loop();
}

typingEffect();




VanillaTilt.init(document.querySelectorAll(".tilt"),{
max:25,
speed:400,
glare:true,
"max-glare":0.3
});


// Cursor highlight

const cursor=document.querySelector(".cursor");

document.addEventListener("mousemove",e=>{
cursor.style.top=e.clientY+"px";
cursor.style.left=e.clientX+"px";
});


// Particle background

particlesJS("particles-js",{
particles:{
number:{value:80},
size:{value:3},
color:{value:"#38bdf8"},
line_linked:{enable:true,color:"#38bdf8"},
move:{speed:2}
}
});

// SCROLL REVEAL

const sections = document.querySelectorAll("section");

function revealSections(){

const trigger = window.innerHeight * 0.85;

sections.forEach(section =>{

const top = section.getBoundingClientRect().top;

if(top < trigger){
section.classList.add("show");
}

});

}

window.addEventListener("scroll", revealSections);
revealSections();


// NAVBAR ACTIVE LINK

const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", ()=>{

let current = "";

sections.forEach(section=>{

const sectionTop = section.offsetTop - 100;

if(pageYOffset >= sectionTop){
current = section.getAttribute("id");
}

});

navLinks.forEach(a=>{
a.classList.remove("active");
if(a.getAttribute("href") === "#" + current){
a.classList.add("active");
}
});

});


// CURSOR HOVER EXPAND

const links=document.querySelectorAll("a,button");

links.forEach(link=>{

link.addEventListener("mouseenter",()=>{
cursor.style.transform="translate(-50%, -50%) scale(1.4)";
});

link.addEventListener("mouseleave",()=>{
cursor.style.transform="translate(-50%, -50%) scale(1)";
});

});


// Smooth scroll for navbar links

document.querySelectorAll('nav a').forEach(anchor => {

anchor.addEventListener('click', function (e) {

e.preventDefault();

document.querySelector(this.getAttribute('href')).scrollIntoView({
behavior: 'smooth'
});

});

});

ScrollReveal().reveal('#about', {
distance: '60px',
duration: 1200,
origin: 'bottom'
});

ScrollReveal().reveal('#skills', {
distance: '60px',
duration: 1200,
origin: 'bottom',
delay: 200
});

ScrollReveal().reveal('#projects', {
distance: '60px',
duration: 1200,
origin: 'bottom',
delay: 300
});

ScrollReveal().reveal('#contact', {
distance: '60px',
duration: 1200,
origin: 'bottom',
delay: 400
});
function liItemClick() {
    let aItems = document.querySelectorAll('#navullist>li>a');
    for (let i = 0; i < aItems.length; i++) {
        aItems[i].classList = "nav-link";
    }

    
    this.classList = "nav-link active";

    let mobHeader = document.querySelector(".mob-header");
    let headerElement = document.getElementById("mySidepanel");
    if (mobHeader.clientHeight > 0) {
        headerElement.classList.remove("header-left-show");
    }
}

let liItems = document.querySelectorAll('#navullist>li>a');

for (let i = 0; i < liItems.length; i++ ) {
    liItems[i].addEventListener("click", liItemClick);
}


let mainNavLinks = document.querySelectorAll("header ul li a");
let mainSections = document.querySelectorAll("main section");

let lastId;
let cur = [];

window.addEventListener("scroll", event => {
    let fromTop = window.scrollY;
  
    mainNavLinks.forEach(link => {
      let section = document.querySelector(link.hash);
  
      if (
        section.offsetTop <= (fromTop + 1) &&
        section.offsetTop + section.offsetHeight > (fromTop + 1)
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
});

function showGif() {
    if (document.getElementById("loading").style.display == "none" ) {
        document.getElementById("loading").style.display = "block"
    } else {
        document.getElementById("loading").style.display = "none"
    }     
}

window.onload = (event) => {
     setTimeout(() => {
        document.getElementById("loading").style.display = "none"; 
    }, 100);    
};

(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();

function validateMyFields() {
    let subj = document.getElementById("subject").value;
    if (subj == "") {
        document.getElementById("subject-alert").innerText = "Custom Alert!!! You MUST enter subject!";
    } else {
        document.getElementById("subject-alert").innerText = "";
    }
}

function AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
    }
}
  
function RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);     
      }
    }
    element.className = arr1.join(" ");
}


let btns = document.querySelectorAll('portfolio-filter>nav>nav-item');
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}



function opencloseNav() { 
    let headerElement = document.getElementById("mySidepanel");
    if (headerElement.clientWidth <= 0) {
        headerElement.classList.add("header-left-show");
    } else {
        headerElement.classList.remove("header-left-show");
    }
}




let element = document.querySelector('#home-link');
element.addEventListener("click", function(){
    animateCSS("#home","backInRight");
})

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
    new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd() {
      node.classList.remove(`${prefix}animated`, animationName);
      node.removeEventListener('animationend', handleAnimationEnd);

      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd);
});


function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("portfolio-item");

    if (c == "all") {   
        for (i = 0; i < x.length; i++) {
            x[i].classList.remove("show");
            x[i].classList.remove("hide");
            x[i].classList.add("show");
        }
    } else {
        for (let item of x) {
            if (item.getAttribute("category") != c) {
                item.classList.remove("show");
                item.classList.add("hide");
            } else {
                item.classList.remove("hide");
                item.classList.add("show");
            }
        }
    }

}

document.addEventListener("DOMContentLoaded", function(event) {
  var typed = new Typed('#typed',{
      stringsElement: '#typed-strings',
      backSpeed: 50,
      typeSpeed: 50,
      loop: true
    });
});


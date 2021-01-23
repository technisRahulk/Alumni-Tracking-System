
const ReadMore = (() => {
    let s;
 
    return {
 
      settings() {
        return {
          content: document.querySelectorAll('.js-read-more'),
          originalContentArr: [],
          truncatedContentArr: [],
          moreLink: "Read More...",
          lessLink: "...Read Less",
        }
      },
 
      init() {
        s = this.settings();
        this.bindEvents();
      },
 
      bindEvents() {
        ReadMore.truncateText();
      },

      countWords(str) {
        return str.split(/\s+/).length;
      },
 
      ellipseContent(str, wordsNum) {
        return str.split(/\s+/).slice(0, wordsNum).join(' ');
      },

      truncateText() {
 
        for (let i = 0; i < s.content.length; i++) {
          const originalContent = s.content[i].innerHTML;
          const numberOfWords = s.content[i].dataset.rmWords;
          const truncateContent = ReadMore.ellipseContent(originalContent, numberOfWords);
          const originalContentWords = ReadMore.countWords(originalContent);
 
          s.originalContentArr.push(originalContent);
          s.truncatedContentArr.push(truncateContent);
 
          if (numberOfWords < originalContentWords) {
            s.content[i].innerHTML = s.truncatedContentArr[i];
            let self = i;
            ReadMore.createLink(self)
          }
        }
        ReadMore.handleClick(s.content);
      },
 

      createLink(index) {
        const linkWrap = document.createElement('span');
 
        linkWrap.className = 'read-more__link-wrap';
 
        linkWrap.innerHTML = `<a id="read-more_${index}" class="read-more__link" style="cursor:pointer;">${s.moreLink}</a>`;
 
        s.content[index].parentNode.insertBefore(linkWrap, s.content[index].nextSibling);
 
      },

      handleClick(el) {
        const readMoreLink = document.querySelectorAll('.read-more__link');
 
        for (let j = 0, l = readMoreLink.length; j < l; j++) {
 
          readMoreLink[j].addEventListener('click', function() {
 
            const moreLinkID = this.getAttribute('id');
            let index = moreLinkID.split('_')[1];
 
            el[index].classList.toggle('is-expanded');
 
            if (this.dataset.clicked !== 'true') {
               el[index].innerHTML = s.originalContentArr[index];
               this.innerHTML = s.lessLink;
               this.dataset.clicked = true;
            } else {
              el[index].innerHTML = s.truncatedContentArr[index];
              this.innerHTML = s.moreLink;
              this.dataset.clicked = false;
            }
          });
        }
      },
 
      openAll() {
        const instances = document.querySelectorAll('.read-more__link');
          for (let i = 0; i < instances.length; i++) {
            content[i].innerHTML = s.truncatedContentArr[i];
            instances[i].innerHTML = s.moreLink;
          }
        }
      }
  })();
 
 ReadMore.init()

//  *******************************************************************************************************************

let tab1=document.getElementById('tab1');
let tab2=document.getElementById('tab2');
let sec1=document.getElementById('sec1');
let sec2=document.getElementById('sec2');
let left=document.getElementById('left-container');
let nav=document.getElementById('nav');
let right=document.getElementById('right-container');

function active1(){
    sec2.style.display="none";
    sec1.style.display="block";

    tab1.style.backgroundColor="#fff";
    tab1.style.color="rgb(38, 38, 122)";
    tab2.style.backgroundColor="rgb(211, 241, 255)";
    tab2.style.color="gray";

}

function active2(){
    sec1.style.display="none";
    sec2.style.display="block";

    tab2.style.backgroundColor="#fff";
    tab2.style.color="rgb(38, 38, 122)";
    tab1.style.backgroundColor="rgb(211, 241, 255)";
    tab1.style.color="gray";
}
function active3(){
    sec2.style.display="block";
    sec1.style.display="none";
     left.style.display="none";
      nav.style.display="none";
       right.style.display="block";
       right.style.visibility="visible";
}
function active4(){

     sec2.style.display="none";
    sec1.style.display="none";
    left.style.display="block";
   nav.style.display="none";
   right.style.display="none";
   left.style.visibility="visible";
}

// ***********************************************left part almuni working description place**********************************************************************
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}


function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput1").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue != '') {
    document.getElementById("myUL1").appendChild(li);
  }
  document.getElementById("myInput1").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
    }
  }
}
function newElementa() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput2").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue != '') {
    document.getElementById("myUL2").appendChild(li);
  }
  document.getElementById("myInput2").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
    }
  }
}


//*********************************************************************************************//

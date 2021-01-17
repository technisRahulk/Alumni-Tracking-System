
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




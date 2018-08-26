/* load polyfill, load header, and init menu */
/*!
Copyright: 2018 KAMEDA Akihiro
nav.js | MIT License

*/
/*!
Copyright: 2013 Yahoo!
BSD License
https://github.com/yahoo/pure/blob/master/LICENSE.md
*/

/* set title and menu here */
const title = "Knowledge Representation with Indent and Bracket (KRIB)";
const menuDict = {
    "Top":"index.html",
    "Specification":"spec.html",
}

/* --------------------------------------------------------------- */
/* polyfill 'closest' func */

const loadPolyfill = function(){
    return new Promise(function (resolve, reject) {
        if (!Element.prototype.matches){
            Element.prototype.matches = Element.prototype.msMatchesSelector ||
                Element.prototype.webkitMatchesSelector;}
        if (!Element.prototype.closest){
            Element.prototype.closest = function(s) {
                let el = this;
                if (!document.documentElement.contains(el)) return null;
                    do {
                        if (el.matches(s)) return el;
                        el = el.parentElement || el.parentNode;
                    } while (el !== null && el.nodeType === 1);
                return null;
            };
        }
        resolve("loadPolyfill");
        console.log("loadPolyfill resolved.");
    });
}

/* --------------------------------------------------------------- */
/* load header as webcomponents */

const loadHeader = function () {
    return new Promise(function (resolve, reject) {
        document.getElementById("brand").innerHTML = title;
        for(let key in menuDict){
            let li1=document.createElement('li');
            li1.className='pure-menu-item';
            let a1=document.createElement('a');
            a1.setAttribute('href',menuDict[key]);
            a1.className='pure-menu-link';
            li1.appendChild(a1);
            var txt1=document.createTextNode(key);
            a1.appendChild(txt1);
            document.getElementById("menuList").appendChild(li1);
        }
        resolve("loadHeader");
        console.log("loadHeader resolved.")
    });
}

/* --------------------------------------------------------------- */
/* add onclick menu on menu and body */
// This function is based on https://purecss.io/js/ui.js

const initMenu = function(){
    return new Promise(function (resolve, reject) {
        document.onclick = function(e) {
            if (menu.className.indexOf('active') !== -1) {
                if (!(e.target).closest('#menu')) {
                    toggleAll(e);
                }
            }else{
                if ((e.target).closest('#menuLink')) {
                    toggleAll(e);
                }
            }
        };
        resolve("initMenu");
        console.log("initMenu resolved.")
    });
}

const toggleAll = function(e) {
    e.preventDefault();
    document.getElementById('layout').classList.toggle('active');
    document.getElementById('menu').classList.toggle('active');
    document.getElementById('menuLink').classList.toggle('active');
}

/* --------------------------------------------------------------- */
/* all the processes are implemented as Promise instances */

window.onload = function(){
    Promise.resolve()
    .then(loadPolyfill)
    .then(loadHeader)
    .then(initMenu);
}

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
/* --------------------------------------------------------------- */
/* check rel='import' is supported or not. if not, load "webcomponents-lite" as polyfill */

const loadPolyfill = function(){
    return new Promise(function (resolve, reject) {
        if ('import' in document.createElement('link')) { //check 'import' is supported or not
            resolve("loadPolyfill");
            console.log("loadPolyfill skipped.");
        } else {
            let script = document.createElement('script');
            script.src = 'http://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.1.0/webcomponents-lite.js';
            document.body.appendChild(script);
            script.onload = resolve("polyfill");
            console.log("loadPolyfill resolved.");
        }
        //polyfill 'closest' func
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
    });
}

/* --------------------------------------------------------------- */
/* load header as webcomponents */

const loadHeader = function () {
    return new Promise(function (resolve, reject) {
        let link = document.createElement('link');
        link.rel = 'import';
        link.href = './component/menu.html'
        link.onload = function(e){
            const template = link.import.querySelector('template');
            const clone = document.importNode(template.content, true);
            document.querySelector('header').replaceChild(clone, document.querySelector('header').firstChild);
            resolve("loadHeader");
            console.log("loadHeader resolved.")
        }
        link.onerror = function(e) {
            console.log(new Error("loadHeader failed."));
        };
        document.head.appendChild(link);
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

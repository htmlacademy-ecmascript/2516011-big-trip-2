(()=>{var e={10:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var i=n(537),s=n.n(i),r=n(645),a=n.n(r)()(s());a.push([e.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const o=a},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",i=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),i&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),i&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,i,s,r){"string"==typeof e&&(e=[[null,e,void 0]]);var a={};if(i)for(var o=0;o<this.length;o++){var l=this[o][0];null!=l&&(a[l]=!0)}for(var c=0;c<e.length;c++){var d=[].concat(e[c]);i&&a[d[0]]||(void 0!==r&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=r),n&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=n):d[2]=n),s&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=s):d[4]="".concat(s)),t.push(d))}},t}},537:e=>{"use strict";e.exports=function(e){var t=e[1],n=e[3];if(!n)return t;if("function"==typeof btoa){var i=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),r="/*# ".concat(s," */");return[t].concat([r]).join("\n")}return[t].join("\n")}},484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",o="week",l="month",c="quarter",d="year",u="date",f="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},m=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},_={s:m,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+m(i,2,"0")+":"+m(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,l),r=n-s<0,a=t.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:l,y:d,w:o,d:a,D:u,h:r,m:s,s:i,ms:n,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},b="en",y={};y[b]=v;var g="$isDayjsObject",$=function(e){return e instanceof C||!(!e||!e[g])},w=function e(t,n,i){var s;if(!t)return b;if("string"==typeof t){var r=t.toLowerCase();y[r]&&(s=r),n&&(y[r]=n,s=r);var a=t.split("-");if(!s&&a.length>1)return e(a[0])}else{var o=t.name;y[o]=t,s=o}return!i&&s&&(b=s),s||!i&&b},E=function(e,t){if($(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new C(n)},S=_;S.l=w,S.i=$,S.w=function(e,t){return E(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var C=function(){function v(e){this.$L=w(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[g]=!0}var m=v.prototype;return m.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(S.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(p);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(t)}(e),this.init()},m.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},m.$utils=function(){return S},m.isValid=function(){return!(this.$d.toString()===f)},m.isSame=function(e,t){var n=E(e);return this.startOf(t)<=n&&n<=this.endOf(t)},m.isAfter=function(e,t){return E(e)<this.startOf(t)},m.isBefore=function(e,t){return this.endOf(t)<E(e)},m.$g=function(e,t,n){return S.u(e)?this[t]:this.set(n,e)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(e,t){var n=this,c=!!S.u(t)||t,f=S.p(e),p=function(e,t){var i=S.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return c?i:i.endOf(a)},h=function(e,t){return S.w(n.toDate()[e].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},v=this.$W,m=this.$M,_=this.$D,b="set"+(this.$u?"UTC":"");switch(f){case d:return c?p(1,0):p(31,11);case l:return c?p(1,m):p(0,m+1);case o:var y=this.$locale().weekStart||0,g=(v<y?v+7:v)-y;return p(c?_-g:_+(6-g),m);case a:case u:return h(b+"Hours",0);case r:return h(b+"Minutes",1);case s:return h(b+"Seconds",2);case i:return h(b+"Milliseconds",3);default:return this.clone()}},m.endOf=function(e){return this.startOf(e,!1)},m.$set=function(e,t){var o,c=S.p(e),f="set"+(this.$u?"UTC":""),p=(o={},o[a]=f+"Date",o[u]=f+"Date",o[l]=f+"Month",o[d]=f+"FullYear",o[r]=f+"Hours",o[s]=f+"Minutes",o[i]=f+"Seconds",o[n]=f+"Milliseconds",o)[c],h=c===a?this.$D+(t-this.$W):t;if(c===l||c===d){var v=this.clone().set(u,1);v.$d[p](h),v.init(),this.$d=v.set(u,Math.min(this.$D,v.daysInMonth())).$d}else p&&this.$d[p](h);return this.init(),this},m.set=function(e,t){return this.clone().$set(e,t)},m.get=function(e){return this[S.p(e)]()},m.add=function(n,c){var u,f=this;n=Number(n);var p=S.p(c),h=function(e){var t=E(f);return S.w(t.date(t.date()+Math.round(e*n)),f)};if(p===l)return this.set(l,this.$M+n);if(p===d)return this.set(d,this.$y+n);if(p===a)return h(1);if(p===o)return h(7);var v=(u={},u[s]=e,u[r]=t,u[i]=1e3,u)[p]||1,m=this.$d.getTime()+n*v;return S.w(m,this)},m.subtract=function(e,t){return this.add(-1*e,t)},m.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=S.z(this),r=this.$H,a=this.$m,o=this.$M,l=n.weekdays,c=n.months,d=n.meridiem,u=function(e,n,s,r){return e&&(e[n]||e(t,i))||s[n].slice(0,r)},p=function(e){return S.s(r%12||12,e,"0")},v=d||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i};return i.replace(h,(function(e,i){return i||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return S.s(t.$y,4,"0");case"M":return o+1;case"MM":return S.s(o+1,2,"0");case"MMM":return u(n.monthsShort,o,c,3);case"MMMM":return u(c,o);case"D":return t.$D;case"DD":return S.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return u(n.weekdaysMin,t.$W,l,2);case"ddd":return u(n.weekdaysShort,t.$W,l,3);case"dddd":return l[t.$W];case"H":return String(r);case"HH":return S.s(r,2,"0");case"h":return p(1);case"hh":return p(2);case"a":return v(r,a,!0);case"A":return v(r,a,!1);case"m":return String(a);case"mm":return S.s(a,2,"0");case"s":return String(t.$s);case"ss":return S.s(t.$s,2,"0");case"SSS":return S.s(t.$ms,3,"0");case"Z":return s}return null}(e)||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,u,f){var p,h=this,v=S.p(u),m=E(n),_=(m.utcOffset()-this.utcOffset())*e,b=this-m,y=function(){return S.m(h,m)};switch(v){case d:p=y()/12;break;case l:p=y();break;case c:p=y()/3;break;case o:p=(b-_)/6048e5;break;case a:p=(b-_)/864e5;break;case r:p=b/t;break;case s:p=b/e;break;case i:p=b/1e3;break;default:p=b}return f?p:S.a(p)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return y[this.$L]},m.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=w(e,t,!0);return i&&(n.$L=i),n},m.clone=function(){return S.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),M=C.prototype;return E.prototype=M,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",l],["$y",d],["$D",u]].forEach((function(e){M[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),E.extend=function(e,t){return e.$i||(e(t,C,E),e.$i=!0),E},E.locale=w,E.isDayjs=$,E.unix=function(e){return E(1e3*e)},E.en=y[b],E.Ls=y,E.p={},E}()},379:e=>{"use strict";var t=[];function n(e){for(var n=-1,i=0;i<t.length;i++)if(t[i].identifier===e){n=i;break}return n}function i(e,i){for(var r={},a=[],o=0;o<e.length;o++){var l=e[o],c=i.base?l[0]+i.base:l[0],d=r[c]||0,u="".concat(c," ").concat(d);r[c]=d+1;var f=n(u),p={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==f)t[f].references++,t[f].updater(p);else{var h=s(p,i);i.byIndex=o,t.splice(o,0,{identifier:u,updater:h,references:1})}a.push(u)}return a}function s(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,s){var r=i(e=e||[],s=s||{});return function(e){e=e||[];for(var a=0;a<r.length;a++){var o=n(r[a]);t[o].references--}for(var l=i(e,s),c=0;c<r.length;c++){var d=n(r[c]);0===t[d].references&&(t[d].updater(),t.splice(d,1))}r=l}}},569:e=>{"use strict";var t={};e.exports=function(e,n){var i=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}},216:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{"use strict";e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{"use strict";e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var i="";n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var s=void 0!==n.layer;s&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,s&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),t.styleTagTransform(i,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var r=t[i]={id:i,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0,(()=>{"use strict";function e(e,t,n="beforeend"){if(!(e instanceof b))throw new Error("Can render only components");if(null===t)throw new Error("Container element doesn't exist");t.insertAdjacentElement(n,e.element)}function t(e,t){if(!(e instanceof b&&t instanceof b))throw new Error("Can replace only components");const n=e.element,i=t.element,s=i.parentElement;if(null===s)throw new Error("Parent element doesn't exist");s.replaceChild(n,i)}var i=n(379),s=n.n(i),r=n(795),a=n.n(r),o=n(569),l=n.n(o),c=n(565),d=n.n(c),u=n(216),f=n.n(u),p=n(589),h=n.n(p),v=n(10),m={};m.styleTagTransform=h(),m.setAttributes=d(),m.insert=l().bind(null,"head"),m.domAPI=a(),m.insertStyleElement=f(),s()(v.Z,m),v.Z&&v.Z.locals&&v.Z.locals;const _="shake";class b{#e=null;constructor(){if(new.target===b)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#e||(this.#e=function(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}(this.template)),this.#e}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#e=null}shake(e){this.element.classList.add(_),setTimeout((()=>{this.element.classList.remove(_),e?.()}),600)}}class y extends b{get template(){return'<section class="trip-main__trip-info  trip-info">\n            <div class="trip-info__main">\n              <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n              <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n            </div>\n\n            <p class="trip-info__cost">\n              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n            </p>\n          </section>'}}class g extends b{get template(){return'<form class="trip-filters" action="#" method="get">\n            <div class="trip-filters__filter">\n              <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>\n              <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n            </div>\n\n            <div class="trip-filters__filter">\n              <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n              <label class="trip-filters__filter-label" for="filter-future">Future</label>\n            </div>\n\n            <div class="trip-filters__filter">\n              <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n              <label class="trip-filters__filter-label" for="filter-present">Present</label>\n            </div>\n\n            <div class="trip-filters__filter">\n              <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">\n              <label class="trip-filters__filter-label" for="filter-past">Past</label>\n            </div>\n\n            <button class="visually-hidden" type="submit">Accept filter</button>\n          </form>'}}class $ extends b{get template(){return'<ul class="trip-events__list"></ul>'}}class w extends b{get template(){return'<li class="trip-events__item"></li>'}}class E extends b{get template(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n            <div class="trip-sort__item  trip-sort__item--day">\n              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n              <label class="trip-sort__btn" for="sort-day">Day</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--event">\n              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n              <label class="trip-sort__btn" for="sort-event">Event</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--time">\n              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n              <label class="trip-sort__btn" for="sort-time">Time</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--price">\n              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n              <label class="trip-sort__btn" for="sort-price">Price</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--offer">\n              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n              <label class="trip-sort__btn" for="sort-offer">Offers</label>\n            </div>\n          </form>'}}const S=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"];class C extends b{#t=null;#n=null;#i=null;#s=null;#r=null;#a=null;constructor({point:e,destination:t,offers:n,isEventExist:i,onEditorSubmit:s,onCloseButtonClick:r}){super(),this.#t=e,this.#n=t,this.#i=n,this.#s=i,this.#r=s,this.#a=r,this.element.addEventListener("submit",this.#o),this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#a)}get template(){return function(e={},t,n,i=!1){const{type:s="flight",basePrice:r=0,dateFrom:a=(new Date).toISOString(),dateTo:o=(new Date).toISOString()}=e,l=e.id||0,c=n.map((e=>`\n    <div class="event__offer-selector">\n      <input\n        class="event__offer-checkbox visually-hidden"\n        id="event-offer-${e.id}"\n        type="checkbox"\n        name="event-offer-${e.title}"\n        ${e.isChecked?"checked":""}\n      >\n      <label class="event__offer-label" for="event-offer-${e.id}">\n        <span class="event__offer-title">${e.title}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${e.price}</span>\n      </label>\n    </div>`)).join(""),d=t.pictures&&Array.isArray(t.pictures)?t.pictures.map((e=>`\n      <img class="event__photo" src="${e.src}" alt="${e.description}">\n    `)).join(""):"";return`<form class="event event--edit" action="#" method="post">\n            <header class="event__header">\n              <div class="event__type-wrapper">\n                <label class="event__type event__type-btn" for="event-type-toggle-${l}">\n                  <span class="visually-hidden">Choose event type</span>\n                  <img class="event__type-icon" width="17" height="17" src="img/icons/${s}.png" alt="Event type icon">\n                </label>\n                <input class="event__type-toggle visually-hidden" id="event-type-toggle-${l}" type="checkbox">\n\n                <div class="event__type-list">\n                  <fieldset class="event__type-group">\n                    <legend class="visually-hidden">Event type</legend>\n                    ${S.map((e=>`\n                      <div class="event__type-item">\n                        <input\n                          id="event-type-${e}-${l}"\n                          class="event__type-input visually-hidden"\n                          type="radio"\n                          name="event-type"\n                          value="${e}"\n                          ${e===s?"checked":""}\n                        >\n                        <label class="event__type-label event__type-label--${e}" for="event-type-${e}-${l}">${e.charAt(0).toUpperCase()+e.slice(1)}</label>\n                      </div>`)).join("")}\n                  </fieldset>\n                </div>\n              </div>\n\n              <div class="event__field-group event__field-group--destination">\n                <label class="event__label event__type-output" for="event-destination-${t.id}">\n                  ${s.charAt(0).toUpperCase()+s.slice(1)}\n                </label>\n                <input\n                  class="event__input event__input--destination"\n                  id="event-destination-${t.id}"\n                  type="text"\n                  name="event-destination"\n                  value="${t.name||""}"\n                  list="destination-list-${t.id}"\n                >\n                <datalist id="destination-list-${t.id}">\n                  <option value="${t.name}"></option>\n                </datalist>\n              </div>\n\n              <div class="event__field-group event__field-group--time">\n                <label class="visually-hidden" for="event-start-time-${l}">From</label>\n                <input\n                  class="event__input event__input--time"\n                  id="event-start-time-${l}"\n                  type="text"\n                  name="event-start-time"\n                  value="${new Date(a).toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"})} ${new Date(a).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",hourCycle:"h23"})}"\n                >\n                &mdash;\n                <label class="visually-hidden" for="event-end-time-${l}">To</label>\n                <input\n                  class="event__input event__input--time"\n                  id="event-end-time-${l}"\n                  type="text"\n                  name="event-end-time"\n                  value="${new Date(o).toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"})} ${new Date(o).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",hourCycle:"h23"})}"\n                >\n              </div>\n\n              <div class="event__field-group event__field-group--price">\n                <label class="event__label" for="event-price-${l}">\n                  <span class="visually-hidden">Price</span>\n                  &euro;\n                </label>\n                <input\n                  class="event__input event__input--price"\n                  id="event-price-${l}"\n                  type="text"\n                  name="event-price"\n                  value="${r}"\n                >\n              </div>\n\n              <button class="event__save-btn btn btn--blue" type="submit">Save</button>\n              ${i?'<button class="event__reset-btn" type="reset">Delete</button> <button class="event__rollup-btn" type="button"> <span class="visually-hidden">Open event</span></button>':'<button class="event__reset-btn" type="reset">Cancel</button>'}\n            </header>\n\n            <section class="event__details">\n              <section class="event__section event__section--offers">\n                <h3 class="event__section-title event__section-title--offers">Offers</h3>\n\n                <div class="event__available-offers">\n                  ${c}\n                </div>\n              </section>\n              <section class="event__section event__section--destination">\n                <h3 class="event__section-title event__section-title--destination">Destination</h3>\n                <p class="event__destination-description">${t.description||""}</p>\n              </section>\n            </section>\n\n            <div class="event__photos-container">\n              <div class="event__photos-tape">\n                ${d}\n              </div>\n            </div>\n          </form>`}(this.#t,this.#n,this.#i,this.#s)}#o=e=>{e.preventDefault(),this.#r()}}var M=n(484),D=n.n(M);class x extends b{#t=null;#i=null;#l=null;constructor({point:e,offers:t,onEditButtonClick:n}){super(),this.#t=e,this.#i=t,this.#l=n,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#c)}get template(){return function(e,t){const{type:n="flight",basePrice:i=0,dateFrom:s="",dateTo:r="",destination:a={},isFavorite:o=!1}=e||{},{name:l="undefined"}=a||{},c=t&&t.length>0?t.map((e=>`<li class="event__offer">\n        <span class="event__offer-title">${e.title}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${e.price}</span>\n      </li>`)).join(""):"";return`<div class="event">\n            <time class="event__date" datetime="${new Date(s).toISOString()}">${new Date(s).toLocaleDateString("en-US",{month:"short",day:"2-digit"}).toUpperCase()}</time>\n            <div class="event__type">\n              <img class="event__type-icon" width="42" height="42" src="img/icons/${n}.png" alt="Event type icon">\n            </div>\n            <h3 class="event__title">${n} ${l}</h3>\n            <div class="event__schedule">\n              <p class="event__time">\n                <time class="event__start-time" datetime="${s}">${new Date(s).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"})}</time>\n                &mdash;\n                <time class="event__end-time" datetime="${r}">${new Date(r).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"})}</time>\n              </p>\n              <p class="event__duration">${((e,t)=>{const n=D()(e),i=D()(t).diff(n,"minute");return`${Math.floor(i/60)}H ${i%60}M`})(s,r)}</p>\n            </div>\n            <p class="event__price">\n              &euro;&nbsp;<span class="event__price-value">${i}</span>\n            </p>\n            <h4 class="visually-hidden">Offers:</h4>\n            <ul class="event__selected-offers">\n              ${c}\n            </ul>\n            <button class="event__favorite-btn ${o?"event__favorite-btn--active":""}" type="button">\n              <span class="visually-hidden">Add to favorite</span>\n              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n              </svg>\n            </button>\n            <button class="event__rollup-btn" type="button">\n              <span class="visually-hidden">Open event</span>\n            </button>\n          </div>`}(this.#t,this.#i)}#c=e=>{e.preventDefault(),this.#l()}}const A=document.querySelector(".page-header"),k=A.querySelector(".trip-main"),T=A.querySelector(".trip-controls__filters");class O{#d=null;#u=null;#f=[];#p=new $;constructor({container:e,pointsModel:t}){this.#d=e,this.#u=t}init(){this.#u.init(),this.#f=this.#u.pointsWithDetails,this.#h(),this.#v()}#m(n){const i=e=>{"Escape"===e.key&&(e.preventDefault(),a())},s=new x({point:n,offers:n.offers,onEditButtonClick:()=>{t(r,s),document.addEventListener("keydown",i)}}),r=new C({point:n,destination:n.destination,offers:n.offers,isEventExist:!0,onEditorSubmit:()=>{a(),document.removeEventListener("keydown",i)},onCloseButtonClick:()=>{a(),document.removeEventListener("keydown",i)}});function a(){t(s,r)}const o=new w;e(o,this.#p.element),e(s,o.element)}#h(){e(new y,k,"afterbegin"),e(new g,T)}#v(){e(this.#p,this.#d),e(new E,this.#p.element);for(const e of this.#f)this.#m(e)}}const L=[{id:"bfa5cb75-a1fe-4b77-a83c-0e528e910e04",name:"Chamonix",description:"Chamonix, is a beautiful city, a true Asian pearl, with crowded streets.",pictures:[{src:"http://picsum.photos/300/200?r=0.0762563005163317",description:"Chamonix parliament building"}]},{id:"d1c24c1e-a8cf-11eb-bcbc-0242ac130002",name:"Geneva",description:"Geneva, a calm and peaceful city near the Alps.",pictures:[{src:"http://picsum.photos/300/200?r=0.527836451",description:"Geneva lake view"}]},{id:"e8c3b27f-a8cf-11eb-bcbc-0242ac130002",name:"Zurich",description:"Zurich, a major city in Switzerland, known for its financial institutions.",pictures:[{src:"http://picsum.photos/300/200?r=0.827173821",description:"Zurich skyline"}]},{id:"f9b5db61-b1fe-4b77-a83c-0e528e910e04",name:"Paris",description:"Paris, the city of lights and romance, known for its culture and fashion.",pictures:[{src:"http://picsum.photos/300/200?r=0.174873920",description:"Eiffel Tower view"}]}],B=[{type:"taxi",offers:[{id:"b4c3e4e6-9053-42ce-b747-e281314baa31",title:"Upgrade to a business class",price:120},{id:"e3f4e556-89c3-41bb-bae2-45b2d58d5512",title:"Choose a premium taxi",price:200}]},{type:"bus",offers:[{id:"e6c2e5a8-8af4-11eb-8dcd-0242ac130003",title:"Extra baggage",price:50},{id:"h8e2e1f9-8af4-11eb-8dcd-0242ac130006",title:"Seat reservation",price:30}]},{type:"train",offers:[{id:"f7c3a3a8-8af4-11eb-8dcd-0242ac130004",title:"First class seat",price:150},{id:"i8d3f1f9-8af4-11eb-8dcd-0242ac130007",title:"Meal included",price:70}]},{type:"flight",offers:[{id:"h9c8e8a8-8af4-11eb-8dcd-0242ac130005",title:"Extra legroom",price:100},{id:"j9e8e1f9-8af4-11eb-8dcd-0242ac130008",title:"Priority boarding",price:80}]}],I=[{id:"f4b62099-293f-4c3d-a702-94eec4a2808c",basePrice:1100,dateFrom:"2019-07-10T22:55:56.845Z",dateTo:"2019-07-11T11:22:13.375Z",destination:"bfa5cb75-a1fe-4b77-a83c-0e528e910e04",isFavorite:!1,offerIds:["b4c3e4e6-9053-42ce-b747-e281314baa31","e3f4e556-89c3-41bb-bae2-45b2d58d5512"],type:"taxi"},{id:"c3b24350-293f-4c3d-a702-94eec4a2809a",basePrice:600,dateFrom:"2019-08-10T10:55:56.845Z",dateTo:"2019-08-10T14:22:13.375Z",destination:"d1c24c1e-a8cf-11eb-bcbc-0242ac130002",isFavorite:!0,offerIds:["e6c2e5a8-8af4-11eb-8dcd-0242ac130003","h8e2e1f9-8af4-11eb-8dcd-0242ac130006"],type:"bus"},{id:"a1d24350-1111-4c3d-a702-94eec4a2809a",basePrice:800,dateFrom:"2019-09-12T09:15:56.845Z",dateTo:"2019-09-12T12:45:13.375Z",destination:"e8c3b27f-a8cf-11eb-bcbc-0242ac130002",isFavorite:!1,offerIds:["f7c3a3a8-8af4-11eb-8dcd-0242ac130004","i8d3f1f9-8af4-11eb-8dcd-0242ac130007"],type:"train"},{id:"f2b24350-293f-4c3d-a702-94eec4a2809a",basePrice:1500,dateFrom:"2019-10-15T13:30:56.845Z",dateTo:"2019-10-15T18:00:13.375Z",destination:"f9b5db61-b1fe-4b77-a83c-0e528e910e04",isFavorite:!0,offerIds:["h9c8e8a8-8af4-11eb-8dcd-0242ac130005","j9e8e1f9-8af4-11eb-8dcd-0242ac130008"],type:"flight"}];function H(){return(e=I)[Math.floor(Math.random()*e.length)];var e}class F{#_=null;#b=null;#i=null;constructor(){this.#_=[],this.#b=[],this.#i=[]}init(){this.#b=L,this.#i=B,this.#_=Array.from({length:5},H)}get destinations(){return this.#b}get offers(){return this.#i}get points(){return this.#_}get pointsWithDetails(){return this.#_.map((e=>{const t=this.#b.find((t=>t.id===e.destination)),n=this.#i.find((t=>t.type===e.type))?.offers||[],i=n.filter((t=>e.offerIds.includes(t.id)));return{...e,destination:t||null,typeOffers:n,offers:i}}))}}document.addEventListener("DOMContentLoaded",(()=>{const e=document.querySelector(".trip-events"),t=new F;new O({container:e,pointsModel:t}).init()}))})()})();
//# sourceMappingURL=bundle.e523927093176db4f350.js.map
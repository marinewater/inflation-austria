!function(){"use strict";function e(){var e=parseFloat(document.getElementById("euro_past").value);return isNaN(e)&&(e=0),e}function t(e){return s[f].month[e]}function n(e){for(var t in v){var n=document.createElement("option");n.text=t,e.appendChild(n)}}function r(e){o(e.target)}function o(e,n){void 0===n&&(n=!1);var r=parseInt(e.value,10),o=e.parentElement.querySelector("select.month"),u=o.value;!function(e){for(;e.firstChild;)e.removeChild(e.firstChild)}(o);for(var a in v[r]){var l=document.createElement("option");l.text=t(a),l.value=a,o.appendChild(l)}var d=function(e,t,n){var r=t.querySelectorAll("option");if(!0===n)return r.length-1;if(null===e)return 0;for(var o=0;o<r.length;o++)if(r[o].value===e)return o;return 0}(u,o,n);o.querySelectorAll("option")[d].selected=!0,i()}function u(){i()}function a(){!function(e,t){var n=new XMLHttpRequest;n.open("GET",e),n.onload=function(){200===n.status?t(null,n.responseText):t("Request failed.  Returned status of "+n.status)},n.send()}("./data/inflation_data.json",function(e,t){if(e)throw e;v=JSON.parse(t),function(){var e=document.getElementById("year_from"),t=document.getElementById("year_to");n(e),n(t),e.firstChild.selected=!0,t.lastChild.selected=!0,o(e),o(t,!0),i()}()})}function i(){var t=function(e,t,n,r){var o=v[e][t];return v[n][r]/o}(parseInt(document.getElementById("year_from").value,10),document.getElementById("month_from").value,parseInt(document.getElementById("year_to").value,10),document.getElementById("month_to").value);!function(e){document.getElementById("euro_present").textContent=e.toFixed(2)+"€"}(m(e()*t)),function(e){document.getElementById("inflation_present").textContent="("+e.toFixed(2)+"% Inflation)"}(m(100*(t-1)))}function l(t){!function(e){document.getElementById("schilling_past").value=e.toFixed(2)}(m(e()*c)),i()}function d(e){!function(e){document.getElementById("euro_past").value=e.toFixed(2)}(m(function(){var e=parseFloat(document.getElementById("schilling_past").value);return isNaN(e)&&(e=0),e}()/c)),i()}function m(e){return Math.round(100*e)/100}var c=13.7603,s={de:{month:{"Jänner":"Jänner",Februar:"Februar","März":"März",April:"April",Mai:"Mai",Juni:"Juni",Juli:"Juli",August:"August",September:"September",Oktober:"Oktober",November:"November",Dezember:"Dezember","Ø":"Ø"}},en:{month:{"Jänner":"January",Februar:"February","März":"March",April:"April",Mai:"May",Juni:"June",Juli:"July",August:"August",September:"September",Oktober:"October",November:"November",Dezember:"December","Ø":"Ø"}}},f=document.querySelector("html").getAttribute("lang"),v={};document.getElementById("euro_past").addEventListener("change",l),document.getElementById("euro_past").addEventListener("keyup",l),document.getElementById("schilling_past").addEventListener("change",d),document.getElementById("schilling_past").addEventListener("keyup",d),document.getElementById("year_from").addEventListener("change",r),document.getElementById("month_from").addEventListener("change",u),document.getElementById("year_to").addEventListener("change",r),document.getElementById("month_to").addEventListener("change",u),a()}();
//# sourceMappingURL=bundle.js.map
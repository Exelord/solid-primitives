(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const f of o.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();const m={};let _=D;const y=1,x=2,U={owned:null,cleanups:null,context:null,owner:null};var p=null;let w=null,c=null,d=null,v=0;function j(e,n){const t=p,s=e.length===0,i=s?U:{owned:null,cleanups:null,context:null,owner:n||t},o=s?e:()=>e(()=>B(()=>E(i)));p=i;try{return C(o,!0)}finally{p=t}}function S(e,n,t){const s=H(e,n,!1,y);I(s)}function B(e){try{return e()}finally{}}function q(e,n,t){let s=e.value;return(!e.comparator||!e.comparator(s,n))&&(e.value=n,e.observers&&e.observers.length&&C(()=>{for(let i=0;i<e.observers.length;i+=1){const o=e.observers[i],f=w&&w.running;f&&w.disposed.has(o),(f&&!o.tState||!f&&!o.state)&&(o.pure?c.push(o):d.push(o),o.observers&&F(o)),f||(o.state=y)}if(c.length>1e6)throw c=[],new Error},!1)),n}function I(e){if(!e.fn)return;E(e);const n=p,t=v;p=e,G(e,e.value,t),p=n}function G(e,n,t){let s;try{s=e.fn(n)}catch(i){e.pure&&(e.state=y,e.owned&&e.owned.forEach(E),e.owned=null),M(i)}(!e.updatedAt||e.updatedAt<=t)&&(e.updatedAt!=null&&"observers"in e?q(e,s):e.value=s,e.updatedAt=t)}function H(e,n,t,s=y,i){const o={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:n,owner:p,context:null,pure:t};return p===null||p!==U&&(p.owned?p.owned.push(o):p.owned=[o]),o}function P(e){const n=w;if(e.state===0||n)return;if(e.state===x||n)return N(e);if(e.suspense&&B(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<v);)(e.state||n)&&t.push(e);for(let s=t.length-1;s>=0;s--)if(e=t[s],e.state===y||n)I(e);else if(e.state===x||n){const i=c;c=null,C(()=>N(e,t[0]),!1),c=i}}function C(e,n){if(c)return e();let t=!1;n||(c=[]),d?t=!0:d=[],v++;try{const s=e();return K(t),s}catch(s){c||(d=null),M(s)}}function K(e){if(c&&(D(c),c=null),e)return;const n=d;d=null,n.length&&C(()=>_(n),!1)}function D(e){for(let n=0;n<e.length;n++)P(e[n])}function N(e,n){const t=w;e.state=0;for(let s=0;s<e.sources.length;s+=1){const i=e.sources[s];i.sources&&(i.state===y||t?i!==n&&P(i):(i.state===x||t)&&N(i,n))}}function F(e){const n=w;for(let t=0;t<e.observers.length;t+=1){const s=e.observers[t];(!s.state||n)&&(s.state=x,s.pure?c.push(s):d.push(s),s.observers&&F(s))}}function E(e){let n;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),s=e.sourceSlots.pop(),i=t.observers;if(i&&i.length){const o=i.pop(),f=t.observerSlots.pop();s<i.length&&(o.sourceSlots[f]=s,i[s]=o,t.observerSlots[s]=f)}}if(e.owned){for(n=0;n<e.owned.length;n++)E(e.owned[n]);e.owned=null}if(e.cleanups){for(n=0;n<e.cleanups.length;n++)e.cleanups[n]();e.cleanups=null}e.state=0,e.context=null}function Q(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function M(e){throw e=Q(e),e}function V(e,n){return B(()=>e(n||{}))}function W(e,n,t){let s=t.length,i=n.length,o=s,f=0,l=0,r=n[i-1].nextSibling,u=null;for(;f<i||l<o;){if(n[f]===t[l]){f++,l++;continue}for(;n[i-1]===t[o-1];)i--,o--;if(i===f){const h=o<s?l?t[l-1].nextSibling:t[o-l]:r;for(;l<o;)e.insertBefore(t[l++],h)}else if(o===l)for(;f<i;)(!u||!u.has(n[f]))&&n[f].remove(),f++;else if(n[f]===t[o-1]&&t[l]===n[i-1]){const h=n[--i].nextSibling;e.insertBefore(t[l++],n[f++].nextSibling),e.insertBefore(t[--o],h),n[i]=t[o]}else{if(!u){u=new Map;let a=l;for(;a<o;)u.set(t[a],a++)}const h=u.get(n[f]);if(h!=null)if(l<h&&h<o){let a=f,b=1,L;for(;++a<i&&a<o&&!((L=u.get(n[a]))==null||L!==h+b);)b++;if(b>h-l){const R=n[f];for(;l<h;)e.insertBefore(t[l++],R)}else e.replaceChild(t[l++],n[f++])}else f++;else n[f++].remove()}}}function $(e,n,t,s={}){let i;return j(o=>{i=o,n===document?e():X(n,e(),n.firstChild?null:void 0,t)},s.owner),()=>{i(),n.textContent=""}}function J(e,n,t){const s=document.createElement("template");s.innerHTML=e;let i=s.content.firstChild;return t&&(i=i.firstChild),i}function X(e,n,t,s){if(t!==void 0&&!s&&(s=[]),typeof n!="function")return A(e,n,s,t);S(i=>A(e,n(),i,t),s)}function A(e,n,t,s,i){for(m.context&&!t&&(t=[...e.childNodes]);typeof t=="function";)t=t();if(n===t)return t;const o=typeof n,f=s!==void 0;if(e=f&&t[0]&&t[0].parentNode||e,o==="string"||o==="number"){if(m.context)return t;if(o==="number"&&(n=n.toString()),f){let l=t[0];l&&l.nodeType===3?l.data=n:l=document.createTextNode(n),t=g(e,t,s,l)}else t!==""&&typeof t=="string"?t=e.firstChild.data=n:t=e.textContent=n}else if(n==null||o==="boolean"){if(m.context)return t;t=g(e,t,s)}else{if(o==="function")return S(()=>{let l=n();for(;typeof l=="function";)l=l();t=A(e,l,t,s)}),()=>t;if(Array.isArray(n)){const l=[],r=t&&Array.isArray(t);if(T(l,n,t,i))return S(()=>t=A(e,l,t,s,!0)),()=>t;if(m.context){if(!l.length)return t;for(let u=0;u<l.length;u++)if(l[u].parentNode)return t=l}if(l.length===0){if(t=g(e,t,s),f)return t}else r?t.length===0?O(e,l,s):W(e,t,l):(t&&g(e),O(e,l));t=l}else if(n instanceof Node){if(m.context&&n.parentNode)return t=f?[n]:n;if(Array.isArray(t)){if(f)return t=g(e,t,s,n);g(e,t,null,n)}else t==null||t===""||!e.firstChild?e.appendChild(n):e.replaceChild(n,e.firstChild);t=n}}return t}function T(e,n,t,s){let i=!1;for(let o=0,f=n.length;o<f;o++){let l=n[o],r=t&&t[o];if(l instanceof Node)e.push(l);else if(!(l==null||l===!0||l===!1))if(Array.isArray(l))i=T(e,l,r)||i;else if(typeof l=="function")if(s){for(;typeof l=="function";)l=l();i=T(e,Array.isArray(l)?l:[l],Array.isArray(r)?r:[r])||i}else e.push(l),i=!0;else{const u=String(l);r&&r.nodeType===3&&r.data===u?e.push(r):e.push(document.createTextNode(u))}}return i}function O(e,n,t=null){for(let s=0,i=n.length;s<i;s++)e.insertBefore(n[s],t)}function g(e,n,t,s){if(t===void 0)return e.textContent="";const i=s||document.createTextNode("");if(n.length){let o=!1;for(let f=n.length-1;f>=0;f--){const l=n[f];if(i!==l){const r=l.parentNode===e;!o&&!f?r?e.replaceChild(i,l):e.insertBefore(i,t):r&&l.remove()}else o=!0}}else e.insertBefore(i,t);return[i]}const Y=J(`<div class="p-24 box-border w-full min-h-screen flex flex-col justify-center items-center space-y-4 bg-gray-800 text-white"><div class="wrapper-v"><h4>Counter component</h4><p class="caption">it's very important...</p></div></div>`),Z=()=>Y.cloneNode(!0);$(()=>V(Z,{}),document.getElementById("root"));
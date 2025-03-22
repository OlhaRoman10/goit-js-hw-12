import{a as d,S as u,i}from"./assets/vendor-DVva8SYe.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const p="49321124-d9248d4be3ea0dc21aad93268",f="https://pixabay.com/api/";function m(n){return d.get(f,{params:{key:p,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(t=>t.data.hits).catch(t=>(console.error("Error fetching images:",t),[]))}function h(n){const t=document.querySelector(".gallery");t.innerHTML=n.map(o=>`
    <li class="gallery-item">
      <a href="${o.largeImageURL}" class="gallery-link">
        <img src="${o.webformatURL}" alt="${o.tags}" loading="lazy">
      </a>
      <div class="info">
        <p><span class="matter">Likes</span> ${o.likes}</p>
        <p><span class="matter">Views</span> ${o.views}</p>
        <p><span class="matter">Comments</span> ${o.comments}</p>
        <p><span class="matter">Downloads</span> ${o.downloads}</p>
      </div>
    </li>
  `).join(""),new u(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}const c=document.querySelector(".form"),l=document.querySelector(".loader"),y=c.querySelector("input[name='search-text']"),g=document.querySelector(".gallery");l.classList.add("hidden");function L(){l.classList.remove("hidden")}function S(){l.classList.add("hidden")}c.addEventListener("submit",function(n){n.preventDefault();const t=y.value.trim();if(g.innerHTML="",!t){i.error({message:"Please enter a search query!"});return}L(),m(t).then(s=>{s.length===0?i.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):h(s)}).catch(s=>{i.error({message:"Something went wrong. Please try again later!",position:"topRight"}),console.error("Error fetching images:",s)}).finally(()=>S())});
//# sourceMappingURL=index.js.map

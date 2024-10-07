import{a as v,S as b,i as c}from"./assets/vendor-D73Uttp0.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();async function m(r,a){const e="https://pixabay.com"+"/api/",t={q:r,key:"46359469-7b013fe590d21d7ac02b102d9",image_type:"photo",orientation:"horizontal",page:a,per_page:15,safesearch:"true"};return(await v.get(e,{params:t})).data}function p(r,a){const l=r.map(({webformatURL:i,largeImageURL:e,tags:t,likes:o,views:h,comments:y,downloads:f})=>`<li class="gallery-item">
          <a href="${e}" class="gallery-link">
            <img class="gallery-img" src="${i}" alt="${t}" />
          </a>
          <ul class="img-stats">
            <li class="stat-item">
              <span class="stat-label">Likes</span>
              <span class="stat-value" data-likes>${o}</span>
            </li>
            <li class="stat-item">
              <span class="stat-label">Views</span>
              <span class="stat-value" data-views>${h}</span>
            </li>
            <li class="stat-item">
              <span class="stat-label">Comments</span>
              <span class="stat-value" data-comments>${y}</span>
            </li>
            <li class="stat-item">
              <span class="stat-label">Downloads</span>
              <span class="stat-value" data-downloads>${f}</span>
            </li>
          </ul>
        </li>`).join("");a.insertAdjacentHTML("beforeend",l)}const s={searchForm:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more-btn")};let n=1,d,u;const g=new b(".gallery a",{captions:!0,captionsData:"alt",captionsDelay:250});s.searchForm.addEventListener("submit",L);s.loadMoreBtn.addEventListener("click",w);async function L(r){r.preventDefault(),d=r.currentTarget.elements.query.value.trim(),n=1,s.gallery.innerHTML="",s.loader.classList.remove("visually-hidden");try{const a=await m(d),l=a.hits;l.length===0?c.info({message:"Sorry, there are no images matching your search query. Please try again!",maxWidth:350,color:"#a3b6fd",closeOnEscape:!0,closeOnClick:!0,position:"topRight"}):(u=a.totalHits,p(l,s.gallery),g.refresh(),u>n*15&&s.loadMoreBtn.classList.remove("visually-hidden"))}catch{c.error({message:"Something went wrong. Please try again later.",maxWidth:350,closeOnEscape:!0,closeOnClick:!0,position:"topRight"})}finally{s.loader.classList.add("visually-hidden"),s.searchForm.reset()}}async function w(){n+=1,s.loader.classList.remove("visually-hidden");try{const r=await m(d,n);p(r.hits,s.gallery,!0),g.refresh(),O(),u<=n*15&&(s.loadMoreBtn.classList.add("visually-hidden"),c.info({message:"We're sorry, but you've reached the end of search results.",maxWidth:350,color:"#a3b6fd",closeOnEscape:!0,closeOnClick:!0,position:"topRight"}))}catch{c.error({message:"Something went wrong. Please try again later.",maxWidth:350,closeOnEscape:!0,closeOnClick:!0,position:"topRight"})}finally{s.loader.classList.add("visually-hidden")}}function O(){const a=s.gallery.lastElementChild.getBoundingClientRect().height;window.scrollBy({top:a*2,left:0,behavior:"smooth"})}
//# sourceMappingURL=index.js.map

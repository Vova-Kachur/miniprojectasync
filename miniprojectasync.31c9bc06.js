const API_KEY="55981537-d72f43f268783da353d1d0a05",form=document.querySelector("#search-form"),gallery=document.querySelector(".gallery"),loadMoreBtn=document.querySelector(".load-more");let page=1,searchQuery="";const PER_PAGE=12;async function onSearch(e){e.preventDefault(),(searchQuery=e.currentTarget.elements.query.value.trim())&&(page=1,gallery.innerHTML="",await fetchImages())}async function onLoadMore(){page+=1,await fetchImages(),smoothScroll()}async function fetchImages(){let e=`https://pixabay.com/api/?key=55981537-d72f43f268783da353d1d0a05&q=${searchQuery}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`;try{let t=await fetch(e),a=await t.json();if(console.log(a),0===a.hits.length){loadMoreBtn.style.display="none";return}createMarkup(a.hits),a.totalHits>12*page?loadMoreBtn.style.display="block":loadMoreBtn.style.display="none"}catch(e){console.log(e)}}function createMarkup(e){let t=e.map(e=>`
      <li>
        <div class="photo-card">
          <img
            src="${e.webformatURL}"
            alt="${e.tags}"
          />

          <div class="stats">
            <p class="stats-item">
              <i class="material-icons">thumb_up</i>
              ${e.likes}
            </p>

            <p class="stats-item">
              <i class="material-icons">visibility</i>
              ${e.views}
            </p>

            <p class="stats-item">
              <i class="material-icons">comment</i>
              ${e.comments}
            </p>

            <p class="stats-item">
              <i class="material-icons">cloud_download</i>
              ${e.downloads}
            </p>
          </div>
        </div>
      </li>
    `).join("");gallery.insertAdjacentHTML("beforeend",t)}function smoothScroll(){let e=document.querySelectorAll(".photo-card");0===e.length||e[e.length-1].scrollIntoView({behavior:"smooth",block:"end"})}form.addEventListener("submit",onSearch),loadMoreBtn.addEventListener("click",onLoadMore);
//# sourceMappingURL=miniprojectasync.31c9bc06.js.map

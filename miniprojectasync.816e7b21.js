const API_KEY = '55981537-d72f43f268783da353d1d0a05';
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let page = 1;
let searchQuery = '';
const PER_PAGE = 12;
form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);
async function onSearch(e) {
    e.preventDefault();
    searchQuery = e.currentTarget.elements.query.value.trim();
    if (!searchQuery) return;
    page = 1;
    gallery.innerHTML = '';
    await fetchImages();
}
async function onLoadMore() {
    page += 1;
    await fetchImages();
    smoothScroll();
}
async function fetchImages() {
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}&page=${page}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        if (data.hits.length === 0) {
            loadMoreBtn.style.display = 'none';
            return;
        }
        createMarkup(data.hits);
        if (data.totalHits > page * PER_PAGE) loadMoreBtn.style.display = 'block';
        else loadMoreBtn.style.display = 'none';
    } catch (error) {
        console.log(error);
    }
}
function createMarkup(images) {
    const markup = images.map((image)=>{
        return `
      <li>
        <div class="photo-card">
          <img
            src="${image.webformatURL}"
            alt="${image.tags}"
          />

          <div class="stats">
            <p class="stats-item">
              <i class="material-icons">thumb_up</i>
              ${image.likes}
            </p>

            <p class="stats-item">
              <i class="material-icons">visibility</i>
              ${image.views}
            </p>

            <p class="stats-item">
              <i class="material-icons">comment</i>
              ${image.comments}
            </p>

            <p class="stats-item">
              <i class="material-icons">cloud_download</i>
              ${image.downloads}
            </p>
          </div>
        </div>
      </li>
    `;
    }).join('');
    gallery.insertAdjacentHTML('beforeend', markup);
}
function smoothScroll() {
    const cards = document.querySelectorAll('.photo-card');
    if (cards.length === 0) return;
    const lastCard = cards[cards.length - 1];
    lastCard.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
    });
}

//# sourceMappingURL=miniprojectasync.816e7b21.js.map

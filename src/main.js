import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};

let page = 1;
let query;
let totalHits;

const viewImage = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionsDelay: 250,
});

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

async function onSearchFormSubmit(event) {
  event.preventDefault();

  query = event.currentTarget.elements.query.value.trim();
  page = 1;

  refs.gallery.innerHTML = '';
  refs.loader.classList.remove('visually-hidden');

  try {
    const data = await getImages(query);

    const dataImages = data.hits;
    if (dataImages.length === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        maxWidth: 350,
        color: '#a3b6fd',
        closeOnEscape: true,
        closeOnClick: true,
        position: 'topRight',
      });
    } else {
      totalHits = data.totalHits;
      renderImages(dataImages, refs.gallery);
      viewImage.refresh();

      if (totalHits > page * 15) {
        refs.loadMoreBtn.classList.remove('visually-hidden');
      }
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      maxWidth: 350,
      closeOnEscape: true,
      closeOnClick: true,
      position: 'topRight',
    });
  } finally {
    refs.loader.classList.add('visually-hidden');
    refs.searchForm.reset();
  }
}

async function onLoadMoreClick() {
  page += 1;
  refs.loader.classList.remove('visually-hidden');

  try {
    const data = await getImages(query, page);

    renderImages(data.hits, refs.gallery, true);
    viewImage.refresh();

    scrollCollection();

    if (totalHits <= page * 15) {
      refs.loadMoreBtn.classList.add('visually-hidden');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        maxWidth: 350,
        color: '#a3b6fd',
        closeOnEscape: true,
        closeOnClick: true,
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      maxWidth: 350,
      closeOnEscape: true,
      closeOnClick: true,
      position: 'topRight',
    });
  } finally {
    refs.loader.classList.add('visually-hidden');
  }
}

function scrollCollection() {
  const lastElementChild = refs.gallery.lastElementChild;
  const imageHeight = lastElementChild.getBoundingClientRect().height;
  window.scrollBy({
    top: imageHeight * 2,
    left: 0,
    behavior: 'smooth',
  });
}

export function renderImages(dataImages, container) {
  const imagesMarkup = dataImages
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery-item">
          <a href="${largeImageURL}" class="gallery-link">
            <img class="gallery-img" src="${webformatURL}" alt="${tags}" />
          </a>
          <ul class="img-stats">
            <li class="stat-item">
              <span class="stat-label">Likes</span>
              <span class="stat-value" data-likes>${likes}</span>
            </li>
            <li class="stat-item">
              <span class="stat-label">Views</span>
              <span class="stat-value" data-views>${views}</span>
            </li>
            <li class="stat-item">
              <span class="stat-label">Comments</span>
              <span class="stat-value" data-comments>${comments}</span>
            </li>
            <li class="stat-item">
              <span class="stat-label">Downloads</span>
              <span class="stat-value" data-downloads>${downloads}</span>
            </li>
          </ul>
        </li>`;
      }
    )
    .join('');

  container.insertAdjacentHTML('beforeend', imagesMarkup);
}

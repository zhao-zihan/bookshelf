class ResultsView {
  _data;
  _parentElement = document.querySelector(".results");
  _errorMessage = "No books found for your query!";
  _message = "";

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderLoadingBar() {
    const markup = `
    <div class="loading-bar">
    </div> 
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".bookmark__btn-small");
      if (!btn) return;

      btn.classList.toggle("bookmarked");
      const id = btn.dataset.id;
      handler(id);
    });
  }

  _generateImageMarkup(data) {
    if (data.image) {
      return `
      <img
        src="${data.image}"
        alt="${data.title}"
        class="preview__image"
      />
      `;
    } else {
      return `
      <img
        src="https://books.google.com/books/content?id=ptwvzgEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
        alt="${data.title}"
        class="preview__image"
      />
      `;
    }
  }

  _generatePublicationMarkup(result) {
    return `
    <div class="preview__info-publication">
    ${
      result.authors
        ? '<span class="preview__info-author">' + result.authors + "</span>"
        : ""
    }
    ${
      result.publisher
        ? '<span class="preview__info-publisher">(' +
          result.publisher +
          ")</span>"
        : ""
    }
    ${
      result.publishDate
        ? '<span class="preview__info-date">' + result.publishDate + "</span>"
        : ""
    }

    </div>
    `;
  }

  _generateVolumeInfoMarkup(result) {
    return `
    <div class="preview__info-volume-info">
      ${
        result.category
          ? '<div class="preview__info-category">' + result.category + "</div>"
          : ""
      }
      ${
        result.pageCount
          ? '<div class="preview__info-page">Page: ' +
            result.pageCount +
            "</div>"
          : ""
      }
      ${
        result.ISBN
          ? '<div class="preview__info-identifier">' + result.ISBN + "</div>"
          : ""
      }
    </div>
    `;
  }

  _generateMarkup() {
    return this._data
      .map(
        (result) => `
      <li class="preview">
      ${this._generateImageMarkup(result)}
      <div class="preview__info">
        <div class="title-box">
          <a
            href="${result.infoLink}"
            class="preview__title"
            target="_blank"
            >${result.title}</a
          >
          <button class="btn bookmark__btn-small" data-id=${result.id}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5 bookmark__icon"
          >
            <path
              fill-rule="evenodd"
              d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        </div>
        ${this._generatePublicationMarkup(result)}
        ${this._generateVolumeInfoMarkup(result)}
      </div>
      <div class="preview__ratings">
        <div class="rating-info">
          <div
            class="stars"
            style="--rating: ${result.rating ? result.rating : 0}"
            aria-label="Rating of this book is ${
              result.rating ? result.rating : 0
            } out of 5."
          ></div>
          <span class="rating-count">(${
            result.ratingCount ? result.ratingCount : 0
          })</span>
        </div>
        <div class="preview__btn">
          <a
            href="${result.previewLink}"
            class="preview__link"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5 preview__icon"
            >
              <path
                d="M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06v-11a.75.75 0 00-.546-.721A9.006 9.006 0 0015 3a8.963 8.963 0 00-4.25 1.065V16.82zM9.25 4.065A8.963 8.963 0 005 3c-.85 0-1.673.118-2.454.339A.75.75 0 002 4.06v11a.75.75 0 00.954.721A7.506 7.506 0 015 15.5c1.579 0 3.042.487 4.25 1.32V4.065z"
              />
            </svg>
            PREVIEW
          </a>
        </div>
      </div>
    </li>
      `
      )
      .join("");
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}

export default new ResultsView();

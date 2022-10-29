import View from "./view.js";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmark__list");
  _errorMessage = "No bookmarks yet.";

  _generateMarkup() {
    return this._data
      .map(
        (bookmark) => `
    <li class="bookmark__item">
      ${this._generateImageMarkup(bookmark)}
      <div class="bookmark__info">
      <a
      href="${bookmark.infoLink}"
      class="bookmark__title"
      target="_blank"
      >
      ${bookmark.title}</a>
      ${
        bookmark.mainAuthor
          ? '<span class="bookmark__author">' + bookmark.mainAuthor + "</span>"
          : ""
      }
       ${this._generatePreviewBtn(bookmark)}
      </div>
    </li>
    `
      )
      .join("");
  }

  _generateImageMarkup(data) {
    if (data.image) {
      return `
      <img
        src="${data.image}"
        alt="${data.title}"
        class="bookmark__image"
      />
      `;
    } else {
      return `
      <img
        src="https://books.google.com/books/content?id=ptwvzgEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
        alt="${data.title}"
        class="bookmark__image"
      />
      `;
    }
  }

  _generatePreviewBtn(data) {
    return `
    <div class="bookmark__preview-btn">
    <a
      href="${data.previewLink}"
      class="bookmark__preview-link"
      target="_blank"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-5 h-5 bookmark__preview-icon"
      >
        <path
          d="M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06v-11a.75.75 0 00-.546-.721A9.006 9.006 0 0015 3a8.963 8.963 0 00-4.25 1.065V16.82zM9.25 4.065A8.963 8.963 0 005 3c-.85 0-1.673.118-2.454.339A.75.75 0 002 4.06v11a.75.75 0 00.954.721A7.506 7.506 0 015 15.5c1.579 0 3.042.487 4.25 1.32V4.065z"
        />
      </svg>
      PREVIEW
    </a>
  </div>
    `;
  }
}

export default new BookmarksView();

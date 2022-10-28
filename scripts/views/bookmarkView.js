class BookmarkView {
  _parentElement = document.querySelector(".bookmark");

  toggleBookmarks() {
    this._parentElement
      .querySelector(".bookmark__list-container")
      .classList.toggle("open");
  }

  addHandlerOpenBookmarks(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".bookmark__btn");
      if (!btn) return;

      handler();
    });
  }
}

export default new BookmarkView();

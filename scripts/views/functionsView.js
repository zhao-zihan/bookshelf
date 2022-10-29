class FunctionsView {
  _parentElement = document.querySelector(".function__box");

  displayFunctionLeftBox(resultCount) {
    this._parentElement.classList.add("open");
    this._parentElement.querySelector(
      ".result-count"
    ).textContent = `${resultCount} Results`;
  }

  addHandlerSwitchMode(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const checkbox = e.target.closest(".switch__input");
      if (!checkbox) return;

      handler();
    });
  }

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

export default new FunctionsView();

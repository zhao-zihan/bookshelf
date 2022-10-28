class SearchView {
  _parentElement = document.querySelector(".search__box");

  getQuery() {
    const query = this._parentElement.querySelector(".search__field").value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector(".search__field").value = "";
  }

  openCategoryBox() {
    this._parentElement
      .querySelector(".search__filter")
      .classList.toggle("open");
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  addHandlerSearchBy(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const selection = e.target.closest(".selection");
      if (!selection) return;

      const searchBy = selection.dataset.filter;
      handler(searchBy);
    });
  }

  addHandlerDisplaySelections(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".category__btn");
      if (!btn) return;

      handler();
    });
  }
}

export default new SearchView();

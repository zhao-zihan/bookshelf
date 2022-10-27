class SearchView {
  _parentElement = document.querySelector(".search__box");

  getQuery() {
    const query = this._parentElement.querySelector(".search__field").value;
    this._clearInput();
    return query;
  }

  getSearchBy() {
    const searchBy =
      this._parentElement.querySelector(".selections").dataset.searchBy;
    return searchBy;
  }

  _clearInput() {
    this._parentElement.querySelector(".search__field").value = "";
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

      const searchBy = selection.dataset.searchBy;
      handler(searchBy);
    });
  }
}

export default new SearchView();

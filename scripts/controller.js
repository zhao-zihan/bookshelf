import * as model from "./model.js";
import searchView from "./views/searchView.js";
import functionsView from "./views/functionsView.js";
import bookmarksView from "./views/bookmarksView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

const controlSearchResults = async function () {
  try {
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderLoadingBar();

    const searchBy = model.state.search.searchBy;

    await model.loadSearchResults(query, searchBy);

    functionsView.displayFunctionLeftBox(model.state.search.numResults);

    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlSearchType = async function (searchBy) {
  try {
    model.state.search.searchBy = searchBy;
    searchView.toggleCategoryBox();
    searchView.displaySearchPlaceholder(searchBy);
  } catch (error) {
    console.log(error);
  }
};

const controlCategoryBox = function () {
  searchView.toggleCategoryBox();
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlLightMode = function () {
  const mode = document.documentElement.getAttribute("color-mode");
  document.documentElement.setAttribute(
    "color-mode",
    `${mode === "light" ? "dark" : "light"}`
  );
};

const controlBookmarkBox = function () {
  functionsView.toggleBookmarks();
};

const controlAddBookmark = function (id) {
  const match = model.state.search.results.find((element) => element.id === id);
  const inLocal = model.state.bookmarks.find((element) => element.id === id);

  if (!match.bookmarked && !inLocal) {
    model.addBookmark(match);
  } else {
    model.deleteBookmark(id);
  }

  // 2) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  searchView.addHandlerSearchBy(controlSearchType);
  searchView.addHandlerDisplaySelections(controlCategoryBox);
  functionsView.addHandlerSwitchMode(controlLightMode);
  functionsView.addHandlerOpenBookmarks(controlBookmarkBox);
  resultsView.addHandlerAddBookmark(controlAddBookmark);
  paginationView.addHandlerClick(controlPagination);
};
init();

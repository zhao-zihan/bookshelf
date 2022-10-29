import * as model from "./model.js";
import searchView from "./views/searchView.js";
import functionView from "./views/functionView.js";
import bookmarkView from "./views/bookmarkView.js";
import resultsView from "./views/resultsView.js";

const controlSearchResults = async function () {
  try {
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderLoadingBar();

    const searchBy = model.state.search.searchBy;

    await model.loadSearchResults(query, searchBy);

    functionView.displayFunctionLeftBox(model.state.search.numResults);
    resultsView.render(model.getSearchResultsPage());
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

const controlLightMode = function () {
  const mode = document.documentElement.getAttribute("color-mode");
  document.documentElement.setAttribute(
    "color-mode",
    `${mode === "light" ? "dark" : "light"}`
  );
};

const controlBookmarkBox = function () {
  bookmarkView.toggleBookmarks();
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  searchView.addHandlerSearchBy(controlSearchType);
  searchView.addHandlerDisplaySelections(controlCategoryBox);
  functionView.addHandlerSwitchMode(controlLightMode);
  bookmarkView.addHandlerOpenBookmarks(controlBookmarkBox);
};
init();

import * as model from "./model.js";
import searchView from "./views/searchView.js";

const controlSearchResults = async function () {
  try {
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    const searchBy = model.state.search.searchBy;

    await model.loadSearchResults(query, searchBy);
  } catch (error) {
    console.log(error);
  }
};

const controlSearchType = async function (searchBy) {
  try {
    model.state.search.searchBy = searchBy;
    console.log(model.state);
  } catch (error) {
    console.log(error);
  }
};

const controlCategoryBox = async function () {
  searchView.openCategoryBox();
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  searchView.addHandlerSearchBy(controlSearchType);
  searchView.addHandlerDisplaySelections(controlCategoryBox);
};
init();
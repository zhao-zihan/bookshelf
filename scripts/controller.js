import * as model from "./model.js";
import searchView from "./views/searchView.js";

const controlSearchResults = async function () {
  try {
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    const searchBy = searchView.getSearchBy();

    await model.loadSearchResults(query, searchBy);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
};
init();

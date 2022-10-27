import { API_URL } from "./config.js";
import { MAX_RESULTS } from "./config.js";
import { RES_PER_PAGE } from "./config.js";
import { getJSON } from "./helper.js";

export const state = {
  book: {},
  search: {
    query: "",
    searchBy: "all",
    results: "",
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadSearchResults = async function (
  query,
  searchBy = state.search.searchBy
) {
  try {
    state.search.query = query;

    const url =
      searchBy === "all"
        ? `${API_URL}${query}&maxResults=${MAX_RESULTS}`
        : `${API_URL}${query} + ${searchBy}&maxResults=${MAX_RESULTS}`;

    const data = await getJSON(url);

    console.log(data);
  } catch (error) {
    throw error;
  }
};

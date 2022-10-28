import { API_URL } from "./config.js";
import { MAX_RESULTS } from "./config.js";
import { RES_PER_PAGE } from "./config.js";
import { getJSON } from "./helper.js";

export const state = {
  search: {
    query: "",
    numResults: 0,
    searchBy: "all",
    results: [],
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

    state.search.numResults = data.totalItems;

    state.search.results = data.items.map((item) => {
      return {
        id: item.id,
        title: item.volumeInfo.title,
        infoLink: item.volumeInfo.infoLink,
        image: item.volumeInfo.imageLinks?.smallThumbnail,
        authors: item.volumeInfo.authors?.join(", "),
        publisher: item.volumeInfo.publisher,
        publishDate: item.volumeInfo.publishedDate,
        pageCount: item.volumeInfo.pageCount,
        category: item.volumeInfo.categories?.[0],
        rating: item.volumeInfo.averageRating,
        ratingCount: item.volumeInfo.ratingsCount,
        previewLink: item.volumeInfo.previewLink,
        ISBN: item.volumeInfo.industryIdentifiers?.[0].identifier,
      };
    });
    state.search.page = 1;

    console.log(state.search);
    console.log(data);
  } catch (error) {
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9

  return state.search.results.slice(start, end);
};

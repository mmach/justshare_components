let QueryList = {
  Dictionary: {
    GET_DICTIONARY: "getDictionariesQuery"
  },
  Category: {
    GET_CATEGORIES: "getCategoryQuery",
    GET_CATEGORIES_HIERARCHY: "getCategoryTreeQuery",
    GET_CATEGORIES_FREETEXT: "getCategoryFreetextQuery",
    GET_CATEGORIES_ALL_TREE: "getCategoriesAllQuery"
  },
  CategoryOptions: {
    GET_OPTIONS_TYPE: "getCategoryOptionsTypeQuery",
    GET_CATEGORY_OPTION: "getCategoryOptionsQuery",
    GET_ALL_CETEGORIES_OPTIONS: "getAllCategoryOptionsQuery"
  },
  User: {
    LOG_IN_INTERNAL: "userLogInInternalQuery",
    LOG_IN_BY_REFRESH_TOKEN: "logInByRefreshTokenQuery",
    GET_REFRESH_TOKEN: "getRefreshTokenQuery",
    USER_INFO: "getUserInfoQuery",
    LOGIN_BY_EXTERNAL: "logInByExternalQuery"
  },
  Blob: {
    GET_BLOBS_BY_GUIDS: "getBlobsBase64ByGuidsQuery",
    GET_USER_IMAGES: "getUserImagesQuery",
    GET_UNVERIFIED: "getUnverifiedBlobsQuery"
  },
  Item: {
    GET_ITEM: "getItemQuery",
    SEARCH_ITEM: "searchItemQuery"
  },
  Country: {
    GET_COUNTRY: "getCountriesQuery",
    GET_COUNTRY_BY_ID: "getCountriesByIdQuery"
  },
  City: {
    GET_CITY: 'getCitiesQuery',
    REVERSE_GEO: 'reverseGeocodeQuery',
    REVERSE_LATLNG_GEO: 'geocodeQuery'
  }
};
export default QueryList;
//# sourceMappingURL=QueryList.js.map
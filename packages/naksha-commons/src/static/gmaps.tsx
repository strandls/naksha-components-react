// https://developers.google.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions

export const GMAPS_AUTOCOMPLETE_FIELDS = [
  "formatted_address",
  "geometry",
  "name",
];

export const GMAPS_LIBRARIES = {
  DEFAULT: ["drawing", "places"] as any,
  AUTOCOMPLETE: ["drawing", "places"] as any,
};

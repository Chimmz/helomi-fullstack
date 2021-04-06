export function getEmptyFields(dataObject) {
   return Object.entries(dataObject)
      .map(([key, val]) => !val && key)
      .filter(field => Boolean(field));
}

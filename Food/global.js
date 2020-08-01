function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
}

function loadMainRecipeRating(rating, element) {
  let prc = (rating / 5) * 100;
  let strPrc = "width: " + prc + "%";

  element.children[0].setAttribute('style',strPrc);
}

// "use strict";
// const fieldSorter = (fields) => (a, b) => fields.map(o => {
//     let dir = 1;
//     if (o[0] === '-') { dir = -1; o=o.substring(1); }
//     return a[o] > b[o] ? dir : a[o] < b[o] ? -(dir) : 0;
// }).reduce((p, n) => p ? p : n, 0);
const pegination_element = document.getElementById('pagination');
var current_page = 1;
var records_per_page = 8;
var listCardsMain = document.querySelectorAll(".card-columns");
var listMainRecipes = listRecipesJSON.recipes;
listMainRecipes.sort(compareValues('rating','desc'));
var listSortedRecipes;
let searchForm = document.querySelector('#searhForm');

searchForm.addEventListener("submit", (e) => { 
    e.preventDefault();
    searchListRecipes();
    removeActiveCategory();
    loadPageCards(listSortedRecipes.sort(compareValues('rating','desc')), listCardsMain, records_per_page, current_page);
    setupPagination(listSortedRecipes.sort(compareValues('rating','desc')), pegination_element, records_per_page);
    searchForm.reset();        
});

function searchListRecipes() {
    let searchInput = document.querySelector('#searchInput');
    let filter = searchInput.value.toUpperCase();
    let textValue;
    listSortedRecipes = [];
    let listIngredients;
    
    for (let i = 0; i < listMainRecipes.length; i++) {
        item = listMainRecipes[i];
        listIngredients = [];
        for (let j = 0; j < item.ingredients.length; j++) {
            listIngredients += item.ingredients[j].ingredient;
        }
        textValue = item.title + item.shortDirections + item.mediumDirections + item.directions + listIngredients;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            listSortedRecipes.push(item);
        }
    }
}

function getFoodCategory(categoryLink,category) {
    listSortedRecipes = [];
    let textValue;
    for (let i = 0; i < listMainRecipes.length; i++) {
        item = listMainRecipes[i];
        if (category == '') {
            listSortedRecipes.push(item);
        } else {       
            textValue = '';

            item.category.forEach(element => {
                textValue += element;
            });
            if (textValue.toUpperCase().indexOf(category.toUpperCase()) > -1) {
                listSortedRecipes.push(item);
            }
        }
    }
    current_page = 1;
    loadPageCards(listSortedRecipes.sort(compareValues('rating','desc')), listCardsMain, records_per_page, current_page);
    setupPagination(listSortedRecipes.sort(compareValues('rating','desc')), pegination_element, records_per_page);
    if (listSortedRecipes.length == 0) {

    } 
    removeActiveCategory();
    let activeLink = document.getElementById(categoryLink);
    activeLink.classList.add('act');
}

function removeActiveCategory() {
    let categoryLinks = document.getElementsByClassName('nav-item-category-link');
    for (let j = 0; j < categoryLinks.length; j++) {
        const element = categoryLinks[j];
        element.classList.remove('act');
    }
}

function loadPageCards(items, wrapper, rec_per_page, page) {
    // empty cards
    wrapper[0].innerHTML = "";
    page--;

    let start = rec_per_page * page;
    let end = start + rec_per_page;
    let paginatedItems = items.slice(start,end);
    for (let i = 0; i < paginatedItems.length; i++) {
        let item = paginatedItems[i];
        console.log(item);

        let divCard = document.createElement('div');
        divCard.classList.add('card');
        divCard.classList.add('card-food-main');
        divCard.classList.add('m-2');
        divCard.setAttribute('style','width: auto;');

        let a_img = document.createElement('a');
        a_img.classList.add('card-link');
        a_img.setAttribute('href','recipe.html?id=' + item.id);

        let card_img = document.createElement('img');
        card_img.classList.add('card-food-main-img');
        card_img.setAttribute('alt','Card image cap');
        card_img.setAttribute('src',item.imgURL + item.name + '_md.jpg');


        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        let cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');

        let linkTitle = document.createElement('a');
        linkTitle.setAttribute('href','recipe.html?id=' + item.id);
        linkTitle.innerHTML = item.title;

        let cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.innerHTML = item.shortDirections;

        let starRatings = document.createElement('div');
        starRatings.classList.add('star-ratings-css');

        let starRatingsTop = document.createElement('div');
        starRatingsTop.classList.add('star-ratings-css-top');
        starRatingsTop.setAttribute('style','width: 100%');

        let starRatingsBottom = document.createElement('div');
        starRatingsBottom.classList.add('star-ratings-css-bottom');

        let numberRatings = document.createElement('div');
        numberRatings.classList.add('number-ratings');
        numberRatings.classList.add('mt-2');

        let spanRating = document.createElement('span');
        spanRating.innerText = item.rating;
        let spanReview = document.createElement('span');
        spanReview.innerText = "(" + item.reviews.length + ")";

        let mainLink = document.createElement('div');
        mainLink.classList.add('card-food-main-link');
        mainLink.classList.add('mt-2');

        let mainALink = document.createElement('a');
        mainALink.classList.add('card-link');
        mainALink.setAttribute('href','recipe.html?id=' + item.id);
        mainALink.innerText = 'READ MORE';

        
        wrapper[0].appendChild(divCard);
        wrapper[0].children[i].appendChild(a_img);
        wrapper[0].children[i].children[0].appendChild(card_img);
        wrapper[0].children[i].appendChild(cardBody);
        wrapper[0].children[i].children[1].appendChild(cardTitle);
        wrapper[0].children[i].children[1].children[0].appendChild(linkTitle);
        wrapper[0].children[i].children[1].appendChild(cardText);
        wrapper[0].children[i].children[1].appendChild(starRatings);
        wrapper[0].children[i].children[1].children[2].appendChild(starRatingsTop);
        wrapper[0].children[i].children[1].children[2].appendChild(starRatingsBottom);
        wrapper[0].children[i].children[1].appendChild(numberRatings);
        wrapper[0].children[i].children[1].appendChild(mainLink);
        for (let j = 0; j < 5; j++) {
            let starSpan1 = document.createElement('span');
            starSpan1.innerText = '★';
            let starSpan2 = document.createElement('span');
            starSpan2.innerText = '★';
            wrapper[0].children[i].children[1].children[2].children[0].appendChild(starSpan1);
            wrapper[0].children[i].children[1].children[2].children[1].appendChild(starSpan2);
        }       
        loadMainRecipeRating(item.rating, wrapper[0].children[i].children[1].children[2]);
        wrapper[0].children[i].children[1].children[3].appendChild(spanRating);
        wrapper[0].children[i].children[1].children[3].appendChild(spanReview);
        wrapper[0].children[i].children[1].children[4].appendChild(mainALink);
    
    }
    if (items.length == 0) {
        wrapper[0].innerHTML = '<br><br><br><br><br><h4 style="width: max-content; color: royalblue;">Не е пронајден ниту еден рецепт од пребарувањето</h4><br><br><br><br><br>';
    }
}

function setupPagination(items, wrapper, rec_per_page) {
    wrapper.innerHTML = "";

    let page_count = Math.ceil(items.length / rec_per_page);
    for (let i = 1; i < page_count + 1; i++) {
        let btn = paginationButton(i, items);
        wrapper.appendChild(btn);
    }
}

function paginationButton(page, items) {
    let button = document.createElement('button');
    button.innerText = page;

    if (current_page == page) button.classList.add('active');

    button.addEventListener('click',function() {
        current_page = page;
        loadPageCards(items.sort(compareValues('rating','desc')), listCardsMain, records_per_page, current_page);

        let current_btn = document.querySelector('.pagenumbers button.active');
        current_btn.classList.remove('active');
        
        button.classList.add('active');
    });

    return button;
}

function loadCardMain() {
    listMainRecipes.sort(compareValues('rating','desc'));
    for (let i = 0; i < listCardsMain.length; i++) {
        // <a href="recipe.html?id=Recipe018" class="card-link"></a>
        listCardsMain[i].children[0].setAttribute('href','recipe.html?id=' + listMainRecipes[i].id);
        // <img class="card-food-main-img"
        listCardsMain[i].children[0].children[0].setAttribute('src',listMainRecipes[i].imgURL + listMainRecipes[i].name + '_md.jpg');
        // card-body a
        listCardsMain[i].children[1].children[0].children[0].setAttribute('href','recipe.html?id=' + listMainRecipes[i].id);
        listCardsMain[i].children[1].children[0].children[0].innerHTML = listMainRecipes[i].title;
        listCardsMain[i].children[1].children[1].innerHTML = listMainRecipes[i].shortDirections;
        loadMainRecipeRating(listMainRecipes[i].rating, listCardsMain[i].children[1].children[2]);
        listCardsMain[i].children[1].children[3].children[0].innerHTML = listMainRecipes[i].rating;
        listCardsMain[i].children[1].children[3].children[1].innerHTML = "(" + listMainRecipes[i].reviews.length + ")";
        // <a
        listCardsMain[i].children[1].children[4].children[0].setAttribute('href','recipe.html?id=' + listMainRecipes[i].id);
    }
};

function loadCardPopular() {
    let listCardsPopular = document.querySelectorAll(".card-food-popular");
    let listPopularRecipes = listRecipesJSON.recipes;
    listPopularRecipes.sort(compareValues('views'));
    for (let j = 0; j < listCardsPopular.length; j++) {
        // a
        listCardsPopular[j].children[0].setAttribute('href','recipe.html?id=' + listPopularRecipes[j].id);
        // img
        listCardsPopular[j].children[0].children[0].setAttribute('src',listPopularRecipes[j].imgURL + listPopularRecipes[j].name + '_sm.jpg');
        // title
        listCardsPopular[j].children[1].children[0].innerHTML = listPopularRecipes[j].title;
        // description
        listCardsPopular[j].children[1].children[1].innerHTML = listPopularRecipes[j].shortDirections;
        // a
        listCardsPopular[j].children[1].children[2].setAttribute('href','recipe.html?id=' + listPopularRecipes[j].id);
    }
};

function loadMediaFood() {
    let listMediaFood = document.querySelectorAll(".media-food");
    let listNewestRecipes = listRecipesJSON.recipes;
    listNewestRecipes.sort(compareValues('id', 'desc'));
    for (let k = 0; k < listMediaFood.length; k++) {
        // a
        listMediaFood[k].children[0].children[0].children[0].setAttribute('href','recipe.html?id=' + listNewestRecipes[k].id);
        // img
        listMediaFood[k].children[0].children[0].children[0].children[0].setAttribute('src',listNewestRecipes[k].imgURL + listNewestRecipes[k].name + '_lg.jpg');
        // title
        listMediaFood[k].children[0].children[1].children[0].innerHTML = listNewestRecipes[k].title;
        // description
        listMediaFood[k].children[0].children[1].children[1].innerHTML = listNewestRecipes[k].mediumDirections;
    }
};

$(document).ready(function () {
    loadPageCards(listMainRecipes.sort(compareValues('rating','desc')), listCardsMain, records_per_page, current_page);
    setupPagination(listMainRecipes.sort(compareValues('rating','desc')), pegination_element, records_per_page);
    loadCardPopular();
    loadMediaFood();
});
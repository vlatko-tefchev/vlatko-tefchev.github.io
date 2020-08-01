var recipeID, recipeName;
var mainRecipe;
var listReviewsWrapper = document.querySelector('#reviews-list');

function loadParams() {
        var url = document.location.href,
            params = url.split('?')[1].split('&'),
            data = {}, tmp;
        for (var i = 0, l = params.length; i < l; i++) {
             tmp = params[i].split('=');
             data[tmp[0]] = tmp[1];
        }
        // let imgSrc = "Images/"+data.id+"_lg.jpg"
        // document.getElementById('main-img').setAttribute("src",imgSrc);
    
        recipeID = data.id;
       
};

loadParams();

function loadCardPopular() {
    let listCardsPopular = document.querySelectorAll(".card-side-popular");
    for (let j = 0; j < listCardsPopular.length; j++) {
        // a
        listCardsPopular[j].children[0].setAttribute('href','recipe.html?id=' + listRecipesJSON.recipes[j].id);
        // img
        listCardsPopular[j].children[0].children[0].setAttribute('src',listRecipesJSON.recipes[j].imgURL + listRecipesJSON.recipes[j].name + '_sm.jpg');
        // title
        listCardsPopular[j].children[1].children[0].innerHTML = listRecipesJSON.recipes[j].title;
        // description
        listCardsPopular[j].children[1].children[1].innerHTML = listRecipesJSON.recipes[j].shortDirections;
        // a
        listCardsPopular[j].children[1].children[2].setAttribute('href','recipe.html?id=' + listRecipesJSON.recipes[j].id);
    }
};

loadCardPopular();

function loadCardNewest() {
    let listCardsNewest = document.querySelectorAll(".card-recipe-newest");
    let listNewestRecipes = listRecipesJSON.recipes;
    listNewestRecipes.sort(compareValues('id', 'desc'));

    for (let j = 0; j < listCardsNewest.length; j++) {
        // a
        listCardsNewest[j].children[0].setAttribute('href','recipe.html?id=' + listNewestRecipes[j].id);
        // img
        listCardsNewest[j].children[0].children[0].setAttribute('src',listNewestRecipes[j].imgURL + listNewestRecipes[j].name + '_sm.jpg');
        // title
        listCardsNewest[j].children[1].children[0].innerHTML = listNewestRecipes[j].title;
        // description
        listCardsNewest[j].children[1].children[1].innerHTML = listNewestRecipes[j].shortDirections;
        // a
        listCardsNewest[j].children[1].children[2].setAttribute('href','recipe.html?id=' + listNewestRecipes[j].id);
    }
};

loadCardNewest();


function loadMainRecipe() {
    
        mainRecipe = listRecipesJSON.recipes.filter(function (el) {
        return el.id == recipeID; 
        
        // &&
        //        el.sqft >= 500 &&
        //        el.num_of_beds >=2 &&
        //        el.num_of_baths >= 2.5;
    });

    var elRecipe = document.querySelector('#main-recipe');

    let imgSrc = mainRecipe[0].imgURL+mainRecipe[0].name+"_lg.jpg"
    elRecipe.children[0].children[0].children[0].setAttribute("src",imgSrc);
    elRecipe.children[1].children[0].innerHTML = mainRecipe[0].title;
    elRecipe.children[3].children[0].children[0].children[1].innerHTML = mainRecipe[0].level;
    elRecipe.children[3].children[1].children[0].children[1].innerHTML = mainRecipe[0].timeLength;
    elRecipe.children[3].children[2].children[0].children[1].innerHTML = mainRecipe[0].yield;
    // elRecipe.children[4].children[0].children[1]
    loadRecipeIngredients(mainRecipe[0].ingredients);
    elRecipe.children[4].children[1].children[1].innerHTML = mainRecipe[0].directions;
};

loadMainRecipe();

function loadRecipeIngredients(ingredients) {
    ingredients.forEach(element => {
        // console.log(element.ingredient);
        let li = document.createElement('li');
        li.setAttribute('class','li-ingredient');
        li.innerHTML = element.ingredient;
        let ingredientsElement = document.querySelector('#recipe-ingredients');
        ingredientsElement.appendChild(li);
    });
}

function loadListReviews(wrapper) {
    wrapper.innerHTML = "";

    if (mainRecipe[0].reviews.length > 0) {
        for (let i = 0; i < mainRecipe[0].reviews.length; i++) {
   
            let divReview = document.createElement('div');
            divReview.classList.add('review');
            divReview.classList.add('m-3');
            divReview.classList.add('p-3');

            let divReviewFrom = document.createElement('div');
            divReviewFrom.classList.add('review-from');
            divReviewFrom.innerHTML = '<b>Review by: </b>'+mainRecipe[0].reviews[i].user;

            let starRatings = document.createElement('div');
            starRatings.classList.add('star-ratings-css');

            let starRatingsTop = document.createElement('div');
            starRatingsTop.classList.add('star-ratings-css-top');
            starRatingsTop.setAttribute('style','width: 100%');

            let starRatingsBottom = document.createElement('div');
            starRatingsBottom.classList.add('star-ratings-css-bottom');

            let divReviewText = document.createElement('div');
            divReviewText.classList.add('review-text');
            divReviewText.classList.add('my-3');
            divReviewText.innerHTML = mainRecipe[0].reviews[i].review;

            let recipeLikes = document.createElement('div');
            recipeLikes.classList.add('recipe-likes');

            let linkLikes = document.createElement('a');
            linkLikes.classList.add('recipe-likes-link');
            linkLikes.setAttribute('href','#');

            let spanLike = document.createElement('span');
            spanLike.innerText = 'Like';


            wrapper.appendChild(divReview);
            wrapper.children[i].appendChild(divReviewFrom);
            wrapper.children[i].appendChild(starRatings);
            wrapper.children[i].children[1].appendChild(starRatingsTop);
            wrapper.children[i].children[1].appendChild(starRatingsBottom);
            for (let j = 0; j < 5; j++) {
                let starSpan1 = document.createElement('span');
                starSpan1.innerText = '★';
                let starSpan2 = document.createElement('span');
                starSpan2.innerText = '★';
                wrapper.children[i].children[1].children[0].appendChild(starSpan1);
                wrapper.children[i].children[1].children[1].appendChild(starSpan2);
            }  
            loadMainRecipeRating(mainRecipe[0].reviews[i].rate, wrapper.children[i].children[1]);
            wrapper.children[i].appendChild(divReviewText);
            wrapper.children[i].appendChild(recipeLikes);
            wrapper.children[i].children[3].appendChild(linkLikes);
            wrapper.children[i].children[3].children[0].appendChild(spanLike);
        }
    }
}

loadListReviews(listReviewsWrapper);
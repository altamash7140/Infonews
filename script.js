const API_KEY = "90c55f35e2164cf5adc509f4d2f94117"
const url = "https://newsapi.org/v2/everything?q="

window.addEventListener("load", () => fetchNews("India"));

// on clicking on logo window will relode using this function

function reload(){
    window.location.reload();
}
async function fetchNews(query) {
    const response = await fetch(`${url}${query}&apikey=${API_KEY}`)
    const data = await response.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardContainer = document.getElementById('card-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardContainer.innerHTML = "";

    articles.forEach(article => {
        // if article has no image then it will not be displayed
        if(!article.urlToImage) return;
        // card cloning
        const cardClone = newsCardTemplate.content.cloneNode(true);
        // calling fillDataInCard function, before appending the cards
        fillDataInCard(cardClone, article);
        // appending each card
        cardContainer.appendChild(cardClone);
    });
}

// function for filling data in cards
function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img'); 
    const newsTitle = cardClone.querySelector('#news-title'); 
    const newsSource = cardClone.querySelector('#news-source'); 
    const newsDesc = cardClone.querySelector('#news-description');
    
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click", () =>{
         window.open(article.url, "_blank");
    });
}
let currentSelectedNav = null;
function onNavClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = navItem;
    currentSelectedNav?.classList.add('active');
}

const searchBtn = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchBtn.addEventListener("click", () =>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    currentSelectedNav.classList.remove('active');
    currentSelectedNav = null;

})
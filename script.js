/*
whatever user search fromthat keyword image will be appear on our site.
-we fetch that images from Unsplash.com --->ue its API
1.create account on unsplach.com
2.under product section ---> Developr/API ---> Your Apps ---> New Application
---> check all boxes+accept terms&Cond --->Enter some details of project -->keys (Access Key;twv-cOxX-dkoAUYpHn-b3Gl0aAur8xOnvvRC12wD_sg) use it

*/


const accessKey = "twv-cOxX-dkoAUYpHn-b3Gl0aAur8xOnvvRC12wD_sg";

//imp html elements: 
const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

//2 variables 
let inputData="";  //image name ---> user entered input
let page=1; //when show more is clicked page no will update

async function searchImages() {
  inputData = searchInputEl.value;
  //api will fetch that inputData(user entered string) on unsplash.com
    //dynamic url 

  if(inputData.trim()){
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();   //all the data in json format 
    
    //page no
    if (page === 1) {
      searchResultsEl.innerHTML = "";
    }

    const results = data.results;//converts json data into variable

    //results contains allimages an text data need to fetch it so use map method.
    results.map((result) => 
    {
      //creating images-text div over here
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("search-result");
      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description;
      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.textContent = result.alt_description;

      //now appends thise elemenst to html --> appendChild();
      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      searchResultsEl.appendChild(imageWrapper);
    });

    //if page increase
    page++;

    if (page > 1) {
      showMoreButtonEl.style.display = "block";
    }
  }
}


//add event listener 
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});
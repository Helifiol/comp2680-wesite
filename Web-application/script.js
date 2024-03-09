const container = document.getElementById("content")

var header = document.getElementById("header");
var nav = document.getElementById("nav");    
var sticky = header.offsetTop + header.offsetHeight;
function stickyNav() {
    if (window.pageYOffset > sticky) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
}
window.onscroll = function() {
    stickyNav();
};

async function getNews(topic){
    const apiURL = `https://newsdata.io/api/1/news?apikey=pub_38926fa30fc9d8584a88993e02d121f9786a9&q=${topic}&language=en`;

    const response = await fetch(apiURL);
    if(!response.ok){
        throw new Error("Could not fetch data");
    }
    return await response.json();
}

// function displayTickerTape(data){
//     data.results.forEach(element =>{
//         const tickerContainerDiv = document.createElement("div")
//         tickerContainerDiv.classList.add("ticker-container")

//         const uListDiv = document.createElement("ul")
//         uListDiv.className("ticker-items")

//         const listitemelement =document.createElement("li")
//         listitemelement.textContent = element.title;

//         tickerContainerDiv.appendChild(uListDiv)
//         uListDiv.appendChild(listitemelement)
//     })
// }

function displayInfo(data){
    container.innerHTML = "" 
    data.results.forEach(element => {
        console.log(element);
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article');

        const titleElement = document.createElement("h2");
        titleElement.textContent = element.title

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = element.description

        const readMoreElement = document.createElement('a');
        readMoreElement.textContent = 'Read More';
        readMoreElement.href = element.link;
        readMoreElement.target = '_blank';

        const pubDateElement = document.createElement('p');
        pubDateElement.textContent = element.pubDate;

        const countryElement = document.createElement('p')
        countryElement.textContent = element.country;

        const imgElement = document.createElement('img');
        imgElement.src = element.image_url;

        articleDiv.appendChild(titleElement)
        articleDiv.appendChild(imgElement)
        articleDiv.appendChild(descriptionElement)
        articleDiv.appendChild(readMoreElement)
        articleDiv.appendChild(pubDateElement)
        articleDiv.appendChild(countryElement)

        container.appendChild(articleDiv);
    });
    document.getElementById("loading").style.display = 'none';
}

function display_initial(data){
    data.results.forEach(element => {
        console.log(element);
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article');

        const titleElement = document.createElement("h2");
        titleElement.textContent = element.title

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = element.description

        const readMoreElement = document.createElement('a');
        readMoreElement.textContent = 'Read More';
        readMoreElement.href = element.link;
        readMoreElement.target = '_blank';

        const pubDateElement = document.createElement('p');
        pubDateElement.textContent = element.pubDate;

        const countryElement = document.createElement('p')
        countryElement.textContent = element.country;

        const imgContainerDiv = document.createElement("div")
        imgContainerDiv.classList.add("imgContainer")

        const imgElement = document.createElement('img');
        imgElement.src = element.image_url;

        articleDiv.appendChild(titleElement)
        articleDiv.appendChild(imgContainerDiv)
        imgContainerDiv.appendChild(imgElement)
        articleDiv.appendChild(descriptionElement)
        articleDiv.appendChild(readMoreElement)
        articleDiv.appendChild(pubDateElement)
        articleDiv.appendChild(countryElement)
        container.appendChild(articleDiv);
    }); 
}


const tickerList = document.querySelector('.ticker-items');

let totalWidth = 0;
tickerList.querySelectorAll('li').forEach(item => {
  totalWidth += item.offsetWidth;
});

const scrollDuration = totalWidth / 50;

const animationStyle = document.querySelector('.ticker-items').style;
animationStyle.animationDuration = `${scrollDuration}s`;


async function main(){
    const init_data = await getNews('topnews')
    display_initial(init_data)
    // displayTickerTape(init_data)
    let searchInput = document.getElementById("search_input")
    let search_button = document.getElementById("search_button")

    searchInput.addEventListener('keypress', async function(event){
        if(event.key == 'Enter'){
            let searchItem = searchInput.value;
            // document.getElementById("about").style.display = "none";
            document.getElementById("content").innerHTML=""
            document.getElementById("loading").style.display = 'block';
            const data = await getNews(searchItem)
            displayInfo(data) 
        }
    })

    search_button.addEventListener("click", async function(){
        try {
            let searchItem = searchInput.value;
            console.log('Search term:', searchItem); // Debugging
            // Clear existing content and display loading indicator
            container.innerHTML = "";
            document.getElementById("loading").style.display = 'block';
            const data = await getNews(searchItem);
            console.log('Fetched data:', data); // Debugging
            displayInfo(data);
        } catch (error) {
            console.error('Error fetching and displaying data:', error);
            // Handle errors gracefully, e.g., display an error message to the user
        }
    });
    

    // const data = await getNews('tesla')
    // displayInfo(data)
}

main()

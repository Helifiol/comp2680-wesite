const container = document.getElementById("content")

try{
    var header = document.getElementById("header");
    var nav = document.getElementById("nav");    
    var sticky = header.offsetTop + header.offsetHeight;
}catch(error){
    console.log(error);
}
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
    let apiURL;
    if(topic == null){
        apiURL = "https://newsdata.io/api/1/news?apikey=pub_38926fa30fc9d8584a88993e02d121f9786a9&language=en"
    }else{
        apiURL = `https://newsdata.io/api/1/news?apikey=pub_38926fa30fc9d8584a88993e02d121f9786a9&q=${topic}&language=en`;
    }
    
    console.log(topic);
    const response = await fetch(apiURL);
    if(!response.ok){
        throw new Error("Could not fetch data");
    }
    return await response.json();
}
var darkMode = false;
function darkmode(){
    var element = document.body;
    var img = document.getElementById("theme-img");
    element.classList.toggle("dark-mode");
    
    darkMode = !darkMode;
    if(darkMode){
        img.src = "icons/dark.png";
    }else{
        img.src = "icons/light.svg"
    }
}

function truncate(str) {
    if(str != null){
        return str.split(" ").splice(0,100).join(" ");
    }else{
        return "No Data Found"
    }
}

function displayTickerTape(data){
    console.log('displaying');
    let listElement = document.getElementById("ticker-taper");
    listElement.innerHTML="";
    data.results.forEach(element =>{
        var item = document.createElement("li");
        item.textContent = element.title;
        listElement.appendChild(item)
    }) 
    console.log('done');
    ticker_ainmation()
}

function displayInfo(data){
    let articles = []
    container.innerHTML = "" 
    // displayTickerTape(data)
    document.getElementById("ticker-taper").style.display = 'none';
    document.querySelector(".ticker-container").style.display = 'none';

    data.results.forEach(element => {
        if(!articles.includes(element.title)){
            console.log(element);
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('article');

            const titleElement = document.createElement("h2");
            titleElement.textContent = element.title

            const descriptionElement = document.createElement('p');
            // console.log(typeof(element.description));
            // descriptionElement.textContent = element.description
            descriptionElement.textContent = truncate(element.description)

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

            const imgloadingAnimationDiv = document.createElement("div");
            imgloadingAnimationDiv.classList.add("loader-img");
            imgloadingAnimationDiv.id = "loadingAnimation";

            const imgElement = document.createElement('img');
            imgElement.id = "Image"; 
            // imgElement.src = element.image_url;
            imgElement.style.display = "none";
            if(element.image_url){
                imgElement.src = element.image_url;
                imgElement.onload = function() {
                    imgElement.style.display = "block";
                    imgloadingAnimationDiv.style.display = "none";
                }
            }else{
                imgloadingAnimationDiv.style.display = "block"
            }

            articleDiv.appendChild(titleElement);
            articleDiv.appendChild(imgContainerDiv);
            imgContainerDiv.appendChild(imgElement);
            imgContainerDiv.appendChild(imgloadingAnimationDiv) 
            articleDiv.appendChild(descriptionElement);
            articleDiv.appendChild(readMoreElement);
            articleDiv.appendChild(pubDateElement);
            articleDiv.appendChild(countryElement);
            container.appendChild(articleDiv);
        }
    });
    document.getElementById("loading").style.display = 'none';
    // ticker_ainmation()
}

function display_initial(data){
    let articles = [];
    data.results.forEach(element => {
        console.log(element);
        if(!articles.includes(element.title)){
            articles.push(element.title);
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('article');

            const titleElement = document.createElement("h2");
            titleElement.textContent = element.title

            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = truncate(element.description)
            // descriptionElement.textContent = element.description

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

            const imgloadingAnimationDiv = document.createElement("div");
            imgloadingAnimationDiv.classList.add("loader-img");
            imgloadingAnimationDiv.id = "loadingAnimation";
            
            const imgElement = document.createElement('img');
            imgElement.id = "Image";
            imgElement.src = element.image_url;
            imgElement.style.display = "none";
            if(element.image_url){
                imgElement.onload = function() {
                    imgElement.style.display = "block";
                    imgloadingAnimationDiv.style.display = "none";
                }
            }else{
                imgloadingAnimationDiv.style.display = "block"
            }
            

            articleDiv.appendChild(titleElement)
            articleDiv.appendChild(imgContainerDiv)
            imgContainerDiv.appendChild(imgElement)
            imgContainerDiv.appendChild(imgloadingAnimationDiv)
            articleDiv.appendChild(descriptionElement)
            articleDiv.appendChild(readMoreElement)
            articleDiv.appendChild(pubDateElement)
            articleDiv.appendChild(countryElement)
            container.appendChild(articleDiv);
        }
        
    }); 
    // document.getElementById("loading").style.display = 'block';
}
// ticker taper animation
function ticker_ainmation(){
    let tickerList = document.querySelector('.ticker-items');

    let totalWidth = 0;
    tickerList.querySelectorAll('li').forEach(item => {
      totalWidth += item.offsetWidth;
    });
    
    let scrollDuration = totalWidth / 50;
    
    let animationStyle = document.querySelector('.ticker-items').style;
    animationStyle.animationDuration = `${scrollDuration}s`;
    animationStyle.animationIterationCount = "infinite";
}


//about iframe async load

function loadIframeAsync(url, containerId) {
    var iframe = document.createElement('iframe');
    
    iframe.src = url;

    iframe.width = "100%";
    iframe.height = "600";

    var container = document.getElementById(containerId);
    container.appendChild(iframe);
}



async function main(){

    try{
        var searchInput = document.getElementById("searchinput");
        var resultsDiv = document.getElementById('results');
        function updateResults() {
            resultsDiv.textContent = input.value;
        }
        searchInput.addEventListener('keypress',async function(event){
            if(event.key === 'Enter'){
                let searchstock = searchstock.value;
                window.onload = function() {
                    console.log(searchstock);
                    loadIframeAsync(`https://jika.io/embed/area-chart?symbol=${searchstock}&selection=one_month&closeKey=close&boxShadow=true&graphColor=1652f0&textColor=161c2d&backgroundColor=FFFFFF&fontFamily=Nunito`, 'results');
                };
            }
        }) 
    }catch(error){
        console.log(error);
    }
    
    !function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://weatherwidget.io/js/widget.min.js';
            
            // js.style.display = 'none';
            
            fjs.parentNode.insertBefore(js, fjs);
        }
    }(document, 'script', 'weatherwidget-io-js');    
    try{
        document.getElementById("loading").style.display = 'block'; 
        const init_data = await getNews('null');
        document.getElementById("loading").style.display = 'none'; 
        displayTickerTape(init_data);
        display_initial(init_data);
        // displayTickerTape(init_data)
        let searchInput = document.getElementById("search_input")
        let search_button = document.getElementById("search_button")

        searchInput.addEventListener('keypress', async function(event){
            if(event.key == 'Enter'){
                let searchItem = searchInput.value;
                // document.getElementById("about").style.display = "none";
                document.getElementById("content").innerHTML=""
                document.getElementById("ticker-taper").style.display = 'none'
                document.getElementById("loading").style.display = 'block';
                const data = await getNews(searchItem)
                displayInfo(data) 
                // displayTickerTape(data)
            }
        })

        search_button.addEventListener("click", async function(){
            try {
                let searchItem = searchInput.value;
                console.log('Search term:', searchItem); 
                container.innerHTML = "";
                document.getElementById("loading").style.display = 'block';
                document.getElementById("ticker-taper").style.display = 'none'
                const data = await getNews(searchItem);
                console.log('Fetched data:', data); 
                displayInfo(data);
            } catch (error) {
                console.error('Error fetching and displaying data:', error);
            }
        });
        addEventListener("click", async function(event){
            if(event.target.classList.contains("headings")){
                event.preventDefault();
                console.log(event);
                try {
                    let searchItem = event.target.textContent;
                    container.innerHTML = "";
                    document.getElementById("loading").style.display = 'block';
                    document.getElementById("ticker-taper").style.display = 'none'
                    const data = await getNews(searchItem);
                    console.log('Fetched data:', data); 
                    displayInfo(data);
                } catch (error) {
                    console.error('Error fetching and displaying data:', error);
                } 
            }
            
        }) 
    }catch(error){
        console.log(error);
    }

    
}

main()

let search = document.querySelector(".search")
let btn = document.querySelector("button")
let output = document.querySelector(".output")
let secBtn  =document.querySelector(".show")
let accessKey = "zWMBo3uSIGZ4gkG21YAEr-QzvcUyPW9kdmdJ8KdcG7w"
let keyword = ''
let page = 1 ;
async function getImages() {
    keyword = search.value ;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`
    const response = await fetch(url) ;
    const data = await response.json()
    const results = data.results ;

    if (results.length === 0) {
        secBtn.style.display = "none"; 
        output.innerHTML = '<p> No images found for the given keyword. Please try a different one. </p>';
        return; // Exit if no results are found
    }
    
    results.forEach((e) => {
                    const image = document.createElement("img");
                    image.style.height = "55vh"
                    image.style.width = "50vh"
                    image.style.borderRadius = "1vh"
                    image.style.objectFit = "cover"
                    image.style.objectPosition = "center"
                    image.src = e.urls.small;
                    const imageLink = document.createElement("a");
                    imageLink.href = e.links.html;
                    imageLink.target = "_blank";
                    imageLink.appendChild(image);
                    output.appendChild(imageLink);
    })
    secBtn.style.display = "block";
}

btn.addEventListener("click", () => {
    output.innerHTML = ''; // Clear output
    secBtn.style.display = "none"; // Hide the button
    page = 1; // Reset page number
});

btn.addEventListener("click", getImages);
secBtn.addEventListener("click", ()=>{
    page++
    getImages()
});


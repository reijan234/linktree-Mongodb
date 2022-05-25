const linksContainer = document.querySelectorAll(".public_linksContainer");
linksContainer.forEach(links => {
    links.addEventListener("click", () => {
        console.log(links)
    })
});


console.log("foi")
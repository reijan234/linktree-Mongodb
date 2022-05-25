const buttonCreat = document.querySelector(".creat");
const FatherLinks = document.querySelector(".user_main-readyLinksArea");



buttonCreat.addEventListener("click", creat);
let IdUser = document.querySelector("header").id

async function creat(){
    const name = document.querySelector(".linkCreation-nameLink"),
          url = document.querySelector(".linkCreation-urlLink"),
          Image = document.querySelector(".uploadImg"),
          imagePreview = document.getElementById("imageCreat"),
          uploadImg_label = document.querySelector(".uploadImg-label"),
          imageCreat_clearEntry = document.querySelector(".imagePreview-remove"),
          nameImg_label = document.querySelector(".imagePreview-name"),
          label_Icon = document.querySelector(".uploadImg-label-icon"),
          label_name = document.querySelector(".uploadImg-label-nameUpload");


    let ImageLink;
    let nameLink = name.value;
    let urlLink = url.value;
    let ImageFiles = Image.files[0];
    
    if(ImageFiles != undefined && nameLink != "" && urlLink != "") {
        let formData = new FormData();
        formData.append("avatar", ImageFiles);

        sendMethods = {
            method: 'POST',
            mode: 'cors',
            body: formData,
        }

        const send = await fetch(`http://localhost:3001/link/image/creat`, sendMethods);
        let data = await send.json();
        ImageLink = data; 
    }
    


    if(nameLink != "" && urlLink != ""){
        myinit = {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({
                IdUser,
                nameLink, 
                urlLink,
                ImageLink,
            })
        }

        const send = await fetch(`http://localhost:3001/link/creat`, myinit);
        let data = await send.json();
        linkcreat(data);
        name.classList.remove("borderRed");
        url.classList.remove("borderRed");

        name.value = "";
        url.value = "";
        Image.value = "";
        uploadImg_label.classList.remove("previewImage-creat")
        imagePreview.style.display = "none";
        nameImg_label.style.display = "none";
        imageCreat_clearEntry.style.display = "none"
        imagePreview.src = "";
        imagePreview.alt = "";
        label_Icon.style.display = "flex";
        label_name.style.display = "flex";
        
    }

    if(nameLink == ""){
        name.classList.add("borderRed")
        name.placeholder = "Nome do link e necessesario"
    }
    if(urlLink == ""){
        url.classList.add("borderRed")
        url.placeholder = "Url do link e necessesario"
    }
}

function linkcreat(data){
    const firstChild = document.querySelector(".user_main-readyLinksArea-firstChild")
    let linkContainer = document.createElement("li");
    linkContainer.classList.add("list-link-Container");
    linkContainer.classList.add("ui-sortable-handle");
    linkContainer.id = data._id;
    FatherLinks.insertAdjacentElement("afterbegin",linkContainer);

   

    let i = 0;
    let nameContainerLinks = [
        "iconDrag",
        "nameLink",
        "trash",
    ]

    while(i < 3){    
        let Divs = document.createElement("div");

        if(i == 0 || i == 2){
            let icons = document.createElement("span");
            icons.classList.add("material-icons");

            if(i == 0){
                icons.innerHTML = "drag_indicator"
            }

            if(i == 2){
                icons.innerHTML = "delete"
                
                Divs.addEventListener('click', () => {
                    let card = Divs.parentNode
                    openModalTrash(card)
                })
            }
            Divs.appendChild(icons);
        }

        if(i == 1){
            Divs.classList.add(`list-link-Container-${nameContainerLinks[i]}`);
            Divs.innerHTML = data.nameLink
            Divs.addEventListener('click', () => {getLink(Divs)})
        }

        Divs.classList.add(`list-link-Container-${nameContainerLinks[i]}`);
    
        
        linkContainer.appendChild(Divs);
        i++
    }

    i = 0;
}
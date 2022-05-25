const imageCreat = document.getElementById("imageCreat"),
      inputFile_create = document.querySelector(".uploadImg"),
      imageCreat_clearEntry = document.querySelector(".imagePreview-remove"),
      imagePreview_name = document.querySelector(".imagePreview-name"),
      uploadImg_label = document.querySelector(".uploadImg-label"),
      label_Icon = document.querySelector(".uploadImg-label-icon"),
      label_name = document.querySelector(".uploadImg-label-nameUpload"),
      createInputName = document.querySelector(".linkCreation-nameLink"),
      createInputUrl = document.querySelector(".linkCreation-urlLink"),
      imgModalEdit = document.querySelector(".imgModalEdit"),
      main = document.querySelector("main");
    //   style_modal = document.querySelector(".style-modal");

inputFile_create.addEventListener("change", ({target}) => {
    let file = target.files[0];
    let name = file.name;
    let resumeName = "";
    let lengthCharacter = 18
    let endText = "";

    var largura = window.document.documentElement.clientWidth

    if(largura <= 600 && largura >= 500) {
        lengthCharacter = 10
    }

    if(largura <= 500 && largura >= 300) {
        lengthCharacter = 6
    }
    if(largura >= 300){
        if(lengthCharacter >= name.length){
            lengthCharacter = name.length
        }
        if(lengthCharacter < name.length){
            endText = "..."
        }
    
        for (let i = 0; i < lengthCharacter; i++) {
            resumeName = resumeName + name[i]
        }
    }
    console.log(imageCreat_clearEntry.style.display)

    let reader = new FileReader();
    if (file && file.type.match('image.*')){
        reader.readAsDataURL(file);
        previewImage(true)
        
        
        
        if(largura >= 300){
        imagePreview_name.innerHTML = `${resumeName}${endText}`;
        }
        
        
    }
   
    reader.onload = () => {
        imageCreat.src = reader.result;
        imageCreat.alt = file.name;
    }
})



function uploadImgEdit(target,  modalEdit_image_uploadLabel, p){
    let imgModalEdit = document.querySelector(".imgModalEdit")

    let file = target.files[0];
    let reader = new FileReader();
    if (file && file.type.match('image.*')){
        reader.readAsDataURL(file);
    }

    reader.onload = () =>{

        if(imgModalEdit == undefined || imgModalEdit == null){
            imgModalEdit = document.createElement("img");
            imgModalEdit.classList.add("imgModalEdit");
            imgModalEdit.alt = "Icone do link";
            modalEdit_image_uploadLabel.appendChild(imgModalEdit);
            p.style.display = "none"
        }

        imgModalEdit.src = reader.result;
        imgModalEdit.alt = file.name;
    }

}

imageCreat_clearEntry.addEventListener("click", clearEntry)

function clearEntry(){
    console.log("foi")
    inputFile_create.value = ""
    previewImage(false)
}

function previewImage(view){
    
    let flex = "flex";
    let none = "none";


    if(view == false){
        flex = "none";
        none = "flex";
        uploadImg_label.classList.remove("previewImage-creat");
    }else{
        uploadImg_label.classList.add("previewImage-creat");
    }


    imageCreat.style.display = flex;
    imagePreview_name.style.display = flex;
    imageCreat_clearEntry.style.display = flex;
    label_Icon.style.display = none;
    label_name.style.display = none;
}


// style_modal.addEventListener("click", created_styleModal)

function created_styleModal(){
    

    let styleModal = document.createElement("section");
    styleModal.classList.add("styleModal-father");
    main.appendChild(styleModal);

    let styleModal_container = document.createElement("div");
    styleModal_container.classList.add("styleModal-container");
    styleModal.appendChild(styleModal_container);

    let areaEmpy = [
        "top",
        "rigth",
        "left",
        "bottom",
    ]

    for (let i = 0; i < 4; i++) {
        let Divs = document.createElement("div")
        Divs.classList.add(`style-${areaEmpy[i]}`) 
        Divs.classList.add("empy-style")
        styleModal.appendChild(Divs)
    }  

    let empy_style = document.querySelectorAll(".empy-style")
    empy_style.forEach(el => {
        el.addEventListener("click", () => {
            styleModal.remove()
        })
    });

    let editStyle = [
        "Config-container",
        "Preview-container",
    ]

    let editStyle_child = [
        "Background",
        "Perfil",
        "Links",
    ]

    for (let i = 0; i < 2; i++) {
        let Divs = document.createElement("div");
        Divs.classList.add(`style-${editStyle[i]}`);      
        styleModal_container.appendChild(Divs);

        if(i == 0){
            for (let i = 0; i < 3; i++) {
                let DivsChild = document.createElement("div")
                DivsChild.classList.add(`style-Config-${editStyle_child[i]}`);
                DivsChild.classList.add("edit-styles");
                Divs.appendChild(DivsChild);

                let title_container = document.createElement("div");
                title_container.classList.add("style-title-container");
                DivsChild.appendChild(title_container);

                let title = document.createElement("h3");
                title.innerHTML = `${editStyle_child[i]}`
                title_container.appendChild(title)
            }
        }

    }
   
}


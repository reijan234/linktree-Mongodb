const body = document.querySelector("body");
const NameLink = document.querySelectorAll(".list-link-Container-nameLink");

NameLink.forEach(Names => {
    Names.addEventListener('click', ()=>{
       
        
        getLink(Names)
        
        
    })
})

async function getLink(Names){
    let card = Names.parentNode
    let IdLink = card.id

    let send = await fetch(`http://localhost:3001/link/find?IdUser=${IdUser}&IdLink=${IdLink}`)
    let data = await send.json()
    creatModalEdit(data[0], Names)
}

function creatModalEdit(data, Names){
    
    let ContainerModalEdit = document.createElement("section");
    ContainerModalEdit.classList.add("Container-ModalEdit");
    body.appendChild(ContainerModalEdit);

    nameAreaNull = [
        "hearder",
        "left",
        "right",
        "footer"
    ]

    for (let i = 0; i < 4; i++) {
        let areaEmpty = document.createElement("section");
        areaEmpty.classList.add(`null${nameAreaNull[i]}`);
        ContainerModalEdit.appendChild(areaEmpty);

        areaEmpty.addEventListener("click", removeModalEdit)
    }

    let ModalEdit_father = document.createElement("section");
    ModalEdit_father.classList.add("ModalEdit-father");
    ModalEdit_father.id = data._id
    ContainerModalEdit.appendChild(ModalEdit_father);

    let textEdit = document.createElement("h1");
    textEdit.classList.add("textEdit");
    textEdit.innerHTML = "Editar link"
    ModalEdit_father.appendChild(textEdit);

    let nameInput = ["nameLink-ModalEdit", "urlLink-ModalEdit"];

        for (let i = 0; i < 2; i++) {
            let inputs = document.createElement("input");
            inputs.classList.add(`ModalEdit-input`)
            inputs.classList.add(`${nameInput[i]}`)
            if (i == 0) {
                inputs.value = data.nameLink
            }
            if (i == 1) {
                inputs.value = data.urlLink
            }
            ModalEdit_father.appendChild(inputs);
        }

    let modalEdit_imageButtons = document.createElement("div");
    modalEdit_imageButtons.classList.add("modalEditi_imageButtons")    
    ModalEdit_father.appendChild(modalEdit_imageButtons);

    let modalEdit_image_upload = document.createElement("input");
    modalEdit_image_upload.classList.add("modalEdit-uploadImg")
    modalEdit_image_upload.id = "modalEdit-uploadImg"
    modalEdit_image_upload.type = "file"
    modalEdit_imageButtons.appendChild(modalEdit_image_upload);
    

    let modalEdit_image_uploadLabel = document.createElement("label");
    modalEdit_image_uploadLabel.classList.add("modal_image-label");
    modalEdit_image_uploadLabel.setAttribute("for","modalEdit-uploadImg");
    modalEdit_imageButtons.appendChild(modalEdit_image_uploadLabel);

    let modalEdit_image_uploadLabel_text;
    if(data.ImageLink == undefined || data.ImageLink == ""){
        modalEdit_image_uploadLabel_text = document.createElement("p");
        modalEdit_image_uploadLabel_text.innerHTML = "Adicionar Imagem"
        modalEdit_image_uploadLabel.appendChild(modalEdit_image_uploadLabel_text)
    }


    let imgModalEdit;
    if(data.ImageLink != undefined && data.ImageLink != ""){
        imgModalEdit = document.createElement("img");
        imgModalEdit.classList.add("imgModalEdit");
        imgModalEdit.alt = "Icone do link";
        imgModalEdit.src = `../../assets/${data.ImageLink}`
        modalEdit_image_uploadLabel.appendChild(imgModalEdit);
    }

    modalEdit_image_upload.addEventListener("change", ({target}) => {
        uploadImgEdit(target, modalEdit_image_uploadLabel, modalEdit_image_uploadLabel_text)
    })

    let modalEdit_buttons_Container = document.createElement("div");
    modalEdit_buttons_Container.classList.add("modalEdit_buttons_Container")
    modalEdit_imageButtons.appendChild(modalEdit_buttons_Container);

    let buttoncancel = document.createElement("button")
    buttoncancel.innerHTML = "cancelar"
    modalEdit_buttons_Container.appendChild(buttoncancel);
    buttoncancel.addEventListener("click", removeModalEdit)

    let buttonEdit = document.createElement("button")
    buttonEdit.innerHTML = "Salvar"
    modalEdit_buttons_Container.appendChild(buttonEdit);
    buttonEdit.addEventListener("click", () => {updateLink(data,Names)})
    

}

function removeModalEdit(){
    let ModalEdit = document.querySelector(".Container-ModalEdit");
    ModalEdit.remove()
}
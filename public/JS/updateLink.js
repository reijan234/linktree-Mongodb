async function updateLink(data, Names) {
    const index = 1
    const IdUser = document.querySelector("header").id;
    const ImageFiles = document.querySelector(".modalEdit-uploadImg").files[0];
    const nameLink_ModalEdit = document.querySelector(".nameLink-ModalEdit");
    const urlLink_ModalEdit = document.querySelector(".urlLink-ModalEdit");

    let dB = data
    let IdLink = dB._id;
  
    let nameLink = nameLink_ModalEdit.value;
    let urlLink = urlLink_ModalEdit.value;
    
    let ImageLink;

    if(ImageFiles){
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

    myinit = {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            IdUser,
            IdLink,
            nameLink,
            urlLink,
            index,
            ImageLink,
        })
    }

    let data2 = await fetch(`http://localhost:3001/link/update`, myinit)
    
    if(nameLink != data.nameLink){
        Names.innerHTML = nameLink
    }

    removeModalEdit()

    if(ImageFiles){
    if(dB.ImageLink != "" && dB.ImageLink != undefined){
        let ImageLinkDelet = dB.ImageLink
        let send = await fetch(`http://localhost:3001/link/image/delete/${IdLink}/${IdUser}/${ImageLinkDelet}`, { method: 'DELETE' });
    }
    }
}
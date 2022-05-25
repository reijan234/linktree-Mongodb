const trashs = document.querySelectorAll(".list-link-Container-trash"),
      ButtonDelete = document.querySelector(".deletcard"),
      modalTrash = document.querySelector(".modalTrash"),
      cancelModalTrash = document.querySelector(".TrashNo"),
      removeModal = document.querySelectorAll(".remove-ModalTrash");

      ButtonDelete.addEventListener('click', Deletcard)    

trashs.forEach(trash => {
    trash.addEventListener('click', () => {
        let card = trash.parentNode;

        openModalTrash(card)
        
    })

});

function openModalTrash(card){

    modalTrash.classList.add("trashOpen");
    let ContainerModal = modalTrash.children[4].children[1].children[1]
    ContainerModal.id = `${card.id}`
}



async function Deletcard({target}){
    let ContainerModal = modalTrash.children[4].children[1].children[1]
    let IdUser = document.querySelector("header").id
    let IdLink = target.id;

    if(IdLink != ""){
        try {
            let send = await fetch(`http://localhost:3001/link/delete/${IdLink}/${IdUser}`, { method: 'DELETE' });
            modalTrash.classList.remove("trashOpen");

            ContainerModal.id = ``

            let card = document.getElementById(`${IdLink}`)
            card.style.pointerEvents = "none"
            card.remove()
            currentIndex()
            
            
        } catch (err) {
            console.log("non-existent link", { error: err })
        }
    }
    modalTrash.classList.remove("trashOpen");
    
}



cancelModalTrash.addEventListener('click', () => {
    modalTrash.classList.remove("trashOpen");
 
})

removeModal.forEach(remove => {
    remove.addEventListener('click', () => {
        modalTrash.classList.remove("trashOpen");
    })
})

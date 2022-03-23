const trashCans = document.querySelectorAll(".list-link-Container-trash");
const trash = document.querySelector(".modalTrash")
const deletcard = document.querySelector(".deletcard")

trashCans.forEach(trashModelOpen => {
    trashModelOpen.addEventListener('click', () => {
        trash.classList.add("trashOpen")

        deletcard.addEventListener('click', async() => {
            console.log(trashModelOpen.parentNode)
            
        // var card = document.getElementById(parentId);
        //     creatBlur(card)
    
            // var delet = await fetch(`http://localhost:3001/delet?itemId=${parentId}`)
            // var dados = await delet.json();
            
            // card.style.pointerEvents = "none"
            // deletcard(dados.id)
    
        })
    })
})




const modalCurrentIndex = document.querySelector(".modalCurrentIndex");

async function currentIndex(){
    let cards = document.querySelectorAll(".list-link-Container")
    let index = cards.length -1;


    let indexCards=[];

    for (let i = 0; i < cards.length; i++) {
        
        
        if(cards[i].id != ""){
            index
            indexCards.push({
                IdUser,
                IdLink: cards[i].id,
                index,
                
            })
            index--
        }
    }

    myinit = {
        method: 'post',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            indexCards
        })
    }

    let data = await fetch(`http://localhost:3001/link/update/currentIndex`, myinit)
    

    modalCurrentIndex.classList.remove("open")
}

function ModalcurrentIndex(){
   modalCurrentIndex.classList.add("open")
   
   var altura = window.innerHeight
   || document.documentElement.clientHeight
   || document.body.clientHeight;
   
   modalCurrentIndex.style.top = `${altura - 150}px`;
   console.log(altura);

}

let modalCurrentIndex_button = document.querySelector(".modalCurrentIndex_button");
modalCurrentIndex_button.addEventListener('click', currentIndex)
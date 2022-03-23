const DefaultUser = "623205f559b114446f2db2d1";

async function CreatUser(name, password) {
    
    myinit = {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
                Name: name,
                password: password,
        })
    }

    var data = await fetch(`http://localhost:3001/Creat`,myinit)
    console.log("creat",data)
} 


async function creatlink(idUser, nameLink, urlLink, ImageLink) {


    myinit = {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
            idUser: idUser,
            nameLink: nameLink, 
            urlLink: urlLink, 
            ImageLink: ImageLink,
        })
    }


    const send = await fetch(`http://localhost:3001/link/create`, myinit)
    try{
        let dados = await send.json()
        console.log("creat",send)
    }catch(err){
        console.log(err)
    }
   
}

async function updateLink(linkID, nameLink, urlLink, ImageLink){
    myinit = {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
            linkID: linkID, 
            nameLink: nameLink, 
            urlLink: urlLink, 
            ImageLink: ImageLink,
        })
    }

    var data = await fetch(`http://localhost:3001/link/update`,myinit)
    console.log("update",data)
}

async function deleteLink(IdLink){
    var data = await fetch(`http://localhost:3001/link/delete/${IdLink}`, {method: 'DELETE'})
    console.log("client",data)
}




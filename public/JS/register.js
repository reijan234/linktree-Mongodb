const create_button = document.querySelector("#create-button");
      create_button.addEventListener("click", register);

async function register(){
    const create_name = document.querySelector("#create-name"),
          create_email = document.querySelector("#create-email"),
          create_password = document.querySelector("#create-password"),
          create_confirmPassword = document.querySelector("#create-confirm");

    

    if(create_name.value != "" && create_email.value != ""){

        if (create_password.value == create_confirmPassword.value) {
            console.log(create_name.value)
            myinit = {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Name: create_name.value,
                    password: create_password.value,
                    email: create_email.value
                })
            }
            const send = await fetch(`http://localhost:3001/user/creat`, myinit);
            let data = await send.json();
            console.log(data)
    
        } else {
            console.log("NÃO FOI")
        }
    }else{
        create_email.classList.add("borderRed");
        create_name.classList.add("borderRed");
    }
}
// 
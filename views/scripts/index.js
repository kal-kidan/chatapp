const submit = async ()=>{  
    const body = JSON.stringify({
        name: document.getElementById("user").value,
        email: document.getElementById("email").value,
        password: document.getElementById("pass").value,
    }); 
    const response = await fetch("/v1/auth/register",  { 
        method: "POST", 
        body, 
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    const status =  response.status;
    const data = await response.json();
    if(status===201){ 
        console.log("data", data);
    }
    else{
        console.log("error", data.message);
    }
    
   return false;
    
}
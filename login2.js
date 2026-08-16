// javascript code for login.html   
function login() {
    let userid = document.getElementById("userid").value;
    let password = document.getElementById("password").value;

    // Send these values to the backend

    fetch("http://localhost:3001/login",
        {
        method: "POST",

        headers:
        {
            "Content-Type":"application/json"
        },

        body: JSON.stringify(
        {
            userid: userid,
            password: password
        })
    })
.then(response => response.json())

.then(data =>
{
    if(data.success)
    {
        localStorage.setItem("userid", data.userid);

        if(data.usertype == "customer")
        {
            window.location.href = "welcus.html";
        }
        else if(data.usertype == "staff")
        {
            window.location.href = "welstf.html";
        }
    }
    else
    {
        alert(data.message);
    }
});
}
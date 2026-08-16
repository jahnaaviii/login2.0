function signup()
{
    let usertype = document.getElementById("usertype").value;
    let userid = document.getElementById("userid").value;
    let password = document.getElementById("password").value;

fetch("/signup",    {
        method:"POST",

        headers:
        {
            "Content-Type":"application/json"
        },

        body:JSON.stringify(
        {
            usertype:usertype,
            userid:userid,
            password:password
        })
    })

    .then(response=>response.text())

    .then(data=>
    {
        alert(data);

        if(data=="Account Created Successfully")
        {
            window.location.href="login2.html";
        }
    });
}
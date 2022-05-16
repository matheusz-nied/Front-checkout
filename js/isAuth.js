window.onload = () => {
   isAuthenticate();
};
function isAuthenticate() {
    let isAuth = JSON.parse(window.localStorage.getItem("auth"));
    console.log(Boolean(isAuth));
    if (!Boolean(isAuth)) {
        window.location.href = "/login.html";

    } 
}

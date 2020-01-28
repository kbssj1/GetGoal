import firebase from "./firebase";

function Security() {}

Security.prototype.isLoginSuccessful = function() {
    const login = sessionStorage.getItem("login");
    const id = sessionStorage.getItem("id");
    return (
        (login === "success" && id === "test") ||
        (id !== "test" && login === "success" && firebase.auth().currentUser !== null)
    );
};

let security = new Security();
export default security;

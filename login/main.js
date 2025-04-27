import { handleLoginFormSubmit } from "../modules/handlers.js";

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("user")) {
        window.location.href = "/";
        return;
    }
    const regForm = document.querySelector(".add-form");
    regForm.addEventListener("submit", handleLoginFormSubmit);
});
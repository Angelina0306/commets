import { handleLoginFormSubmit, handleRegFormSubmit } from "./handlers.js";

const loginform = `
<form class="add-form" id="authLoginForm">
    <label class="reg-title">Авторизация</label>
    <input class="login-input" type="text" placeholder="Логин"/>
    <input class="password-input" type="password" placeholder="Пароль"/>
    <button>Войти</button>
</form>
`;

const regform = `
<form class="add-form" id="authRegForm">
    <label class="reg-title">Регистрация</label>
    <input class="login-input" type="text" placeholder="Логин"/>
    <input class="name-input" type="text" placeholder="Имя"/>
    <input class="password-input" type="password" placeholder="Пароль"/>
    <button>Зарегистрироваться</button>
</form>
`

export function showLoginForm(){
    const container = document.querySelector('#authForm');
    container.innerHTML = loginform;
    const regForm = document.querySelector("#authLoginForm");
    regForm.addEventListener("submit", handleLoginFormSubmit);
}

export function showRegForm(){
    const container = document.querySelector('#authForm');
    container.innerHTML = regform;
    const regForm = document.querySelector("#authRegForm");
    regForm.addEventListener("submit", handleRegFormSubmit);
}
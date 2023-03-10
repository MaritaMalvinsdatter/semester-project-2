import { API_AUCTION_URL } from "../api/constants.mjs";
import * as storage from "../api/tokenStorage.mjs";

const action = "/auth/login";
const method = "post";
const userAlert = document.querySelector("#error-alert");

export async function login(user) {
    userAlert.innerHTML = "";
    const loginURL = API_AUCTION_URL + action;
    const body = JSON.stringify(user);
    const response = await fetch(loginURL, { headers: { "Content-Type": "application/json" }, method, body });
    const { accessToken, ...profile } = await response.json();

    if (accessToken) {
        storage.save("token", accessToken);
        storage.save("profile", profile);
        window.location.assign("/profile/index.html");
    } else {
        userAlert.classList.add("alert-warning");
        userAlert.innerHTML += `No user with this email registered. Please register to make an account!`;
    }
}

export function setLoginFormListener() {
    const form = document.querySelector("#loginForm");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const user = Object.fromEntries(new FormData(event.target).entries());
            await login(user);
        });
    }
}

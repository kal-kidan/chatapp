window.onload = function () {
  document
    .getElementById("google-signin")
    .addEventListener("click", googleLogin);
};

const register = async () => {
  const body = JSON.stringify({
    name: document.getElementById("user").value,
    email: document.getElementById("email").value,
    password: document.getElementById("pass").value,
  });
  const response = await fetch("/v1/auth/register", {
    method: "POST",
    body,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const { status } = response;
  const data = await response.json();
  if (status === 201) {
    setTagValue("register-error", "");
    localStorage.setItem("userData", JSON.stringify(data));
  } else {
    setTagValue("register-error", data.message);
  }
};

const logIn = async () => {
  const body = JSON.stringify({
    email: document.getElementById("username").value,
    password: document.getElementById("password").value,
  });
  const response = await fetch("/v1/auth/login", {
    method: "POST",
    body,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const { status } = response;
  const data = await response.json();
  if (status === 200) {
    setTagValue("login-error", "");
    localStorage.setItem("userData", JSON.stringify(data));
    alert("walla loggedin");
  } else {
    setTagValue("login-error", data.message);
  }
};

const setTagValue = (tagId, message) => {
  document.getElementById(tagId).innerHTML = message;
};

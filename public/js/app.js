console.log("Client side JavaScript file is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  console.log(location);
  messageOne.textContent = `Loading...`;
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response
        .json()
        .then(
          ({ error, location, description, temperature, feelslike } = {}) => {
            if (error) {
              messageOne.textContent = `Error: ${error}`;
            } else {
              messageOne.textContent = `Your location: ${location}`;
              messageTwo.textContent = `${description}. Temperature: ${temperature}F, feels like ${feelslike}F.`;
            }
          }
        );
    }
  );
});

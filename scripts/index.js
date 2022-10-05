import View from "./View.js";
import Client from "./Client.js";
// All of your javascript should go here
const saveBtn = document.querySelector(".btn-save");
const resetBtn = document.querySelector(".btn-reset");
let movieArray = [];
const input = document.querySelector("input");
const newClient = new Client();
const newView = new View();
input.addEventListener("change", async () => {
  if (input.value) {
    const data = await newClient.getMovieData(input.value);
    console.log(data);

    movieArray.push(data);

    const result = movieArray.some((item) => {
      item.title === data.title;
    });
    console.log(result);
    newView.displayMovieOnPage(data);
    console.log("Inside Async", movieArray);
    input.value = "";
  }
});
saveBtn.addEventListener("click", () => {
  localStorage.setItem("movies", JSON.stringify(movieArray));
});
loadMovies();
function loadMovies() {
  const localStorageItem = localStorage.getItem("movies");
  const parsed = JSON.parse(localStorageItem);
  if (localStorageItem) {
    movieArray.push(...parsed);
    // console.log(movieArray);
    movieArray.forEach((item) => {
      newView.displayMovieOnPage(item);
    });
  }
  // console.log("Initial State", movieArray);
}
resetBtn.addEventListener("click", () => {
  newView.removeDisplay();
  localStorage.removeItem("movies");
  // movieArray = []
  movieArray.splice(0);
  console.log(`Empty Array `, movieArray);
});

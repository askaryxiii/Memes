/* 
1 finalize design
2 get value from input when button is clicked
  2.1 or pressed Enter
3 make sure the input is not empty
  3.1 make sure the input is number & not more than 99
4 if true process into fetching, if false print a message
5 display response data in HTML
*/

// variables
let inputNum = document.querySelector("input");
let submitBtn = document.querySelector("button");
let mainDev = document.querySelector(".itemShowed");

// detect which key is pressed, when Enter pressed
inputNum.addEventListener("focus", () => {
  inputNum.addEventListener("keypress", (keyEvent) => {
    if (keyEvent.key == "Enter") {
      validationAndFetching();
    }
  });
});

// when pressing button
submitBtn.addEventListener("click", () => {
  validationAndFetching();
});

// validation proccess & fetching process
function validationAndFetching() {
  // checking if the input value is empty or not
  if (!inputNum.value) {
    mainDev.classList.replace("d-none", "d-block"),
      (mainDev.innerHTML = `<h4 class="heading text-danger">Don't leave it Empty</h4>`);
    return;
  }

  // checking if input value is number & below 99
  let validateValue = inputNum.value
    .split("")
    .map((item) => parseInt(item))
    .some((item, index) => {
      return isNaN(item) || index > 1;
    });

  // getting data if validation is passed
  if (validateValue) {
    mainDev.classList.replace("d-none", "d-block"),
      (mainDev.innerHTML = `<h4 class="heading text-danger">Please enter a valid number</h4>`);
  } else {
    // validation passed, fetching data
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        let inputNumValue = parseInt(inputNum.value);
        let meme = data.data.memes.filter((item, index) => {
          return index == inputNumValue;
        });
        mainDev.classList.replace("d-none", "d-block"),
          (mainDev.innerHTML = `
              <h1 class="heading text-warning text-center my-4">${meme[0].name}</h1>
              <img src=${meme[0].url} alt="meme" width="500px" height="auto"/>
              `);
      });
  }
}

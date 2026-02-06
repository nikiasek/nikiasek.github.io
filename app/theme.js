myElement = document.getElementsByClassName("switch")

myElement[0].addEventListener("click", function (e) {
  document.body.classList.toggle("light");
});

myElement[1].addEventListener("click", function (e) {
  document.body.classList.toggle("light");
});
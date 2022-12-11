var allButtons = document.querySelectorAll(".drum").length;
for(var i = 0 ; i < allButtons ; i++){

  document.querySelectorAll(".drum")[i].addEventListener("click", function(){

  var buttonHtml = this.textContent;
  makeSound(buttonHtml);
  buttonAnimation(buttonHtml);
  });

}

document.addEventListener("keydown", function(event){
  makeSound(event.key);
  buttonAnimation(event.key);
});

function makeSound(key){
  switch(key){
    case "w":
     var tom1 = new Audio("sounds/tom-1.mp3");
     tom1.play();
    break;

    case "a":
     var tom2 = new Audio("sounds/tom-2.mp3");
     tom2.play();
    break;

    case "s":
     var tom3 = new Audio("sounds/tom-3.mp3");
     tom3.play();
    break;

    case "d":
     var tom4 = new Audio("sounds/tom-4.mp3");
     tom4.play();
    break;

    case "j":
      var snare = new Audio("sounds/snare.mp3");
      snare.play();
    break;

    case "k":
     var crash = new Audio("sounds/crash.mp3");
     crash.play();
    break;

    case "d":
     var bass = new Audio("sounds/kickbass.mp3");
     bass.play();
    break;

    default: console.log(this.textContent);

  }
}

function buttonAnimation(currentKey){
  var activeKey = document.querySelector("." + currentKey);
  activeKey.classList.add("pressed");
}
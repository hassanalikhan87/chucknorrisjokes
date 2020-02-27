// console.log("success");

("use strict");

// const speak = $("#talk");
const chuckURL = "https://api.chucknorris.io/jokes/random";
const getjokebtn = $("#call-joke");
const placejoke = $("#place-joke");
const removejokebtn = $("#remove-joke");
const list = $("#4");
// const line = $("#list" + num);
let num = 0;
console.log("Initial Value: " + num);

removejokebtn.on("click", function() {
  // console.log("remove works");
  removejoke();
  console.log(num);
});

function removejoke() {
  // console.log("joke removed");
  $("#" + num).remove();
  console.log("NOW AFTER REMOVAL: " + num);
  num--;
}

getjokebtn.on("click", function() {
  console.log(num);
  getjoke(chuckURL);
  console.log(num);
});

function speakjoke() {
  console.log(num);
  var text = $("#" + num).text();
  var msg = new SpeechSynthesisUtterance();
  var voices = window.speechSynthesis.getVoices();
  msg.voice = voices[$("#voices").val()];
  msg.rate = $("#rate").val() / 10;
  msg.pitch = $("#pitch").val();
  msg.text = text;

  msg.onend = function(e) {
    console.log("Finished in " + event.elapsedTime + " seconds.");
  };

  speechSynthesis.speak(msg);
}

function getjoke(chuckURL) {
  // console.log("main function is working");
  let joke;

  $.ajax({
    url: chuckURL,
    method: "GET"
  })
    .done(function(resp) {
      // console.log("Success");
      joke = resp;
      // console.log("Value of this joke: " + joke.value);
      // console.log(joke);
    })
    .fail(function(resp) {
      // console.log("fail");
      // console.log(resp);
    })
    .always(function() {
      displayjoke(filterJSON(joke));
    });

  //put if here

  if ("speechSynthesis" in window) {
    speechSynthesis.onvoiceschanged = function() {
      var $voicelist = $("#voices");

      if ($voicelist.find("option").length == 0) {
        speechSynthesis.getVoices().forEach(function(voice, index) {
          var $option = $("<option>")
            .val(index)
            .html(voice.name + (voice.default ? " (default)" : ""));

          $voicelist.append($option);
        });
        console.log("yayyyyy");
      } else {
        $("#modal1").openModal();
      }

      // $voicelist.material_select();
    };
  }
}

function filterJSON(joke) {
  // console.log(joke.id);
  // console.log("Problem Solved: " + joke.value);
  return joke.value;
}

function displayjoke(joke) {
  console.log("Old Value before adding: " + num);
  num++;
  // console.log("joke displayed");
  placejoke.append(
    $("<li id='" + num + "' class='list-group-item'>" + joke + "</li>")
  );
  speakjoke();
}

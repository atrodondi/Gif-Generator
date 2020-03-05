var items = [
  "dog",
  "cat",
  "moose",
  "bear",
  "tree",
  "house",
  "town",
  "bus",
  "camel",
  "giraffe",
  "car",
  "elephant",
  "alligator",
  "milk",
  "penguin",
  "seal",
  "soda",
  "otter",
  "whale",
  "watermelon",
  "dolphin",
  "mountain"
];
//function that populates the button div with different buttons from the item array
function makeButton() {
  $("#buttonDiv").empty();
  for (let i = 0; i < items.length; i++) {
    $("#buttonDiv").append(
      "<button class='btn btn-info m-1' data-value = " +
        items[i] +
        ">" +
        items[i] +
        "</button>"
    );
  }
}
//function that triggers when an item button is pressed to make ajax calls to populate the gif div with gifs. clicking it doesnt empty the div, it adds 10 more so it prepend. part of bonus steps.
function buttonClick() {
  $("#buttonDiv").on("click", ".btn-info", function() {
    let searchItem = $(this).data("value");
    let queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      searchItem +
      "&api_key=UWXdBvZNCnxDWEkXJZtZjjSpmNGPuw42&limit=10&offset=0&rating=G&lang=en";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response.data);
      for (let i = 0; i < response.data.length; i++) {
        $("#gifDiv").prepend(
          " <span class=' m-1 d-inline-block'>  <img class= 'img img-fluid m-1'src='" +
            response.data[i].images.fixed_height_still.url +
            "' data-still='" +
            response.data[i].images.fixed_height_still.url +
            "' data-animate = '" +
            response.data[i].images.fixed_height.url +
            "' data-state='still'><p>" +
            response.data[i].title +
            " <p> Rating: " +
            response.data[i].rating +
            " <button class='btn btn-sm btn-danger'>Favorite?</button> </p>  </span>"
        );
      }
    });
  });
}
//function that controls what happens when an image/gif is clicked. stop/animate
function imageClick() {
  $(".container-fluid").on("click", ".img", function() {
    console.log("click");
    let state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
}
//function that controls what happens when the user creates a new item button.
function makeGif() {
  $("#findGif").on("click", function() {
    let Gif = $("#gifInput").val();
    if ($("#gifInput").val() == "") {
      alert("You have to type something in the search bar!");
    } else {
      if (items.includes(Gif)) {
        alert("You've already have a search button for that thing!");
      } else {
        items.push(Gif);
        makeButton();
      }
    }
  });
}

//function that controls what happens when a favorite button is clicked by user
function favClick() {
  $("#gifDiv").on("click", ".btn-sm", function() {
    //this moves the first span element found as a parent from the fav button. much better than my old way of weird id finding. seems much less breakable. liked figuring this one out.
    $("#favorites").append($(this).closest("span"));
    $(this).toggle();
  });
}

makeButton();
buttonClick();
imageClick();
makeGif();
favClick();

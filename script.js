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
var idCount = 0;
//function that populates the button div with different buttons from the item array
function makeButton() {
  $("#buttonDiv").empty();
  for (var i = 0; i < items.length; i++) {
    $("#buttonDiv").append(
      "<button class='btn btn-info m-1' data-value = " +
        items[i] +
        ">" +
        items[i] +
        "</button>"
    );
  }
}
//function that triggers when an item button is pressed to make ajax calls to populate the gif div with gifs
function buttonClick() {
  $("#buttonDiv").on("click", ".btn-info", function() {
    let searchItem = $(this).data("value");
    var queryURL =
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
          " <span id ='" +
            idCount +
            "' class=' m-1 d-inline-block'>  <img class= 'img img-fluid m-1'src='" +
            response.data[i].images.fixed_height_still.url +
            "' data-still='" +
            response.data[i].images.fixed_height_still.url +
            "' data-animate = '" +
            response.data[i].images.fixed_height.url +
            "' data-state='still'><p>" +
            response.data[i].title +
            " <p> Rating: " +
            response.data[i].rating +
            " <button id='favID" +
            idCount +
            "'" +
            " class='btn btn-sm btn-danger'>Favorite?</button> </p>  </span>"
        );
        idCount++;
      }
    });
  });
}
//function that controls what happens when an image/gif is clicked. stop/animate
function imageClick() {
  $(".container-fluid").on("click", ".img", function() {
    console.log("click");
    var state = $(this).attr("data-state");

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
    var Gif = $("#gifInput").val();
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
    console.log($(this));
    let pickFav = $(this).attr("id");
    //below was to get an id from a similar id, it looks crappy but it worked :/
    $("#favorites").append(
      $(
        "#" +
          $("#" + pickFav)
            .attr("id")
            .match(/\d+/)
      )
    );
    $("#" + pickFav).toggle();
  });
}

makeButton();
buttonClick();
imageClick();
makeGif();
favClick();

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
var gifObj;
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
    event.preventDefault();
    let searchItem = $(this).data("value");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      searchItem +
      "&api_key=UWXdBvZNCnxDWEkXJZtZjjSpmNGPuw42&limit=10&offset=0&rating=G&lang=en";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      $("#gifDiv").empty();
      for (var i = 0; i < response.data.length; i++) {
        $("#gifDiv").append(
          " <span class=' m-1 float-left'> <p> Rating: " +
            response.data[i].rating +
            "</p>  <img  id ='" +
            i +
            "'class= 'img img-fluid m-1'src='" +
            response.data[i].images.fixed_height_still.url +
            "'></span>"
        );
      }
      gifObj = response.data;
    });
  });
}
//function that controls what happens when an image/gif is clicked. stop/animate
function imageClick() {
  $("#gifDiv").on("click", "img", function() {
    var clickID = event.target.id;
    var clicked = gifObj[clickID];
    if ($("#" + clickID).attr("src") == clicked.images.fixed_height_still.url) {
      $("#" + clickID).replaceWith(
        "<img id ='" +
          clickID +
          "'class= 'img img-fluid m-1'src='" +
          clicked.images.fixed_height.url +
          "'>"
      );
    } else {
      $("#" + clickID).replaceWith(
        "<img id ='" +
          clickID +
          "'class= 'img img-fluid m-1'src='" +
          clicked.images.fixed_height_still.url +
          "'>"
      );
    }
  });
}
//function that controls what happens when the user creates a new item button
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

makeButton();
buttonClick();
imageClick();
makeGif();

// working on BONUS Features:
// 1. Ensure your app is fully mobile responsive. DONE!! with bootstrap

// 2.Allow users to request additional gifs to be added to the page.
// Each request should ADD 10 gifs to the page, NOT overwrite the existing gifs.
// got it done, now it adds 10 more gifs to teh page, and i can animate/stop the gifs/stills on click. i still think there is a better/more efficient way of doing it.

//3. List additional metadata (title, tags, etc) for each gif in a clean and readable format.

//4. Integrate this search with additional APIs such as OMDB, or Bands in Town. Be creative and build something you are proud to showcase in your portfolio

// 5.Allow users to add their favorite gifs to a favorites section.

// This should persist even when they select or add a new topic.
// If you are looking for a major challenge, look into making this section persist even when the page is reloaded(via localStorage or cookies). need to fix giving the ID to each image so we can ADD to the div, 10, 20, 30, not replace each call with 10 new gifs. we can make the change fast, but then the function to animate each iamge breaks because we are using duplicate ID's. need to change the code.

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
var gifs = [];
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
      console.log(response.data);
      for (let i = 0; i < response.data.length; i++) {
        $("#gifDiv").prepend(
          " <span class=' m-1 d-inline-block'>  <img  id ='" +
            idCount +
            "'class= 'img img-fluid m-1'src='" +
            response.data[i].images.fixed_height_still.url +
            "'> <p> Rating: " +
            response.data[i].rating +
            "</p> </span>"
        );
        idCount++;
      }
      for (let i = 0; i < response.data.length; i++) {
        gifs.push(response.data[i]);
      }
      console.log(gifs);
    });
  });
}
//function that controls what happens when an image/gif is clicked. stop/animate
function imageClick() {
  $("#gifDiv").on("click", "img", function() {
    var clickID = event.target.id;
    console.log(event.target.src);
    var clicked = gifs[clickID];
    console.log(clicked);
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

makeButton();
buttonClick();
imageClick();
makeGif();

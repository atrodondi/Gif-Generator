var items = [
  "dog",
  "cat",
  "moose",
  "bear",
  "camel",
  "giraffe",
  "elephant",
  "alligator",
  "penguin",
  "seal",
  "otter",
  "whale",
  "dolphin"
];
function makeGif() {
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

function buttonClick() {
  $("button").on("click", function() {
    console.log($(this).data("value"));
    let searchItem = $(this).data("value");
    console.log(searchItem);
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      searchItem +
      "&api_key=UWXdBvZNCnxDWEkXJZtZjjSpmNGPuw42&limit=10&offset=0&rating=G&lang=en";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response.data);
      $("#gifDiv").empty();
      for (var i = 0; i < response.data.length; i++) {
        $("#gifDiv").append(
          "<img src='" + response.data[i].images.downsized.url + "'>"
        );
      }
    });
  });
}

makeGif();
buttonClick();

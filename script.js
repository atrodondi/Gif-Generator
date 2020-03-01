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

makeGif();

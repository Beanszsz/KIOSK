window.onload = function () {
  const image = document.querySelector("img");
  const areas = document.querySelectorAll("area");

  const originalWidth = image.naturalWidth;
  const originalHeight = image.naturalHeight;

  function resizeMap() {
    const currentWidth = image.offsetWidth;
    const currentHeight = image.offsetHeight;

    const widthRatio = currentWidth / originalWidth;
    const heightRatio = currentHeight / originalHeight;

    areas.forEach((area) => {
      const originalCoords = area.dataset.originalCoords.split(",").map(Number);
      const resizedCoords = originalCoords.map((coord, index) =>
        Math.round((index % 2 === 0 ? widthRatio : heightRatio) * coord)
      );
      area.coords = resizedCoords.join(",");
    });
  }

  // Store original coordinates in data attribute
  areas.forEach((area) => {
    area.dataset.originalCoords = area.coords;
  });

  // Resize map on window resize
  window.addEventListener("resize", resizeMap);

  // Initial resize
  resizeMap();
};

document.querySelectorAll("area").forEach((area) => {
  area.addEventListener("mouseover", function () {});
});

function showPopup(name, details, imageUrl) {
  var popup = document.getElementById("pop-up");
  var show = document.getElementById("show");
  var showInfo = document.getElementById("show-info");
  var showImg = document.getElementById("show-img");

  show.textContent = name;
  showInfo.textContent = details;
  showImg.src = imageUrl;

  popup.style.display = "block";
}

function closePopup() {
  var popup = document.getElementById("pop-up");
  popup.style.display = "none";
}

var areas = document.getElementsByTagName("area");
for (var i = 0; i < areas.length; i++) {
  areas[i].addEventListener("mouseenter", function () {
    var name = this.getAttribute("popup-name");
    var details = this.getAttribute("popup-info");
    var imageUrl = this.getAttribute("popup-image");
    showPopup(name, details, imageUrl);
  });
  areas[i].addEventListener("mouseleave", function () {
    closePopup();
  });
}

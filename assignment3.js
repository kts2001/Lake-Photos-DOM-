﻿
"use strict"; 

var photoOrder = [1, 2, 3, 4, 5];
var autoAdvance = setInterval(rightAdvance, 5000);
var figureCount = 3;

var photoFavorites = [0, 0, 0, 0, 0];

function showRemoveBtn(position) {
    for (var i = 0; i < 5; i++) {
        document.getElementById("link" + i).style.display = "none";
    }
    document.getElementById("link" + position).style.display = "block";
}

function removeFavorite(position) {
    for (var i = position; i < 5; i++) {
        if (photoFavorites[i + 1] === undefined || photoFavorites[i + 1] === 0) {
            photoFavorites[i] = 0;
            document.getElementsByName("favorites")[i].src = "";
        }
        else {
            photoFavorites[i] = photoFavorites[i + 1];
            document.getElementsByName("favorites")[i].src = "images/IMG_0" + photoFavorites[i] + "sm.jpg";
        }
    }
    document.getElementById("link" + position).style.display = "none";
}


function populateFigures() {
    var filename;
    var currentFig;
    if (figureCount === 3) {
        for (var i = 1; i < 4; i++) {
            filename = "images/IMG_0" + photoOrder[i] + "sm.jpg";
            currentFig = document.getElementsByTagName("img")[i - 1];
            currentFig.src = filename;
        }
    } else {
        for (var i = 0; i < 5; i++) {
            filename = "images/IMG_0" + photoOrder[i] + "sm.jpg";
            currentFig = document.getElementsByTagName("img")[i];
            currentFig.src = filename;
        }
    }
}

function rightArrow() {
    clearInterval(autoAdvance);
    rightAdvance();
}

function rightAdvance() {
    for (var i = 0; i < 5; i++) {
        if ((photoOrder[i] + 1) === 6) {
            photoOrder[i] = 1;
        } else {
            photoOrder[i] += 1;
        }
        populateFigures();
    }
}

function leftArrow() {
    clearInterval(autoAdvance);
    for (var i = 0; i < 5; i++) {
        if ((photoOrder[i] - 1) === 0) {
            photoOrder[i] = 5;
        } else {
            photoOrder[i] -= 1;
        }
        populateFigures();
    }
}

function previewFive() {
    var articleEl = document.getElementsByTagName("article")[0];
    var lastFigure = document.createElement("figure");
    lastFigure.id = "fig5";
    lastFigure.style.zIndex = "5";
    lastFigure.style.position = "absolute";
    lastFigure.style.right = "45px";
    lastFigure.style.top = "67px";
    var lastImage = document.createElement("img");
    lastImage.width = "240";
    lastImage.height = "135";
    lastFigure.appendChild(lastImage);
    articleEl.insertBefore(lastFigure, document.getElementById("rightarrow"));

    var firstFigure = lastFigure.cloneNode(true);
    firstFigure.id = "fig1";
    firstFigure.style.right = "";
    firstFigure.style.left = "45px";
    articleEl.insertBefore(firstFigure, document.getElementById("fig2"));

    figureCount = 5;
    var numberButton = document.querySelector("#fiveButton p");
    numberButton.innerHTML = "Show fewer images";
    if (numberButton.addEventListener) {
        numberButton.removeEventListener("click", previewFive, false);
        numberButton.addEventListener("click", previewThree, false);
    } else if (numberButton.attachEvent) {
        numberButton.detachEvent("onclick", previewFive);
        numberButton.attachEvent("onclick", previewThree);
    }

    document.getElementsByTagName("img")[0].src = "images/IMG_0" + photoOrder[0] + "sm.jpg";
    document.getElementsByTagName("img")[4].src = "images/IMG_0" + photoOrder[4] + "sm.jpg";
}

function previewThree() {
    var articleEl = document.getElementsByTagName("article")[0];
    var numberButton = document.querySelector("#fiveButton p");
    figureCount = 3;
    articleEl.removeChild(document.getElementById("fig1"));
    articleEl.removeChild(document.getElementById("fig5"));
    numberButton.innerHTML = "Show more images";
    if (numberButton.addEventListener) {
        numberButton.removeEventListener("click", previewThree, false);
        numberButton.addEventListener("click", previewFive, false);
    } else if (numberButton.attachEvent) {
        numberButton.detachEvent("onclick", previewThree);
        numberButton.attachEvent("onclick", previewFive);
    }
}

function zoomFig() {
    var propertyWidth = 960;
    var propertyHeight = 600;
    var winLeft = ((screen.width - propertyWidth) / 2);
    var winTop = ((screen.height - propertyHeight) / 2);
    var winOptions = "width=960,height=600";
    winOptions += ",left=" + winLeft;
    winOptions += ",top=" + winTop;
    var zoomWindow = window.open("assignment3zoom.html", "zoomwin", winOptions);
    zoomWindow.focus();
}


function createEventListeners() {
    var leftarrow = document.getElementById("leftarrow");
    if (leftarrow.addEventListener) {
        leftarrow.addEventListener("click", leftArrow, false);
    } else if (leftarrow.attachEvent) {
        leftarrow.attachEvent("onclick", leftArrow);
    }

    var rightarrow = document.getElementById("rightarrow");
    if (rightarrow.addEventListener) {
        rightarrow.addEventListener("click", rightArrow, false);
    } else if (rightarrow.attachEvent) {
        rightarrow.attachEvent("onclick", rightArrow);
    }

    var mainFig = document.getElementsByTagName("img")[1];
    if (mainFig.addEventListener) {
        mainFig.addEventListener("click", zoomFig, false);
    } else if (mainFig.attachEvent) {
        mainFig.attachEvent("onclick", zoomFig);
    }

    var showAllButton = document.querySelector("#fiveButton p");
    if (showAllButton.addEventListener) {
        showAllButton.addEventListener("click", previewFive, false);
    } else if (showAllButton.attachEvent) {
        showAllButton.attachEvent("onclick", previewFive);
    }
}

function setUpPage() {
    createEventListeners();
    populateFigures();
}

if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setUpPage);
}

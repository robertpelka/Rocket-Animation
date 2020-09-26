"use strict";

//=============================================================================================================

var context;
var backgroundColor = "#000000";
var myCanvas, myFrameVar;
var star;
var starX = [];
var starY = [];
var numberOfStars = 500;
var speed = 5;
var rocket, roundWindow;
var rocketWidth = 30, rocketHeight = 200, rocketTipWidth = rocketWidth, rocketTipHeight = rocketWidth / 2;
var roundWindowRadius = rocketWidth / 3;
var fire, fireWidth = rocketWidth / 3, numberOfFires = 30;
var fireY = [];
var fireSpeed = 5;

//=============================================================================================================

function updateCanvas() {
    myCanvas = document.getElementById("myCanvas");
    context = myCanvas.getContext("2d");

    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, myCanvas.width, myCanvas.height);

    //rakieta - kwadrat o boku 1px
    rocket = new Square();

    //okno - koło o promieniu 1px
    roundWindow = new Circle();

    //ogień - kwadrat o boku 1px
    fire = new Square();

    for (let i = 0; i < numberOfFires; i++) {
        fireY[i] = myCanvas.height / 2 + i * 10;
        if (i % 3 == 0)
            fireY[i] += 3;
    }

    //gwiazda - koło o promieniu 1px
    star = new Circle();

    for (let i = 0; i < numberOfStars; i++) {
        starX[i] = Math.floor(Math.random() * 801);
        starY[i] = Math.floor((Math.random() * 1202) - 601);
    }

    myFrameVar = setTimeout(nextFrame, 100);
}

//=============================================================================================================

function Circle() {
    this.X = 0;
    this.Y = 0;
    this.Radius = 1;

    this.display = function () {
        context.fillStyle = this.Color;
        context.beginPath();
        context.arc(this.X, this.Y, this.Radius, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }

    this.setReferencePoint = function (x, y) {
        this.X0 = x;
        this.Y0 = y;
    }
}

function Square() {
    this.X = 0;
    this.Y = 0;
    this.W = 1;
    this.H = 1;

    this.display = function () {
        context.fillStyle = this.Color;
        context.fillRect(this.X, this.Y, this.W, this.H);
    };

    this.setReferencePoint = function (x, y) {
        this.X0 = x;
        this.Y0 = y;
    }
}

//=============================================================================================================

function nextFrame() {
    context = myCanvas.getContext("2d");

    context.fillStyle = backgroundColor;
    context.clearRect(0, 0, myCanvas.width, myCanvas.height);
    context.save();

    //gwiazdy
    star.Color = "#ffffff";
    for (let i = 0; i < numberOfStars; i++) {
        context.save();
        context.translate(starX[i], starY[i] += speed);
        if (starY[i] > 600)
            starY[i] -= 1200;
        if (starY[i] % 7 == 0)
            context.scale(2, 2);
        else
            context.scale(1, 1);
        star.display();
        context.restore();
    }

    //ogień 
    fire.Color = "#c41f06";
    for (let i = 0; i < numberOfFires; i++) {
        context.save();
        context.translate(myCanvas.width / 2, fireY[i] += fireSpeed);
        if (fireY[i] >= 600) {
            fireY[i] = myCanvas.height / 2;
            if (i % 3 == 0)
                fireY[i] += 3;
        }
        context.rotate(Math.PI / 4);
        var size = Math.pow(fireY[i] / 200, 3.5);
        context.scale(fireWidth + size, fireWidth + size);
        fire.display();
        context.restore();
    }

    //mniejszy ogień 
    fire.Color = "#ffff00";
    for (let i = 0; i < numberOfFires; i++) {
        context.save();
        context.translate(myCanvas.width / 2, fireY[i] += fireSpeed);
        if (fireY[i] >= 600) {
            fireY[i] = myCanvas.height / 2;
            if (i % 3 == 0)
                fireY[i] += 3;
        }
        context.rotate(Math.PI / 4);
        var size = Math.pow(fireY[i] / 200, 3.5);
        context.scale((fireWidth + size) / 2, (fireWidth + size) / 2);
        fire.display();
        context.restore();
    }

    //rakieta środkowy prostokąt
    context.save();
    rocket.Color = "#ffffff";
    context.translate(myCanvas.width / 2 - rocketWidth / 2, myCanvas.height / 2 - rocketHeight / 2);
    context.scale(rocketWidth, rocketHeight);
    rocket.display();
    context.restore();

    //rakieta lewy prostokąt
    context.save();
    context.translate(myCanvas.width / 2 - rocketWidth, myCanvas.height / 2 - rocketHeight / 6);
    context.scale(rocketWidth / 3, rocketHeight / 1.5);
    rocket.display();
    context.restore();

    //rakieta prawy prostokąt
    context.save();
    context.translate(myCanvas.width / 2 + rocketWidth - rocketWidth / 3, myCanvas.height / 2 - rocketHeight / 6);
    context.scale(rocketWidth / 3, rocketHeight / 1.5);
    rocket.display();
    context.restore();

    //rakieta lewy czubek środka
    context.save();
    rocket.Color = "#b8b0b0";
    context.translate(myCanvas.width / 2 - rocketWidth / 2 + rocketTipHeight, myCanvas.height / 2 - rocketHeight / 2 - rocketTipWidth);
    context.transform(0, 1, -1, 2, 0, 0)
    context.scale(rocketTipWidth, rocketTipHeight);
    rocket.display();
    context.restore();

    //rakieta lewy czubek lewej strony
    context.save();
    context.translate(myCanvas.width / 2 - rocketWidth + rocketTipHeight / 3, myCanvas.height / 2 - rocketHeight / 6 - rocketTipWidth / 3);
    context.transform(0, 1, -1, 2, 0, 0)
    context.scale(rocketTipWidth / 3, rocketTipHeight / 3);
    rocket.display();
    context.restore();

    //rakieta lewy czubek prawej strony
    context.save();
    context.translate(myCanvas.width / 2 + rocketWidth - rocketTipHeight / 3, myCanvas.height / 2 - rocketHeight / 6 - rocketTipWidth / 3);
    context.transform(0, 1, -1, 2, 0, 0)
    context.scale(rocketTipWidth / 3, rocketTipHeight / 3);
    rocket.display();
    context.restore();

    //rakieta prawy czubek środka
    context.save();
    rocket.Color = "#7c7575";
    context.translate(myCanvas.width / 2 - rocketWidth / 2 + rocketTipHeight, myCanvas.height / 2 - rocketHeight / 2 - rocketTipWidth);
    context.transform(0, 1, 1, 2, 0, 0)
    context.scale(rocketTipWidth, rocketTipHeight);
    rocket.display();
    context.restore();

    //rakieta prawy czubek lewej strony
    context.save();
    context.translate(myCanvas.width / 2 - rocketWidth + rocketTipHeight / 3, myCanvas.height / 2 - rocketHeight / 6 - rocketTipWidth / 3);
    context.transform(0, 1, 1, 2, 0, 0)
    context.scale(rocketTipWidth / 3, rocketTipHeight / 3);
    rocket.display();
    context.restore();

    //rakieta prawy czubek prawej strony
    context.save();
    context.translate(myCanvas.width / 2 + rocketWidth - rocketTipHeight / 3, myCanvas.height / 2 - rocketHeight / 6 - rocketTipWidth / 3);
    context.transform(0, 1, 1, 2, 0, 0)
    context.scale(rocketTipWidth / 3, rocketTipHeight / 3);
    rocket.display();
    context.restore();

    //okno 1
    context.save();
    roundWindow.Color = "#202020";
    context.translate(myCanvas.width / 2, myCanvas.height / 2);
    context.scale(roundWindowRadius, roundWindowRadius);
    roundWindow.display();
    roundWindow.Color = "#4c4545";
    context.scale(0.7, 0.7);
    roundWindow.display();
    context.restore();

    //okno 2
    context.save();
    roundWindow.Color = "#202020";
    context.translate(myCanvas.width / 2, myCanvas.height / 2 - roundWindowRadius * 3);
    context.scale(roundWindowRadius, roundWindowRadius);
    roundWindow.display();
    roundWindow.Color = "#4c4545";
    context.scale(0.7, 0.7);
    roundWindow.display();
    context.restore();

    //okno 3
    context.save();
    roundWindow.Color = "#202020";
    context.translate(myCanvas.width / 2, myCanvas.height / 2 - roundWindowRadius * 6);
    context.scale(roundWindowRadius, roundWindowRadius);
    roundWindow.display();
    roundWindow.Color = "#4c4545";
    context.scale(0.7, 0.7);
    roundWindow.display();
    context.restore();
    context.restore();

    myFrameVar = setTimeout(nextFrame, 100);
}
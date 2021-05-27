function ThemeSwitcher(state) {
    if (state == "light") {
        $("link[rel*='stylesheet']")[2].href = "css/light.css";
        $("[class*='text-white']").each(function(i, v) {$(v).toggleClass("text-white text-dark");});
        $("[class*='dropdown-menu-dark']").each(function(i, v) {$(v).toggleClass("dropdown-menu-dark dropdown-menu-light");});
        $("[class*='bg-dark']").each(function(i, v) {$(v).toggleClass("bg-dark bg-light");})
        localStorage.setItem("theme", "light");
        $("label[for='theme-switch']").html("おやすみ");
    } else {
        $("link[rel*='stylesheet']")[2].href = "css/dark.css";
        $("[class*='text-dark']").each(function(i, v) {$(v).toggleClass("text-dark text-white");});
        $("[class*='dropdown-menu-light']").each(function(i, v) {$(v).toggleClass("dropdown-menu-light dropdown-menu-dark");});
        $("[class*='bg-light']").each(function(i, v) {$(v).toggleClass("bg-light bg-dark");})
        localStorage.setItem("theme", "dark");
        $("label[for='theme-switch']").html("おはよう");
    }
}

function PickImage() {
    images = new Array;
    // I hate this, it should be a lot cleaner
    images[1] = "repobanner/0.png";
    images[2] = "repobanner/1.png";
    images[3] = "repobanner/2.png";
    images[4] = "repobanner/3.png";
    images[5] = "repobanner/4.png";
    images[6] = "repobanner/5.png";
    images[7] = "repobanner/6.png";
    images[8] = "repobanner/7.png";
    images[9] = "repobanner/8.png";
    images[10] = "repobanner/9.png";
    images[11] = "repobanner/10.png";
    images[12] = "repobanner/11.png";
    images[13] = "repobanner/12.png";
    images[14] = "repobanner/13.png";
    images[15] = "repobanner/14.png";
    images[16] = "repobanner/15.png";
    images[17] = "repobanner/16.png";
    images[18] = "repobanner/17.gif";
    var randomnumber = Math.random() ;
    var rand1 = Math.round( (images.length-1) * randomnumber) + 1;
    var image = images[rand1];
    $("#randimg").attr("src", image);
};

function GetTime() {
    var now = new Date(Date.now());
    var formatted = now.toUTCString();
    $("#time").html(formatted);
};

function Countdown(count_time) {
    if (count_time != null) {
        var countDownDate = new Date(count_time).getTime();
        var now = new Date();
        var nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());

        // Find the distance between now and the count down date
        var distance = countDownDate - nowUTC;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance > 0) {
            var end_time = "<br /> " + days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds";

            $("#countdown").html(end_time);
        } else {
            $("#countdown").html("<br>It's time");
        }
    }
};

function RedirectToMajSoul() {
    window.location.replace("https://mahjongsoul.game.yo-star.com/");
}

var hereForever = new bootstrap.Modal(document.getElementById('hereforever'));
var quick_links = new bootstrap.Modal(document.getElementById('QuickLinks'));
$(document).ready(function() {
   $('[data-toggle="tooltip"]').tooltip();
   newfriend_link = document.getElementById('newfriend');
   var tooltip = bootstrap.Tooltip.getInstance(newfriend_link);
   tooltip.show();
   if (localStorage.getItem("theme") === null) {
       localStorage.setItem("theme", "dark");
   }
   ThemeSwitcher(localStorage.getItem("theme"));
});
var updates = "";
$.getJSON('/updates.json', function(data, textStatus) {
    for (var i = 0; i < data.updates.length; i++) {
        updates += `<dt><a href="`+data.updates[i].link+`"><strong>`+data.updates[i].title+`</strong></a></dt>
        <dd><span class="badge rounded-pill bg-secondary">`+data.updates[i].category+`</span></dd>
        <dd><small>`+data.updates[i].description+`</small></dd>`;
    }
    $("#news").html(updates);
    PickImage();
});
$("#ChangeImage").click(function() {
    PickImage();
});
$("#quit").click(function(event) {
    event.preventDefault();
    hereForever.show();
    var start_countdown = setInterval(SetMajSoulTimer, 1000);
});
$("#to-quicklinks").click(function(event) {
    event.preventDefault();
    quick_links.show();
});
var theme_switched = 0;
$("#theme-switch").on('click', function(event) {
    if(event.originalEvent === undefined)return;
    if ($(this).prop('checked')) {
        ThemeSwitcher("light");
    } else {
        ThemeSwitcher("dark");
    }
});
var iterations = 0;
function SetMajSoulTimer() {
    time = 5 - iterations;
    iterations++;
    console.log(time);
    $("#hereforever .modal-footer").html("Redirecting in "+time+"...");
    if (time == 0) {
        RedirectToMajSoul();
    }
};
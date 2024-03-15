var elem = document.getElementById('ArtCounter');
elem.style.display = 'none';

document.documentElement.style
    .setProperty('--artHeightCss', artHeight+'px');
    document.documentElement.style
    .setProperty('--artWeightCss', wh+'px');
var started = Date.now();

  // make it loop every 1000 milliseconds
  var interval = setInterval(function(){

    // for 12.5 seconds
    if (Date.now() - started > 7500) {

      // and then pause it
      show();
      pickArtFunc(0);
      clearInterval(interval);
    } else {

      // the thing to do every 100ms
      //show();

    }
  }, 1000); // every 1000 milliseconds

const dir = './artwork/artwork';
const dir2 = './assets/';
const Img = new Image();
var cnt =0;
var maxImages = 1;

var maxTest = 30;
function loadImageWithRetry(url, maxRetries) {
  maxImages = maxImages +1;
  const img = new Image();
  let retries = 0;

  function load() {
    img.src = url;
    img.onerror = function() {
      maxImages = maxImages -1;
    };
  }

  load();
}

for (cnt =1;cnt<maxTest;cnt+=1){
  loadImageWithRetry(dir+cnt+".jpg", 0);
}
function show()
{
  updateArt();
}
var pickArt = 0;

function updateArt()
{
  var scrollContainer = document.getElementById("artMenu");
var scrollPos = 0;
scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
});
var buttons = "<table><tr>";
for (var jpp =0;jpp<1;jpp++){
  for (var ipp =0; ipp<maxImages;ipp++){
  buttons += '<td><img id = ii'+ipp+' src="assets/thumb'+ipp+'.png"></td>';
}
}

buttons +='</tr></table>';
document.getElementById("artMenu").innerHTML = buttons;
}

scrollContainer = document.getElementById("artMenu");
scrollContainer.addEventListener('click', (ev) => {
    const x = ev.target.id;
    const l = x.length;
    if(l == 3){pickArt = x.slice(2,l);}
    if(l == 4){pickArt = x.slice(2,l);}
    if(l == 5){pickArt = x.slice(2,l);}
    pickArt -=1;
    if (pickArt === undefined) {
      return;
    }
    window.scrollTo(0,0);
    pickArtFunc(pickArt);
    window.scrollTo(0,0);
  });
function begin()
{
  pickArt =0;
  var scrollContainer = document.getElementById("artMenu");
    scrollContainer.scrollLeft = 0;
  pickArtFunc(pickArt);
  window.scrollTo(0,0);
}
function end()
{
  pickArt =maxImages-2;
  var scrollContainer = document.getElementById("artMenu");
    scrollContainer.scrollLeft = pickArt*100;
  pickArtFunc(pickArt);
  window.scrollTo(0,0);
}
function left()
{
  if(pickArt>1)
  {
    pickArt -=1;
  }
  if(pickArt>4)
  {
    var scrollContainer = document.getElementById("artMenu");
    scrollContainer.scrollLeft = (pickArt-2)*116-350;
  }
  pickArtFunc(pickArt);
  window.scrollTo(0,0);
}
function right()
{
  if(pickArt<maxImages-2)
  {
    pickArt +=1;
  }
    var scrollContainer = document.getElementById("artMenu");
    scrollContainer.scrollLeft = (pickArt-2)*116-350;
    pickArtFunc(pickArt);
  window.scrollTo(0,0);
}
function pickArtFunc(pickArt)
{
  let art = pickArt*1+1;
  let url = "<img src="+dir+art+".jpg />";
  document.getElementById("artShow").innerHTML = url;
  let url2 = "<img src="+dir2+"begin.png onclick='begin()' class = 'arrows' /><img src="+dir2+"left.png onclick='left()' class = 'arrows' /><img src="+dir2+"right.png onclick='right()' class = 'arrows'' /><img src="+dir2+"end.png onclick='end()' class = 'arrows' />";
  document.getElementById("artControl").innerHTML = url2;
}

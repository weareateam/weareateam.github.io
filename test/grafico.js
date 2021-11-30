/////////////////////////////////////////////////////// INIZIO ESPERIENZA /////////////////////////////////////////////////////// 

audioObj = new Audio("media/base.m4a");
audio0 = new Audio("media/triste.m4a");
audio1 = new Audio("media/audio.mp3");
audio2 = new Audio("media/noFear.m4a");
audio3 = new Audio("media/noTriste.m4a");
audio4 = new Audio("media/noNeutral.m4a");
audio5 = new Audio("media/piuSorpreso.m4a");
audio6 = new Audio("media/piuHappy.m4a");

function apertura() {
  document.getElementById('opening').style.display = 'block';
}

var usName;
// initial video
function lightbox_open() {
  usName = document.getElementById("userName").value;
  initMorphcast.then(({start}) => start());

  if(usName.length !== 0){
    console.log(usName);
    var lightBoxVideo = document.getElementById("VisaChipCardVideo");
    window.scrollTo(0, 0);
    document.getElementById('light').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
  
    document.getElementById('opening').style.display = 'none';
    lightBoxVideo.play();
  } else {
    alert('Insert a name please');
  }
}

function lightbox_close() {
  var lightBoxVideo = document.getElementById("VisaChipCardVideo");
  document.getElementById('schemi').style.display = 'none';
  document.getElementById('light').style.display = 'none';
  document.getElementById('fade').style.display = 'none';
  lightBoxVideo.pause();
  prepareFrame();

  // set timer
  document.getElementById('timer').innerHTML =
    03 + ":" + 00;
  startTimer();

  // play music
  audioObj.play();

}

function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if (s == 59) {
    m = m - 1
  }
  if (m < 0) {
    return
  }

  document.getElementById('timer').innerHTML =
    m + ":" + s;
  setTimeout(startTimer, 1000);

  // when the timer stops
  if (s == 0) {
    if (m == 0) {
      finito();
    }
  }
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {
    sec = "0" + sec
  }; // add zero in front of numbers < 10
  if (sec < 0) {
    sec = "59"
  };
  return sec;
}

// grafico
var data = {
  labels: checker,
  datasets: [{
    label: "Andamento emozioni",
    borderColor: "rgba(255,255,255,1)",
    borderWidth: 1.5,
    data: emozioniGrafico,
    stepped: true,
  }]
};

var options = {
  maintainAspectRatio: false,
  scales: {
    y: {
      max: 6,
      min: 0,
      grid: {
        display: false
      },
      ticks: {
        color: "#fff", // this here
      },
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        color: "#fff", // this here
      },
    }
  },
  plugins: {
    legend: {
      display: false
    },
  }
};

var graficoEmo = new Chart('chart', {
  type: 'line',
  options: options,
  data: data
});


/////////////////////////////////////////////////////// GESTIONE EMOZIONI /////////////////////////////////////////////////////// 

var cont = document.getElementById("container")
var contPlus = document.getElementById("containerPlus")

var veta;
var vEmozione;

const config = {
  initialWaitMs: 0,
  periodMs: 2000
};

const config2 = {
  smoothness: 0.70
};

var initMorphcast = new Promise((res) => {
  res(CY.loader()
    .licenseKey("2d18af0251f04bb109bfd324ca885f139c57ff54374d")
    // .addModule(CY.modules().FACE_AGE.name)
    // .addModule(CY.modules().FACE_GENDER.name)
    .addModule(CY.modules().FACE_EMOTION.name)
    .addModule(CY.modules().DATA_AGGREGATOR.name, config)

    .addModule(CY.modules().FACE_AROUSAL_VALENCE.name, config2)
    .addModule(CY.modules().FACE_DETECTOR.name, {})

    .load());
});

var emozioniGrafico = [0, 0, 0, 0, 0, 0, 0]
var checker = 0
var ragazzi = 1
var asseY = [0]
var index = 0
var asseX = [0]

var storicoEmozioni = [0]
// Get the root element
var r = document.querySelector(':root');

var testVariable
var oldVar

var userIsThere

function checkFaccia() {
  window.addEventListener(CY.modules().FACE_DETECTOR.eventName, (evt) => {
    if (evt.detail.totalFaces > 0) {
      userIsThere = true;
      return;
    } else {
      userIsThere = false;
      return;
    }
  });
}

// parte di stampa dei valori medi
window.addEventListener(CY.modules().DATA_AGGREGATOR.eventName, (evt) => {

  checkFaccia()

  if (userIsThere) {
    $("#noFace").fadeOut("fast")
    var emozioni = [
      evt.detail.emotion_Angry.avg,
      evt.detail.emotion_Disgust.avg,
      evt.detail.emotion_Fear.avg,
      evt.detail.emotion_Sad.avg,
      evt.detail.emotion_Neutral.avg,
      evt.detail.emotion_Surprise.avg,
      evt.detail.emotion_Happy.avg
    ]

    const max = Math.max.apply(null, emozioni);

    index = emozioni.indexOf(max);

    storicoEmozioni.push(index)

    if (storicoEmozioni.length > 15)
      storicoEmozioni.shift();

    const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

    // var mediaStorico = average(storicoEmozioni).toFixed(0);

    // trovo il valore che è più presente nell'array dello storico delle emozioni
    function mode(array) {
      if (array.length == 0)
        return null;
      var modeMap = {};
      var maxEl = array[0],
        maxCount = 1;
      for (var i = 0; i < array.length; i++) {
        var el = array[i];
        if (modeMap[el] == null)
          modeMap[el] = 1;
        else
          modeMap[el]++;
        if (modeMap[el] > maxCount) {
          maxEl = el;
          maxCount = modeMap[el];
        }
      }
      return maxEl;
    }

    var varpiufreq = mode(storicoEmozioni)

    console.log(storicoEmozioni, varpiufreq)

    var larghezzaContainer = window.innerWidth * 0.4;

    $(".square").css("width", larghezzaContainer / checker + "px")

    $(".squarePlus").css("width", larghezzaContainer / ragazzi + "px")

// EMOZIONI MEDIE

    if (storicoEmozioni.length >= 9) {

      testVariable = varpiufreq

      if (oldVar != testVariable) { //in questo modo non si sovraccarica arduino

        if (varpiufreq == 0) {
          ragazzi = ragazzi + 1;
          console.log("i ragazzi sono ",ragazzi);

          document.getElementById("emozioneMedia").innerHTML = "Rabbia";
          r.style.setProperty('--color-1', '#FFF2CE');
          r.style.setProperty('--color-2', '#FFF2CE00');
          audioObj.pause();
          audio0.play();
          audio1.pause();
          audio2.pause();
          audio3.pause();
          audio4.pause();
          audio5.pause();
          audio6.pause();

          var div = document.createElement("div");
          div.setAttribute("class", "squarePlus");
          div.setAttribute("id", "rabbia");
          contPlus.appendChild(div);

          adjArrabbiato();

        } else if (varpiufreq == 1) {
          ragazzi = ragazzi + 1;
          console.log("i ragazzi sono ",ragazzi);

          document.getElementById("emozioneMedia").innerHTML = "Disgusto"
          r.style.setProperty('--color-1', '#4C86C1');
          r.style.setProperty('--color-2', '#4C86C100');
          audioObj.pause();
          audio0.pause();
          audio1.play();
          audio2.pause();
          audio3.pause();
          audio4.pause();
          audio5.pause();
          audio6.pause();

          var div = document.createElement("div");
          div.setAttribute("class", "squarePlus");
          div.setAttribute("id", "disgusto");
          contPlus.appendChild(div);

          adjDisgusto();

        } else if (varpiufreq == 2) {
          ragazzi = ragazzi + 1;
          console.log("i ragazzi sono ",ragazzi);

          document.getElementById("emozioneMedia").innerHTML = "Paura"
          r.style.setProperty('--color-1', '#C990EC');
          r.style.setProperty('--color-2', '#C990EC00');
          audioObj.pause();
          audio0.pause();
          audio1.pause();
          audio2.play();
          audio3.pause();
          audio4.pause();
          audio5.pause();
          audio6.pause();

          var div = document.createElement("div");
          div.setAttribute("class", "squarePlus");
          div.setAttribute("id", "paura");
          contPlus.appendChild(div);

          adjPaura();

        } else if (varpiufreq == 3) {
          ragazzi = ragazzi + 1;
          console.log("i ragazzi sono ",ragazzi);

          document.getElementById("emozioneMedia").innerHTML = "Triste"
          r.style.setProperty('--color-1', '#8CC444');
          r.style.setProperty('--color-2', '#8CC44400');
          audioObj.pause();
          audio0.pause();
          audio1.pause();
          audio2.pause();
          audio3.play();
          audio4.pause();
          audio5.pause();
          audio6.pause();

          var div = document.createElement("div");
          div.setAttribute("class", "squarePlus");
          div.setAttribute("id", "triste");
          contPlus.appendChild(div);

          adjTriste();

        } else if (varpiufreq == 4) {
          ragazzi = ragazzi + 1;
          console.log("i ragazzi sono ",ragazzi);

          document.getElementById("emozioneMedia").innerHTML = "Neutrale"
          r.style.setProperty('--color-1', '#FFA941');
          r.style.setProperty('--color-2', '#FFA94100');
          audioObj.pause();
          audio0.pause();
          audio1.pause();
          audio2.pause();
          audio3.pause();
          audio4.play();
          audio5.pause();
          audio6.pause();

          var div = document.createElement("div");
          div.setAttribute("class", "squarePlus");
          div.setAttribute("id", "neutrale");
          contPlus.appendChild(div);

          setTimeout(function() {
            console.log("neutrale per troppo tempo")
            stimolaNeutrale();
          }, 20000);

        } else if (varpiufreq == 5) {
          ragazzi = ragazzi + 1;
          console.log("i ragazzi sono ",ragazzi);

          document.getElementById("emozioneMedia").innerHTML = "Sorpreso"
          r.style.setProperty('--color-1', '#2acbd6');
          r.style.setProperty('--color-2', '#2acad600');
          audioObj.pause();
          audio0.pause();
          audio1.pause();
          audio2.pause();
          audio3.pause();
          audio4.pause();
          audio5.play();
          audio6.pause();

          var div = document.createElement("div");
          div.setAttribute("class", "squarePlus");
          div.setAttribute("id", "sorpreso");
          contPlus.appendChild(div);

        } else if (varpiufreq == 6) {
          ragazzi = ragazzi + 1;
          console.log("i ragazzi sono ",ragazzi);

          document.getElementById("emozioneMedia").innerHTML = "Felicità"
          r.style.setProperty('--color-1', colorRainbow);
          r.style.setProperty('--color-2', colorRainbowtra);
          audioObj.pause();
          audio0.pause();
          audio1.pause();
          audio2.pause();
          audio3.pause();
          audio4.pause();
          audio5.pause();
          audio6.play();

          var div = document.createElement("div");
          div.setAttribute("class", "squarePlus");
          div.setAttribute("id", "felice");
          contPlus.appendChild(div);

          continuaFelice();
        }
      } else {
        // console.log("no change color")
        var div = document.createElement("div");
          div.setAttribute("class", "squarePlus");
          div.setAttribute("id", "loadingcolor");
          contPlus.appendChild(div);
      }

      oldVar = testVariable;
    }

    //fare check delle ultime 10 misurazioni e vedere qual è il valore preponderante
    var emozioneMax

    emozioniGrafico = [0, 0, 0, 0, 0, 0, 0]
    emozioniGrafico[index] = emozioniGrafico[index] + 1;
    checker++;
    asseY.push(checker)
    asseX.push(index)

    graficoEmo.data.datasets[0].data = asseX;
    graficoEmo.data.labels = asseY;
    graficoEmo.update();

    if (index == 0) {
      emozioneMax = "Rabbia"
      rabbia()
    } else if (index == 1) {
      emozioneMax = "Disgusto"
      disgusto()
    } else if (index == 2) {
      emozioneMax = "Paura"
      paura()
    } else if (index == 3) {
      emozioneMax = "Triste"
      triste()
    } else if (index == 4) {
      emozioneMax = "Neutrale"
      neutrale()
    } else if (index == 5) {
      emozioneMax = "Sorpreso"
      sorpreso()
    } else if (index == 6) {
      emozioneMax = "Felicità"
      felice()
    }

  } else {
    $("#noFace").fadeIn("fast")
  }

});

// const age_div = document.querySelector("#age");
// const gen_div = document.querySelector("#gender");
const emo_div = document.querySelector("#emotion");

// EMOZIONI ISTANTANEE

async function rabbia() {
  document.getElementById('emotion').innerHTML = "<b>ARRABBIATO</b>";

  var div = document.createElement("div");
  div.setAttribute("class", "square");
  div.setAttribute("style", "height: " + 100 * (1 - Math.abs(lamediaA)) + "%; opacity: " + 100 * (1 - Math.abs(lamediaV)) + "%");
  div.setAttribute("id", "rabbia");
  cont.appendChild(div);
  return;
}

async function disgusto() {
  document.getElementById('emotion').innerHTML = "<b>DISGUSTATO</b>";

  var div = document.createElement("div");
  div.setAttribute("class", "square");
  div.setAttribute("style", "height: " + 100 * (1 - Math.abs(lamediaA)) + "%; opacity: " + 100 * (1 - Math.abs(lamediaV)) + "%");
  div.setAttribute("id", "disgusto");
  cont.appendChild(div);
  return;
}

async function paura() {
  document.getElementById('emotion').innerHTML = "<b>IMPAURITO</b>";

  var div = document.createElement("div");
  div.setAttribute("class", "square");
  div.setAttribute("style", "height: " + 100 * (1 - Math.abs(lamediaA)) + "%; opacity: " + 100 * (1 - Math.abs(lamediaV)) + "%");
  div.setAttribute("id", "paura");
  cont.appendChild(div);
  return;
}

async function triste() {
  document.getElementById('emotion').innerHTML = "<b>TRISTE</b>";

  var div = document.createElement("div");
  div.setAttribute("class", "square");
  div.setAttribute("style", "height: " + 100 * (1 - Math.abs(lamediaA)) + "%; opacity: " + 100 * (1 - Math.abs(lamediaV)) + "%");
  div.setAttribute("id", "triste");
  cont.appendChild(div);
  return;
}

async function neutrale() {
  document.getElementById('emotion').innerHTML = "<b>NEUTRALE</b>";

  var div = document.createElement("div");
  div.setAttribute("class", "square");
  div.setAttribute("style", "height: " + 100 * (1 - Math.abs(lamediaA)) + "%; opacity: " + 100 * (1 - (Math.abs(lamediaV))/2) + "%");
  div.setAttribute("id", "neutrale");
  cont.appendChild(div);
  return;
}

async function sorpreso() {
  document.getElementById('emotion').innerHTML = "<b>SORPRESO</b>";

  var div = document.createElement("div");
  div.setAttribute("class", "square");
  div.setAttribute("style", "height: " + 100 * (1 - Math.abs(lamediaA)) + "%; opacity: " + 100 * (1 - Math.abs(lamediaV)) + "%");
  div.setAttribute("id", "sorpreso");
  cont.appendChild(div);
  return;
}

async function felice() {
  document.getElementById('emotion').innerHTML = "<b>FELICE</b>";

  var div = document.createElement("div");
  div.setAttribute("class", "square");
  div.setAttribute("style", "height: " + 100 * (1 - Math.abs(lamediaA)) + "%; opacity: " + 100 * (1 - Math.abs(lamediaV)) + "%");
  div.setAttribute("id", "felice");
  cont.appendChild(div);
  return;
}

//EMOZIONI ARDUINO
async function adjArrabbiato() {
  if (isConnectted) {
    await writer.write(enc.encode(`255-75-0@`)); //warm color
    return;
  }
}

async function adjDisgusto() {
  if (isConnectted) {
    await writer.write(enc.encode(`75-35-230@`)); //blue
    return;
  }
}

async function adjPaura() {
  if (isConnectted) {
    await writer.write(enc.encode(`255-0-255@`)); //purple
    return;
  }
}

async function adjTriste() {
  if (isConnectted) {
    await writer.write(enc.encode(`120-225-0@`)); //warm green
    return;
  }
}

async function stimolaNeutrale() {
  if (isConnectted) {
    await writer.write(enc.encode(`225-105-20@`)); //orange
    return;
  }
}

async function continuaFelice() {

  if (isConnectted) {
    await writer.write(enc.encode(`0-0-0@`)); //rainbow
    return;
  }
}

// EMOZIONI PRECISE, AROUSAL E VALENCE
var precisa;
var arousal = 0;
var valence = 0;
var arousalM = [];
var valcenceM = [];
var lamediaA;
var lamediaV;

var rain = 0.00;
var CR = rain.toFixed(0);
colorRainbow = 'rgb(255,' + CR + ', 0)'
colorRainbowtra = 'rgb(255,' + CR + ', 0, 0.0)'

window.addEventListener(CY.modules().FACE_AROUSAL_VALENCE.eventName, (evt2) => {
  precisa = evt2.detail.output.affects38;
  arousal = evt2.detail.output.arousal;
  valence = evt2.detail.output.valence;

  const findHighest = obj => {
    const values = Object.values(obj);
    const max = Math.max.apply(Math, values);
    for (key in obj) {
      if (obj[key] === max) {
        return {
          [key]: max
        };
      };
    };
  };

  var emozionePrecisa = Object.keys(findHighest(precisa))[0];
  document.getElementById('preciso').innerHTML = emozionePrecisa;

  arousalM.push(arousal);
  valcenceM.push(valence);
  return;
});

setInterval(function() {

  var lasommaA = arousalM.reduce((a, b) => a + b, 0);
  lamediaA = (lasommaA / arousalM.length) || 0;

  var lasommaV = valcenceM.reduce((a, b) => a + b, 0);
  lamediaV = (lasommaV / valcenceM.length) || 0;

  document.getElementById('ar').innerHTML = Math.round((lamediaA + Number.EPSILON) * 100) / 100;
  document.getElementById('va').innerHTML = Math.round((lamediaV + Number.EPSILON) * 100) / 100;

  arousalM = [];
  valcenceM = [];

  rain = Math.random()* 255;
  console.log(rain);
  return;

}, 2000);

// I FRAME
function prepareFrame() {
  var ifrm = document.createElement("iframe");
  ifrm.setAttribute("src", "figo");
  ifrm.style.width = "30vw";
  ifrm.style.height = "30vw";
  ifrm.style.display = "block";
  ifrm.style.position = "absolute";
  ifrm.style.left = "35vw";
  ifrm.style.top = "20%";
  ifrm.style.border = "none";
  ifrm.style.backgroundColor = "black";
  document.body.appendChild(ifrm);
}

/////////////////////////////////////////////////////// CONTROLS /////////////////////////////////////////////////////// 

// nascondi controls
var isShown;
window.document.onkeydown = function(e) {
  if (!e) {
    e = event;
  }
  if (e.keyCode == 81) {
    if(isShown == false){
      document.getElementById('upbar').style.display = 'block';
      isShown = true;
    }else{
      document.getElementById('upbar').style.display = 'none';
      isShown = false;
    }
  }
}

// nascondi schemi
var n = 0;
function nasconditutto() {
  if(n==0){
    document.getElementById('schemi').style.display = 'block';
    n = 1;
  } else {
    document.getElementById('schemi').style.display = 'none';
    n = 0;
  }
}

/////////////////////////////////////////////////////// FINE ESPERIENZA /////////////////////////////////////////////////////// 

//tempo scaduto
async function finito() {
  document.getElementById('schemi').style.display = 'block';
  console.log('TEMPO SCADUTO');

  audioObj.pause();
  audio0.pause();
  audio1.pause();
  audio2.pause();
  audio3.pause();
  audio4.pause();
  audio5.pause();
  audio6.pause();

  document.getElementById('closing').style.display = 'block';

  initMorphcast.then(({stop}) => stop());
  capture();
  return;
}

//download grafici
function capture() {
  const captureElement = document.querySelector('#container')
  html2canvas(captureElement)
    .then(canvas => {
      canvas.style.display = 'none'
      document.body.appendChild(canvas)
      return canvas
    })
    .then(canvas => {
      const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
      const a = document.createElement('a')
      a.setAttribute('download', usName + '.png')
      a.setAttribute('href', image)
      a.click()
      canvas.remove()
    })
}

// final video
function final_open() {
  var lightBoxVideo = document.getElementById("finalvideo");
  window.scrollTo(0, 0);
  document.getElementById('light2').style.display = 'block';
  //document.getElementById('fade2').style.display = 'block';
  //lightBoxVideo.play();
}

function final_close() {
  var lightBoxVideo = document.getElementById("finalvideo");
  document.getElementById('light2').style.display = 'none';
  //document.getElementById('fade2').style.display = 'none';
  //lightBoxVideo.pause();
}

//reload page
function reload_page() {
  location.reload();
  return false;
}
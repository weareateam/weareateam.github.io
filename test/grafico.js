// video

function lightbox_open() {
  var lightBoxVideo = document.getElementById("VisaChipCardVideo");
  window.scrollTo(0, 0);
  document.getElementById('light').style.display = 'block';
  document.getElementById('fade').style.display = 'block';
  lightBoxVideo.play();
}

function lightbox_close() {
  var lightBoxVideo = document.getElementById("VisaChipCardVideo");
  document.getElementById('light').style.display = 'none';
  document.getElementById('fade').style.display = 'none';
  lightBoxVideo.pause();

  // TIMER

  // start timer
  document.getElementById('timer').innerHTML =
    02 + ":" + 00;
  startTimer();

  // play music
  var linkAudio = 'base.m4a';
  audioObj = new Audio(linkAudio).play();
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

async function finito() {
  console.log('TEMPO SCADUTO');
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
      a.setAttribute('download', 'utente.png')
      a.setAttribute('href', image)
      a.click()
      canvas.remove()
    })
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

var cont = document.getElementById("container")

var veta;
var vEmozione;

const config = {
  initialWaitMs: 0,
  periodMs: 2000
};

const config2 = {
  smoothness: 0.70
};

CY.loader()
  .licenseKey("2d18af0251f04bb109bfd324ca885f139c57ff54374d")
  // .addModule(CY.modules().FACE_AGE.name)
  // .addModule(CY.modules().FACE_GENDER.name)
  .addModule(CY.modules().FACE_EMOTION.name)
  .addModule(CY.modules().DATA_AGGREGATOR.name, config)

  .addModule(CY.modules().FACE_AROUSAL_VALENCE.name, config2)
  .addModule(CY.modules().FACE_DETECTOR.name, {})

  .load()
  .then(({
    start,
    stop
  }) => start());

// PROVA PROVA PROVA
var precisa;
var arousal = 0;
var valence = 0;
var arousalM = [];
var valcenceM = [];

window.addEventListener(CY.modules().FACE_AROUSAL_VALENCE.eventName, (evt2) => {
  precisa = evt2.detail.output.affects38;
  arousal = evt2.detail.output.arousal;
  valence = evt2.detail.output.valence;
  //console.log(arousal, valence);

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
  var lamediaA = (lasommaA / arousalM.length) || 0;

  var lasommaV = valcenceM.reduce((a, b) => a + b, 0);
  var lamediaV = (lasommaV / valcenceM.length) || 0;

  document.getElementById('ar').innerHTML = Math.round((lamediaA + Number.EPSILON) * 100) / 100;
  document.getElementById('va').innerHTML = Math.round((lamediaV + Number.EPSILON) * 100) / 100;

  arousalM = [];
  valcenceM = [];

  return;

}, 2000);

// EMOZIONI

var emozioniGrafico = [0, 0, 0, 0, 0, 0, 0]

var checker = 0

var asseY = [0]

var index = 0

var asseX = [0]

var storicoEmozioni = [0]
// Get the root element
var r = document.querySelector(':root');

var testVariable
var oldVar

// parte di stampa dei valori medi
window.addEventListener(CY.modules().DATA_AGGREGATOR.eventName, (evt) => {
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

  if (storicoEmozioni.length > 9)
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

  var tropponeutrale

  testVariable = varpiufreq

  if (oldVar != testVariable) { //in questo modo non si sovraccarica arduino

    if (varpiufreq == 0) {
      document.getElementById("emozioneMedia").innerHTML = "Rabbia";
      adjArrabbiato();
      // if (videoisfinito) {adjArrabbiato();} //--> APPENA IL VIDEO FINISCE MI PARTE LA VARIABILE CHE SCATENA VARPIUFREQ

    } else if (varpiufreq == 1) {
      document.getElementById("emozioneMedia").innerHTML = "Disgusto"
    } else if (varpiufreq == 2) {
      document.getElementById("emozioneMedia").innerHTML = "Paura"
    } else if (varpiufreq == 6) {
      document.getElementById("emozioneMedia").innerHTML = "Felicità"
      linkAudio = 'audio.mp3';
      // continuaFelice()
      //audioObj = new Audio(linkAudio).play();
    } else if (varpiufreq == 4) {
      document.getElementById("emozioneMedia").innerHTML = "Neutrale"
      linkAudio = 'triste.m4a';
      //audioObj = new Audio(linkAudio).play();
    } else if (varpiufreq == 3) {
      document.getElementById("emozioneMedia").innerHTML = "Triste"
    } else if (varpiufreq == 5) {
      document.getElementById("emozioneMedia").innerHTML = "Sorpreso"
    }

  } else {
    console.log("no change color")
  }

  oldVar = testVariable;

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
  } else if (index == 6) {
    emozioneMax = "Felicità"
    felice()
  } else if (index == 4) {
    emozioneMax = "Neutrale"
    neutrale()
  } else if (index == 3) {
    emozioneMax = "Triste"
    triste()
  } else if (index == 5) {
    emozioneMax = "Sorpreso"
    sorpreso()
  }

});

// const age_div = document.querySelector("#age");
// const gen_div = document.querySelector("#gender");
const emo_div = document.querySelector("#emotion");

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

async function stimolaNeutrale() {
  if (isConnectted) {
    await writer.write(enc.encode(`225-105-20@`)); //orange
    return;
  }
}

async function adjtriste() {
  if (isConnectted) {
    await writer.write(enc.encode(`120-225-0@`)); //warm grenn
    return;
  }
}





async function felice() {
  document.getElementById('emotion').innerHTML = "<b>FELICE</b>";
  // $("#colore").css("background", "green")

  r.style.setProperty('--color-1', 'rgba(0,255,0,1)');
  r.style.setProperty('--color-2', 'rgba(0,255,0,0)');

  var div = document.createElement("div");
  div.setAttribute("class", "square");
  div.setAttribute("id", "felice");
  cont.appendChild(div);


  // if (isConnectted) {
  //   await writer.write(enc.encode(`0-255-0@`));
  //   return;
  // }
  return;
}


async function rabbia() {
  document.getElementById('emotion').innerHTML = "<b>ARRABBIATO</b>";
  // $("#colore").css("background", "red")

  r.style.setProperty('--color-1', 'rgba(255,0,0,1)');
  r.style.setProperty('--color-2', 'rgba(255,0,0,0)');

  var div = document.createElement("div");
  div.setAttribute("class", "square");
  div.setAttribute("id", "rabbia");
  cont.appendChild(div);

  // if (isConnectted) {
  //   await writer.write(enc.encode(`255-0-0@`));
  //   return;
  // }
  return;
}

async function triste() {
  document.getElementById('emotion').innerHTML = "<b>TRISTE</b>";
  // $("#colore").css("background", "blue")

  var div = document.createElement("div");
  div.setAttribute("class", "square");
  div.setAttribute("id", "triste");
  cont.appendChild(div);


  r.style.setProperty('--color-1', 'rgba(0,0,255,1)');
  r.style.setProperty('--color-2', 'rgba(0,0,255,0)');

  // if (isConnectted) {
  //   await writer.write(enc.encode(`0-0-255@`));
  //   return;
  // }
  return;
}

async function disgusto() {
  document.getElementById('emotion').innerHTML = "<b>DISGUSTATO</b>";
  // $("#colore").css("background", "yellow")

  var div = document.createElement("div");
  div.setAttribute("class", "square");
  div.setAttribute("id", "disgusto");
  cont.appendChild(div);

  r.style.setProperty('--color-1', 'rgba(255,255,0,1)');
  r.style.setProperty('--color-2', 'rgba(255,255,0,0)');

  // if (isConnectted) {
  //   await writer.write(enc.encode(`255-255-0@`));
  //   return;
  // }
  return;
}

async function neutrale() {
  document.getElementById('emotion').innerHTML = "<b>NEUTRALE</b>";
  // $("#colore").css("background", "white")

  var div = document.createElement("div");
  div.setAttribute("class", "square");
  div.setAttribute("id", "neutrale");
  cont.appendChild(div);

  r.style.setProperty('--color-1', 'rgba(255,255,255,1)');
  r.style.setProperty('--color-2', 'rgba(255,255,255,0)');

  // if (isConnectted) {
  //   await writer.write(enc.encode(`255-255-255@`));
  //   return;
  // }
  return;
}

async function paura() {
  document.getElementById('emotion').innerHTML = "<b>IMPAURITO</b>";
  // $("#colore").css("background", "magenta")

  var div = document.createElement("div");
  div.setAttribute("class", "square");
  div.setAttribute("id", "paura");
  cont.appendChild(div);

  r.style.setProperty('--color-1', 'rgba(255,0,255,1)');
  r.style.setProperty('--color-2', 'rgba(255,0,255,0)');

  // if (isConnectted) {
  //   await writer.write(enc.encode(`255-0-255@`));
  //   return;
  // }
  return;
}

async function sorpreso() {
  document.getElementById('emotion').innerHTML = "<b>SORPRESO</b>";
  // $("#colore").css("background", "cyan")

  var div = document.createElement("div");
  div.setAttribute("class", "square");
  div.setAttribute("id", "sorpreso");
  cont.appendChild(div);

  r.style.setProperty('--color-1', 'rgba(0,255,255,1)');
  r.style.setProperty('--color-2', 'rgba(0,255,255,0)');

  // if (isConnectted) {
  //   await writer.write(enc.encode(`0-255-255@`));
  //   return;
  // }
  return;
}

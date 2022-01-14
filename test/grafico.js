var mattia = document.getElementById('startingVideo');
mattia.addEventListener("timeupdate", myfunc,false);

function myfunc(){
	if(this.currentTime > this.duration-5)
      document.getElementById('buttonazzo').style.display = 'block';
	}

/////////////////////////////////////////////////////// INIZIO ESPERIENZA ///////////////////////////////////////////////////////

audioObj = $('#audioObj').get(0);
audio0 = $('#audio0').get(0);
audio1 = $('#audio1').get(0);
audio2 = $('#audio2').get(0);
audio3 = $('#audio3').get(0);
audio4 = $('#audio4').get(0);
audio5 = $('#audio5').get(0);
audio6 = $('#audio6').get(0);

audioObj.volume = 0.4;
audio0.volume = 0.4;
audio1.volume = 0.4;
audio2.volume = 0.4;
audio3.volume = 0.4;
audio4.volume = 0.4;
audio5.volume = 0.4;
audio6.volume = 0.4;

var videoFinito = false;

var audioinplay = null

var coloreParticelle = document.getElementById('particelle');

function apertura() {
  document.getElementById('opening').style.display = 'block';
}

// VIDEO INIZIALE
var usName;

function lightbox_first() {
  usName = document.getElementById("userName").value;
  initMorphcast.then(({start}) => start());

  if(usName.length == 0){
    usName = "UnknowUser";
  }

  var checkBox = document.getElementById("check");

  if (checkBox.checked == true){
    lightbox_close();
  } else {
    lightbox_open();
  }

  document.getElementById('opening').style.display = 'none';
  document.getElementById('contenitore').style.display = 'block';
}

// VIDEO INTRO MOVEL
function lightbox_open() {
  var lightBoxVideo = document.getElementById("VisaChipCardVideo");
  window.scrollTo(0, 0);
  document.getElementById('fade').style.display = 'block';

  document.getElementById('light').style.display = 'block';

  var opacity = 0;
  MyFadeFunction();
  function MyFadeFunction() {
     if (opacity < 1) {
        opacity += .1;
        setTimeout(function(){MyFadeFunction()},100);
     }
     document.getElementById('light').style.opacity = opacity;
  }

  lightBoxVideo.play();
  lightBoxVideo.controls = false;
}

function lightbox_close() {
  var lightBoxVideo = document.getElementById("VisaChipCardVideo");

	lightBoxVideo.pause();
	lightBoxVideo.style.display = "none"
  //prepareFrame();

	document.getElementById('light').style.display = 'block';
	document.getElementById('fade').style.display = 'block';

	video = document.createElement('video');

	document.getElementById('light').appendChild(video)

	video.src = 'assistant/adjIntro.webm';
	video.autoplay = true;
	video.playsinline = true;
	video.type = "video/webm";
	video.setAttribute("width", "1080");
	video.setAttribute("height", "1080");
	video.id = "assistantIntro"

	video.addEventListener('ended', (event) => {
		video.removeAttribute('src');
		video.load();
		video.remove();

		startAll();
	});

}

function startAll() {

	document.getElementById('light').style.display = 'none';
	document.getElementById('fade').style.display = 'none';


		videoFinito = true;

	  // set timer
	  document.getElementById('timer').innerHTML =
	    00 + ":" + 00;
	  //startTimer();
	  chronoStart();

	  // play music
	  audioObj.play();
		audioinplay = 'audioObj';
}

var startTime = 0
var start = 0
var end = 0
var diff = 0
var timerID = 0

function chrono(){
	end = new Date()
	diff = end - start
	diff = new Date(diff)
	var msec = diff.getMilliseconds()
	var sec = diff.getSeconds()
	var min = diff.getMinutes()
	var hr = diff.getHours()-1
	if (min < 10){
		min = "0" + min
	}
	if (sec < 10){
		sec = "0" + sec
	}
	if(msec < 10){
		msec = "00" +msec
	}
	else if(msec < 100){
		msec = "0" +msec
	}
  document.getElementById("timer").innerHTML = hr + ":" + min + ":" + sec;
	timerID = setTimeout("chrono()", 10)
}
function chronoStart(){
	start = new Date()
	chrono()
}
function chronoContinue(){
	start = new Date()-diff
	start = new Date(start)
	chrono()
}
function chronoReset(){
  document.getElementById("timer").innerHTML = "0:00:00";
	start = new Date()
}
function chronoStopReset(){
  document.getElementById("timer").innerHTML = "0:00:00"
}
function chronoStop(){
	clearTimeout(timerID)
}

// fade all
function fadeAll(){
  var opacity = 1;
  MyFadeFunction();
  function MyFadeFunction() {
     if (opacity > 0) {
        opacity -= .05;
        setTimeout(function(){MyFadeFunction()},100);
     }
     document.getElementById('divertimento').style.opacity = opacity;
  }
}

// fade BG
function fadeBg(){
  var opacity = 1;
  MyFadeFunction();
  function MyFadeFunction() {
     if (opacity > 0) {
        opacity -= .05;
        setTimeout(function(){MyFadeFunction()},100);
     }
     document.getElementById('bg-wrap').style.opacity = opacity;
  }
}

// countdown finale
function partiCountdown(){
  document.getElementById('countdownFinale').style.display = 'block';

  var counter = 5;

  setInterval(function() {
    counter = counter - 1;
    document.getElementById('countdownFinale').innerHTML = counter;
  }, 1000);

  setTimeout(function() {
    document.getElementById('countdownFinale').style.display = 'none';
  }, 5000);
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

// I FRAME

var linkFrame = "https://www.facebook.com/";
var ifrm;

function prepareFrame() {
  ifrm = document.createElement("iframe");
  ifrm.id = "divertimento";
  ifrm.style.width = "90vw";
  ifrm.style.height = "90vh";
  ifrm.style.display = "none";
  ifrm.style.position = "absolute";
  ifrm.style.left = "5vw";
  ifrm.style.top = "5vh";
  ifrm.style.border = "none";
  ifrm.style.backgroundColor = "black";
  document.body.appendChild(ifrm);

  frameSettings();

  document.getElementById('divertimento').style.display = 'block';

}

function frameSettings() {
  ifrm.setAttribute("src", linkFrame);
}

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

var testVariable;
var oldVar;

var userIsThere;

var varpiufreq;

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

    varpiufreq = mode(storicoEmozioni)

    // console.log(storicoEmozioni, varpiufreq)
		// console.log(audioinplay)

    var larghezzaContainer = 100;

    $(".square").css("width", larghezzaContainer / checker + "%")

    $(".squarePlus").css("width", larghezzaContainer / checker + "%")

		var checkNeutralita = 0

// EMOZIONI MEDIE

    if (storicoEmozioni.length >= 9) {

      testVariable = varpiufreq

      if (oldVar != testVariable) { //in questo modo non si sovraccarica arduino

        if (varpiufreq == 0) {
          ragazzi = ragazzi + 1;
          // console.log("i ragazzi sono ",ragazzi);

          document.getElementById("emozioneMedia").innerHTML = "Rabbia";
          r.style.setProperty('--color-1', '#FFF2CE');
          r.style.setProperty('--color-2', '#FFF2CE00');

          coloreParticelle.src = "particelle/rabbia.html";

					if (document.getElementById('light').style.display == 'none') {
            cambiaCanzone(audio0)
						audioinplay = 'audio0';
          }

          adjArrabbiato();

        } else if (varpiufreq == 1) {
          ragazzi = ragazzi + 1;
          // console.log("i ragazzi sono ",ragazzi);

          document.getElementById("emozioneMedia").innerHTML = "Disgusto"
          r.style.setProperty('--color-1', '#4C86C1');
          r.style.setProperty('--color-2', '#4C86C100');

          coloreParticelle.src = "particelle/disgusto.html";

					if (document.getElementById('light').style.display == 'none') {
            cambiaCanzone(audio1)
						audioinplay = 'audio1';
          }

          adjDisgusto();

        } else if (varpiufreq == 2) {
          ragazzi = ragazzi + 1;
          // console.log("i ragazzi sono ",ragazzi);

          document.getElementById("emozioneMedia").innerHTML = "Paura"
          r.style.setProperty('--color-1', '#C990EC');
          r.style.setProperty('--color-2', '#C990EC00');

          coloreParticelle.src = "particelle/paura.html";

					if (document.getElementById('light').style.display == 'none') {
            cambiaCanzone(audio2)
						audioinplay = 'audio2';
          }

          adjPaura();

        } else if (varpiufreq == 3) {
          ragazzi = ragazzi + 1;
          // console.log("i ragazzi sono ",ragazzi);

          document.getElementById("emozioneMedia").innerHTML = "Triste"
          r.style.setProperty('--color-1', '#8CC444');
          r.style.setProperty('--color-2', '#8CC44400');

          coloreParticelle.src = "particelle/triste.html";

					if (document.getElementById('light').style.display == 'none') {
            cambiaCanzone(audio3)
						audioinplay = 'audio3';
          }

          adjTriste();

        } else if (varpiufreq == 4) {
          ragazzi = ragazzi + 1;
          // console.log("i ragazzi sono ",ragazzi);

          document.getElementById("emozioneMedia").innerHTML = "Neutrale"
          r.style.setProperty('--color-1', '#FFA941');
          r.style.setProperty('--color-2', '#FFA94100');

          coloreParticelle.src = "particelle/neutrale.html";

					if (document.getElementById('light').style.display == 'none') {
            cambiaCanzone(audio4)
						audioinplay = 'audio4';
					}

					checkNeutralita ++
					// console.log(checkNeutralita)

					if (checkNeutralita >= 2) {
						setTimeout(function() {
	            console.log("neutrale per troppo tempo")
	            stimolaNeutrale();
	          }, 2000);
					}

        } else if (varpiufreq == 5) {
          ragazzi = ragazzi + 1;
          // console.log("i ragazzi sono ",ragazzi);

          document.getElementById("emozioneMedia").innerHTML = "Sorpreso"
          r.style.setProperty('--color-1', '#2acbd6');
          r.style.setProperty('--color-2', '#2acad600');

          coloreParticelle.src = "particelle/sorpreso.html";

					if (document.getElementById('light').style.display == 'none') {
            cambiaCanzone(audio5)
						audioinplay = 'audio5';
          }

        } else if (varpiufreq == 6) {
          ragazzi = ragazzi + 1;
          // console.log("i ragazzi sono ",ragazzi);

          document.getElementById("emozioneMedia").innerHTML = "Felicità"
          //r.style.setProperty('--color-1', colorRainbow);
          //r.style.setProperty('--color-2', colorRainbowtra);
          r.style.setProperty('--color-1', '#ffe800');
          r.style.setProperty('--color-2', '#ffe80000');

          coloreParticelle.src = "particelle/felice.html";

					if (document.getElementById('light').style.display == 'none') {
            cambiaCanzone(audio6)
						audioinplay = 'audio6';
          }

          continuaFelice();
        }
      }

      oldVar = testVariable;
    }

		function delay(time) {
		  return new Promise(resolve => setTimeout(resolve, time));
		}


    function cambiaCanzone(songToPlay) {

      if (audioinplay == 'audioObj') {
        $('#audioObj').animate({
          volume: 0.0
        }, 3000, function() {
          audioObj.pause();
        });

      } else if (audioinplay == 'audio0') {
        $('#audio0').animate({
          volume: 0.0
        }, 3000, function() {
          audio0.pause();
        });
      } else if (audioinplay == 'audio1') {
        $('#audio1').animate({
          volume: 0.0
        }, 3000, function() {
          audio1.pause();
        });
      } else if (audioinplay == 'audio2') {
        $('#audio2').animate({
          volume: 0.0
        }, 3000, function() {
          audio2.pause();
        });
      } else if (audioinplay == 'audio3') {
        $('#audio3').animate({
          volume: 0.0
        }, 3000, function() {
          audio3.pause();
        });
      } else if (audioinplay == 'audio4') {
        $('#audio4').animate({
          volume: 0.0
        }, 3000, function() {
          audio4.pause();
        });
      } else if (audioinplay == 'audio5') {
        $('#audio5').animate({
          volume: 0.0
        }, 3000, function() {
          audio5.pause();
        });
      } else if (audioinplay == 'audio6') {
        $('#audio6').animate({
          volume: 0.0
        }, 3000, function() {
          audio6.pause();
        });
      }

      delay(3000).then(() => songToPlay.play());
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

	var divPlus = document.createElement("div");
  divPlus.setAttribute("class", "squarePlus");
  if (varpiufreq == 0) {
    divPlus.setAttribute("id", "rabbia");
  } else if (varpiufreq == 1) {
    divPlus.setAttribute("id", "disgusto");
  } else if (varpiufreq == 2) {
    divPlus.setAttribute("id", "paura");
  } else if (varpiufreq == 3) {
    divPlus.setAttribute("id", "triste");
  } else if (varpiufreq == 4) {
    divPlus.setAttribute("id", "neutrale");
  } else if (varpiufreq == 5) {
    divPlus.setAttribute("id", "sorpreso");
  } else if (varpiufreq == 6) {
    divPlus.setAttribute("id", "felice");
  }

  contPlus.appendChild(divPlus);

  return;
}

async function disgusto() {
  document.getElementById('emotion').innerHTML = "<b>DISGUSTATO</b>";

  var div = document.createElement("div");
  div.setAttribute("class", "square");
  div.setAttribute("style", "height: " + 100 * (1 - Math.abs(lamediaA)) + "%; opacity: " + 100 * (1 - Math.abs(lamediaV)) + "%");
  div.setAttribute("id", "disgusto");
  cont.appendChild(div);

	var divPlus = document.createElement("div");
  divPlus.setAttribute("class", "squarePlus");
  if (varpiufreq == 0) {
    divPlus.setAttribute("id", "rabbia");
  } else if (varpiufreq == 1) {
    divPlus.setAttribute("id", "disgusto");
  } else if (varpiufreq == 2) {
    divPlus.setAttribute("id", "paura");
  } else if (varpiufreq == 3) {
    divPlus.setAttribute("id", "triste");
  } else if (varpiufreq == 4) {
    divPlus.setAttribute("id", "neutrale");
  } else if (varpiufreq == 5) {
    divPlus.setAttribute("id", "sorpreso");
  } else if (varpiufreq == 6) {
    divPlus.setAttribute("id", "felice");
  }

  contPlus.appendChild(divPlus);

  return;
}

async function paura() {
  document.getElementById('emotion').innerHTML = "<b>IMPAURITO</b>";

  var div = document.createElement("div");
  div.setAttribute("class", "square");
  div.setAttribute("style", "height: " + 100 * (1 - Math.abs(lamediaA)) + "%; opacity: " + 100 * (1 - Math.abs(lamediaV)) + "%");
  div.setAttribute("id", "paura");
  cont.appendChild(div);

	var divPlus = document.createElement("div");
  divPlus.setAttribute("class", "squarePlus");
  if (varpiufreq == 0) {
    divPlus.setAttribute("id", "rabbia");
  } else if (varpiufreq == 1) {
    divPlus.setAttribute("id", "disgusto");
  } else if (varpiufreq == 2) {
    divPlus.setAttribute("id", "paura");
  } else if (varpiufreq == 3) {
    divPlus.setAttribute("id", "triste");
  } else if (varpiufreq == 4) {
    divPlus.setAttribute("id", "neutrale");
  } else if (varpiufreq == 5) {
    divPlus.setAttribute("id", "sorpreso");
  } else if (varpiufreq == 6) {
    divPlus.setAttribute("id", "felice");
  }

  contPlus.appendChild(divPlus);


  return;
}

async function triste() {
  document.getElementById('emotion').innerHTML = "<b>TRISTE</b>";

  var div = document.createElement("div");
  div.setAttribute("class", "square");
  div.setAttribute("style", "height: " + 100 * (1 - Math.abs(lamediaA)) + "%; opacity: " + 100 * (1 - Math.abs(lamediaV)) + "%");
  div.setAttribute("id", "triste");
  cont.appendChild(div);

	var divPlus = document.createElement("div");
  divPlus.setAttribute("class", "squarePlus");
  if (varpiufreq == 0) {
    divPlus.setAttribute("id", "rabbia");
  } else if (varpiufreq == 1) {
    divPlus.setAttribute("id", "disgusto");
  } else if (varpiufreq == 2) {
    divPlus.setAttribute("id", "paura");
  } else if (varpiufreq == 3) {
    divPlus.setAttribute("id", "triste");
  } else if (varpiufreq == 4) {
    divPlus.setAttribute("id", "neutrale");
  } else if (varpiufreq == 5) {
    divPlus.setAttribute("id", "sorpreso");
  } else if (varpiufreq == 6) {
    divPlus.setAttribute("id", "felice");
  }

  contPlus.appendChild(divPlus);

  return;
}

async function neutrale() {
  document.getElementById('emotion').innerHTML = "<b>NEUTRALE</b>";

  var div = document.createElement("div");
  div.setAttribute("class", "square");
  div.setAttribute("style", "height: " + 100 * (1 - Math.abs(lamediaA)) + "%; opacity: " + 100 * (1 - (Math.abs(lamediaV))/2) + "%");
  div.setAttribute("id", "neutrale");
  cont.appendChild(div);

	var divPlus = document.createElement("div");
  divPlus.setAttribute("class", "squarePlus");
  if (varpiufreq == 0) {
    divPlus.setAttribute("id", "rabbia");
  } else if (varpiufreq == 1) {
    divPlus.setAttribute("id", "disgusto");
  } else if (varpiufreq == 2) {
    divPlus.setAttribute("id", "paura");
  } else if (varpiufreq == 3) {
    divPlus.setAttribute("id", "triste");
  } else if (varpiufreq == 4) {
    divPlus.setAttribute("id", "neutrale");
  } else if (varpiufreq == 5) {
    divPlus.setAttribute("id", "sorpreso");
  } else if (varpiufreq == 6) {
    divPlus.setAttribute("id", "felice");
  }

  contPlus.appendChild(divPlus);

  return;
}

async function sorpreso() {
  document.getElementById('emotion').innerHTML = "<b>SORPRESO</b>";

  var div = document.createElement("div");
  div.setAttribute("class", "square");
  div.setAttribute("style", "height: " + 100 * (1 - Math.abs(lamediaA)) + "%; opacity: " + 100 * (1 - Math.abs(lamediaV)) + "%");
  div.setAttribute("id", "sorpreso");
  cont.appendChild(div);

	var divPlus = document.createElement("div");
  divPlus.setAttribute("class", "squarePlus");
  if (varpiufreq == 0) {
    divPlus.setAttribute("id", "rabbia");
  } else if (varpiufreq == 1) {
    divPlus.setAttribute("id", "disgusto");
  } else if (varpiufreq == 2) {
    divPlus.setAttribute("id", "paura");
  } else if (varpiufreq == 3) {
    divPlus.setAttribute("id", "triste");
  } else if (varpiufreq == 4) {
    divPlus.setAttribute("id", "neutrale");
  } else if (varpiufreq == 5) {
    divPlus.setAttribute("id", "sorpreso");
  } else if (varpiufreq == 6) {
    divPlus.setAttribute("id", "felice");
  }

  contPlus.appendChild(divPlus);

  return;
}

async function felice() {
  document.getElementById('emotion').innerHTML = "<b>FELICE</b>";

  var div = document.createElement("div");
  div.setAttribute("class", "square");
  div.setAttribute("style", "height: " + 100 * (1 - Math.abs(lamediaA)) + "%; opacity: " + 100 * (1 - Math.abs(lamediaV)) + "%");
  div.setAttribute("id", "felice");
  cont.appendChild(div);

	var divPlus = document.createElement("div");
  divPlus.setAttribute("class", "squarePlus");
  if (varpiufreq == 0) {
    divPlus.setAttribute("id", "rabbia");
  } else if (varpiufreq == 1) {
    divPlus.setAttribute("id", "disgusto");
  } else if (varpiufreq == 2) {
    divPlus.setAttribute("id", "paura");
  } else if (varpiufreq == 3) {
    divPlus.setAttribute("id", "triste");
  } else if (varpiufreq == 4) {
    divPlus.setAttribute("id", "neutrale");
  } else if (varpiufreq == 5) {
    divPlus.setAttribute("id", "sorpreso");
  } else if (varpiufreq == 6) {
    divPlus.setAttribute("id", "felice");
  }

  contPlus.appendChild(divPlus);

  return;
}

var video
var parentA = document.getElementById("parentAssistant")

function updateAssistant(qualeAssistente) {
	document.querySelectorAll('.assistant').forEach(e => e.remove());

	video = document.createElement('video');

	parentA.appendChild(video)

	video.src = 'assistant/' + qualeAssistente + '.webm';
	video.autoplay = true;
	video.playsinline = true;
	video.type = "video/webm";
	video.setAttribute("width", "400");
	video.setAttribute("height", "400");
	// video.setAttribute("controls", "false");
	video.className = "assistant"

	video.addEventListener('ended', (event) => {
		video.removeAttribute('src');
		video.load();
		video.remove();
	});
}


//EMOZIONI ARDUINO
async function adjArrabbiato() {

	if (videoFinito) {
		updateAssistant("adjAngry")
	}

  if (isConnectted) {
    await writer.write(enc.encode(`255-75-0@`)); //warm color
    return;
  }
}

async function adjDisgusto() {

	if (videoFinito) {
		updateAssistant("adjDisgust")
	}

  if (isConnectted) {
    await writer.write(enc.encode(`75-35-230@`)); //blue
    return;
  }
}

async function adjPaura() {

	if (videoFinito) {
		updateAssistant("adjFear")
	}

  if (isConnectted) {
    await writer.write(enc.encode(`255-0-255@`)); //purple
    return;
  }
}

async function adjTriste() {

	if (videoFinito) {
		updateAssistant("adjSadness")
	}

  if (isConnectted) {
    await writer.write(enc.encode(`120-225-0@`)); //warm green
    return;
  }
}

async function stimolaNeutrale() {

	if (videoFinito) {
		updateAssistant("adjNeutral")
	}

  if (isConnectted) {
    await writer.write(enc.encode(`255-0-0@`)); //orange
    return;
  }
}

async function continuaFelice() {

  if (isConnectted) {
    await writer.write(enc.encode(`105-255-40@`)); //rainbow
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
  //console.log(rain);
  return;

}, 2000);

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
      document.body.style.cursor = 'default';
      isShown = true;

    }else{
      document.getElementById('upbar').style.display = 'none';
      document.body.style.cursor = 'none';
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

  document.body.style.cursor = 'default';

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
  final_open();
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

    const captureElement2 = document.querySelector('#containerPlus')
    html2canvas(captureElement2)
    .then(canvas2 => {
      canvas2.style.display = 'none'
      document.body.appendChild(canvas2)
      return canvas2
    })
    .then(canvas2 => {
      const image2 = canvas2.toDataURL('image/png').replace('image/png', 'image/octet-stream')
      const a2 = document.createElement('a')
      a2.setAttribute('download', usName + '-recap.png')
      a2.setAttribute('href', image2)
      a2.click()
      canvas2.remove()
    })
}

// final video
function final_open() {
  var lightBoxVideo = document.getElementById("finalvideo");
  window.scrollTo(0, 0);
  document.getElementById('light2').style.display = 'block';
  //document.getElementById('fade2').style.display = 'block';
  lightBoxVideo.play();
}

function final_close() {
  var lightBoxVideo = document.getElementById("finalvideo");
  document.getElementById('light2').style.display = 'none';
  lightBoxVideo.pause();

  capture();
  //document.getElementById('fade2').style.display = 'none';
}

//reload page
function reload_page() {
  location.reload();
  return false;
}


function audioVolumeIn(q) {
  if (q.volume) {
    var InT = 0;
    var setVolume = 0.4; // Target volume level for new song
    var speed = 0.005; // Rate of increase
    q.volume = InT;
    var eAudio = setInterval(function() {
      InT += speed;
      q.volume = InT.toFixed(1);
      if (InT.toFixed(1) >= setVolume) {
        clearInterval(eAudio);
        //alert('clearInterval eAudio'+ InT.toFixed(1));
      };
    }, 50);
  };
};

function audioVolumeOut(q) {
  if (q.volume) {
    var InT = 0.4;
    var setVolume = 0; // Target volume level for old song
    var speed = 0.005; // Rate of volume decrease
    q.volume = InT;
    var fAudio = setInterval(function() {
      InT -= speed;
      q.volume = InT.toFixed(1);
      if (InT.toFixed(1) <= setVolume) {
        clearInterval(fAudio);
        //alert('clearInterval fAudio'+ InT.toFixed(1));
      };
    }, 50);
  };
};

window.onbeforeunload = function (e) {

  var e = e || window.event;

  //IE & Firefox
  if (e) {
    e.returnValue = 'Are you sure?';
  }

  // For Safari
  return 'Are you sure?';
};

window.document.onkeydown = function(f) {
  if (!f) {
    f = event;
  }
  if (f.keyCode == 70) {
      var ciao = document.getElementById('particelle');
      ciao.src = "particelle/rabbia.html";
      console.log(ciao);
  }
}

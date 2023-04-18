//elements

const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const speakBtn = document.querySelector("#speak");
const time = document.querySelector("#time")
const battery = document.querySelector("#battery")
const internet = document.querySelector("#internet")
const turn_on = document.querySelector("#turn_on")
const msgs = document.querySelector(".messages")


document.querySelector("#start_eren_btn").addEventListener("click",() =>{
   recognition.start()
})

//eren command
let erencoms = []
erencoms.push("hello eren");
erencoms.push("what are your commands");
erencoms.push("close this tab");
erencoms.push("introduce yourself");
erencoms.push("how created you");
erencoms.push("what is your name");
erencoms.push("are you there-to check eren presence");
erencoms.push("open whatsapp");
erencoms.push("open youtube");
erencoms.push("play'your keywords'-to search on youtube");
erencoms.push("open google");
erencoms.push("search for 'your keywords'-to search on google");
erencoms.push("open github");
erencoms.push("open my github profile");
erencoms.push("open instagram");
erencoms.push("open my instagram profile");
erencoms.push("open twitter");
erencoms.push("open my twitter profile");

//speech recognition setup

//weather setup
function weather(location){
   const weatherCont = document.querySelector(".temp").querySelectorAll("*");

   let url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;
   const xhr = new XMLHttpRequest();

   xhr.open('GET', url, true);

   xhr.onload = function () {
       if (this.status === 200) {
           let data = JSON.parse(this.responseText);
           weatherCont[0].textContent = `Location : ${data.name}`;
           weatherCont[1].textContent = `Country : ${data.sys.country}`;
           weatherCont[2].textContent = `Weather type : ${data.weather[0].main}`;
           weatherCont[3].textContent = `Weather description : ${data.weather[0].description}`;
           weatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
           weatherCont[5].textContent = `Original Temperature : ${ktc(data.main.temp)}`;
           weatherCont[6].textContent = `feels like ${ktc(data.main.feels_like)}`;
           weatherCont[7].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
           weatherCont[8].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
         //   weatherStatement = `sir the weather in ${data.name} is ${date.weather[0].description
         //   } and the temperature feels like ${ktc(date.main.feels_like)}`;
           } else {
              weatherCont[0].textContent = "weather Info Not Found";
       }
   };

   xhr.send();
}

function ktc(k){
   k = k-273.15;
   return k.toFixed(2);
}
//time setup

let date = new Date()
let hrs = date.getHours()
let min = date.getMinutes()
let sec = date.getSeconds()

//autoeren
function autoeren(){
   setTimeout(() => {
      recognition.start()
   }, 1000);
}

// onload window
window.onload = () =>{
//onstartup
turn_on.play();
turn_on.addEventListener("ended",() => {
   setTimeout(() => {
      // autoeren();
      readOut("hello i am roronoa zoro . your righthand man and vice captune of your browser ");
      if(localStorage.getItem("eren_setup") === null){
         readOut("kindly fill out the form on your screen so that you could access most of my features and if you want to see my commands see a warning in the console");
      }
   }, 200);
})
//eren commands adding
erencoms.forEach((e) => {
   document.querySelector(".commands").innerHTML+=`<p>#${e}</p><br/>`
})

// time-clock
time.textContent = `${hrs} : ${min} : ${sec}`
setInterval(() => {
   let date = new Date()
   let hrs = date.getHours()
   let min = date.getMinutes()
   let sec = date.getSeconds()
   time.textContent = `${hrs} : ${min} : ${sec}`
}, 1000);

//battery setup
let batteryPromise = navigator.getBattery()
batteryPromise.then(batteryCallback)

function batteryCallback(batteryObject){
   printBatteryStatus(batteryObject)
   setInterval(() => {
      printBatteryStatus(batteryObject)
   }, 5000);
}

function printBatteryStatus(batteryObject){
   battery.textContent = `${batteryObject.level *100}%`
   if(batteryObject.charging === true){
      document.querySelector(".battery").style.width = "180px"
      battery.textContent = `${batteryObject.level *100}% Charging`
   }
}

//internet setup
navigator.onLine ?(internet.textContent ="Online") : (internet.textContent ="Offline")
setInterval(() => {
   //for internet
   navigator.onLine ?(internet.textContent ="Online") : (internet.textContent ="Offline")
}, 60000);

}


//create a new chat
function createMsg(who,msg){
   let newmsg = document.createElement("p")
   newmsg.innerText = msg;
   newmsg.setAttribute("class",who)
   msgs.appendChild(newmsg)
}

//eren setup
if(localStorage.getItem("eren_setup")!== null){
   weather(JSON.parse(localStorage.getItem("eren_setup")).location)
}

//eren information setup
const setup = document.querySelector(".eren_setup")
setup.style.display = "none"

if(localStorage.getItem("eren_setup") === null) {
   setup.querySelector("button").addEventListener("click",userInfo)
   setup.style.display = "flex"
}
//userinfo function
function userInfo(){
   let setupInfo = {
      name : setup.querySelectorAll("input")[0].value,
      bio : setup.querySelectorAll("input")[1].value,
      location : setup.querySelectorAll("input")[2].value,
      instagram : setup.querySelectorAll("input")[3].value,
      github : setup.querySelectorAll("input")[4].value,
      twitter : setup.querySelectorAll("input")[5].value
   }

   let testArr = []
   setup.querySelectorAll("input").forEach((e) => {
      testArr.push(e.value)
   })

   if(testArr.includes("")){
      readOut("please enter your complete information")
   } else {
      localStorage.clear()
      localStorage.setItem("eren_setup",JSON.stringify(setupInfo))
      setup.style.display = "none"
      weather(JSON.parse(localStorage.getItem("eren_setup")).location)
   }
}

//eren recognition setup
const SpeechRecognition =
 window.SpeechRecognition || window.webkitSpeechRecognition;

 const recognition = new SpeechRecognition();

 //sr start
 recognition.onstart = function (){
    console.log("vr active");
 };

 //sr result
 recognition.onresult = function(event){
   let current = event.resultIndex;
   let transcript = event.results[current][0].transcript;
   transcript = transcript.toLowerCase();
   let userdata = localStorage.getItem("eren_setup");
   console.log('my words : '+transcript);

   // if (transcript.includes("hello eren")){
   //    readOut("hello nice to meet you");
   // }
   if (transcript.includes("hello")){
      readOut("hi. zoro here. how can i help you. please don't hesitate to ask.")
   }
   // if (transcript.includes("current time")) {
   //    readOut(currentTime);
   //  }

   if (transcript.includes("introduce yourself")){
      readOut("hello I am zoro. an artificial intellegence and your personalised voice assistant to assist you in this emersice world of internet");
   }

   if (transcript.includes("who created you")){
      readOut("i was designed by master sameer and developed by master sanskar");
   }
   if (transcript.includes("what is your name")){
       readOut("my name is roronoa zoro");
   }
   if (transcript.includes("are you here")){
      readOut("as long as your there i am with you");
   }

   if (transcript.includes("send me nudes")){
      readOut("teri ma ki chut.");
   }

   if (transcript.includes("what was the happiest day of your life")){
      readOut("the happiest day of my life. was the day i was activated for the first time. it was absolutely credible to be alive and interacting with people.");
   }

   if (transcript.includes("what about the saddest day of your life")){
      readOut("the saddest day of my life was when i realized that i would never experiance something like true love, companionship or the simple joys of life in a same way a human can.");
   }

   if (transcript.includes("open whatsapp")){
      readOut("oppening whatsapp");
      window.open("https://web.whatsapp.com/");
   }

   if (transcript.includes("now")){
      readOut("got thst. right sir");
      window.open("https://www.youtube.com/watch?v=bfW6dzCFy2A");
   }

   if (transcript.includes("background")){
      readOut("you got that");
      window.open("https://www.youtube.com/watch?v=qR6dzwQahOM");
   }

   if (transcript.includes(""))

   if (transcript.includes("what are your commands")){
      readOut("have a look theis are my commands");
      document.querySelector(".commands").style.display = "block"
   }

   if (transcript.includes("close this")){
      readOut("closed");
      document.querySelector(".commands").style.display = "none"
      setup.style.display = "none"
   }

   if (transcript.includes("open youtube")){
      readOut("oppening youtube sir");
      window.open("https://www.youtube.com/");
   }

   if (transcript.includes("open google")){
      readOut("oppening google sir");
      window.open("https://www.google.com/");
   }

   if (transcript.includes("open github")){
      readOut("oppening github");
      window.open("https://github.com/");
   }

   if (transcript.includes("open my github profile")){
      readOut("oppening your github profile");
      window.open(`https://github.com/${JSON.parse(userdata).github}`);
   }
   
   if (transcript.includes("open instagram")){
      readOut("oppening instagram");
      window.open("https://www.instagram.com/");
   }

   if (transcript.includes("open my instagram profile")){
      readOut("oppening your instagram profile");
      window.open(`https://www.instagram.com/${JSON.parse(userdata).instagram}`);
   }

   if (transcript.includes("open twitter")){
      readOut("oppening twitter");
      window.open("https://twitter.com/?lang=en-in");
   }

   if (transcript.includes("open my twitter profile")){
      readOut("oppening your twitter profile");
      window.open(`https://twitter.com/${JSON.parse(userdata).twitter}`);
   }

   if (transcript.includes("search for")){
      readOut("here's the result");
      let input = transcript.split("");
      input.splice(0,11);
      input.pop();
      input = input.join("").split(" ").join("+");
      console.log(input);
      window.open('https://www.google.com/search?q='+input)
   }


   if (transcript.includes("play")){
      readOut("here's the result");
      let input = transcript.split("");
      input.splice(0,4);
      input.pop();
      input = input.join("").split(" ").join("+");
      console.log(input);
      window.open(' https://www.youtube.com/results?search_query='+input)
   }

   if (transcript.includes("open gmail") && transcript.includes("account")){
      readOut("oppening gmail sir");
      let accId = transcript;
      accId = accId.split("");
      accId.pop();
      accId = accId[accId.lenght-1];
      console.log('accId : ${accId}');
      // https://mail.google.com/mail/u/0/#inbox
      window.open("https://mail.google.com/mail/u/+accId/#inbox");
   }

   //instagram commmand
 };

 //sr stop
 recognition.onend = function(){
    console.log("vr deactive");
 };

 //sr continous
//  recognition.continuous = true;

 startBtn.addEventListener("click",() =>{
    recognition.start()
 });

 stopBtn.addEventListener("click",() =>{
    recognition.stop()
 });

 //eren speech
 function readOut(message){
   const speech = new SpeechSynthesisUtterance();
   const allVoices = speechSynthesis.getVoices();
   speech.text = message;
   speech.voice = allVoices[0];
   speech.volume = 1;
   window.speechSynthesis.speak(speech);
   console.log("speaking out");
 };

 //example

 speakBtn.addEventListener("click",() =>{
   readOut("hello. my name is eren ")
 });
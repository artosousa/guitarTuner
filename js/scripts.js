$(document).ready(function(){ 
  var loadedAudio = [];
  var allAudio = [];
  var currentTuning;
  var selectedKey;

  var tunings = {
    standard: ["E", "A", "D", "G", "B", "E"],
    dropD: ["D", "A", "D", "G", "B", "E"],
    halfStep: ["Eb", "Ab", "Db", "Gb", "Bb", "Eb"],
    fullStep: ["D", "G", "C", "F", "A", "D"],
    openD: ["D", "A", "D", "F_sharp", "A", "D"],
    openG: ["D", "G", "D", "G", "B", "D"],
    openA: ["E", "A", "E", "A", "C_sharp", "E"],
    openC: ["C", "G", "C", "G", "C", "E"],
    openE: ["E", "B", "E", "G_sharp", "B", "E"],
    openF: ["F", "A", "C", "F", "C", "F"],
    DADGAD: ["D", "A", "D", "G", "A", "D"]
  };
  document.getElementById("tuning").addEventListener ('change', function (e) {
    e.preventDefault();
    $("#strings").empty();
    selectedKey = e.target.value;
    currentTuning = tunings[selectedKey];
    if(typeof loadedAudio[selectedKey] == 'undefined'){
      loadedAudio[selectedKey] = new Array();
      var stringCount = 1;
      for (var prop in currentTuning) {
          var sound = new Audio();
          sound.src = "strings/" + stringCount + '/'+ currentTuning[prop] +'.mp3';
          sound.load();
          sound.setAttribute("prop", prop);
          sound.addEventListener('loadeddata', function() {
              loadedAudio[selectedKey][this.getAttribute('prop')] = this;
              allAudio.push(this);
              //this.play();
          });
          stringCount++;
      }
    }    

    createColumns();  
    $(".string").bind("click", function(){
      $(allAudio).each(function(){
          this.pause(); // Stop playing
          this.currentTime = 0; // Reset time
      }); 
      var music = loadedAudio[selectedKey][$(this).attr('data-stringnum')-1];
      if (music.paused) {
        if(music.paused == false){}
            music.play();
        } else {
            music.pause();
            music.currentTime = 0;
        }
    });
    function createColumns (colNum){
      var group,
      result = [];
      var colNum = colNum;
      var total = currentTuning.length;
      var column = 0;
      for(var i = 0;  i<=total-1; i++){
        column ++;
        $("#strings").append('<button class="string u-full-width" data-stringnum="'+column+'" id="' + currentTuning[i] + '"> <span class="noteLabel">'+ currentTuning[i] +'</span></button>');
        $('#strings .noteLabel').each(function() {
            var text = $(this).text();
            $(this).text(text.replace('_sharp', '#')); 
        });
      }
    }
  });
});
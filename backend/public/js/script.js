function previewImage() {
    var file = document.getElementById("imagen").files
    if (file.length > 0) {
        var fileReader = new FileReader()

        fileReader.onload = function (event) {
            document.getElementById("preview").setAttribute("src", event.target.result)
        }

        fileReader.readAsDataURL(file[0])
    }
}

//TODO pasar esto a React
function initRepro(index){
    // Obtiene el elemento a reproducir
    var reproductor = document.getElementById("reproductor" + index);

    return reproductor
}

function play(index){
    var reproductor = initRepro(index);
    reproductor.play();
    console.log("PLAY "+reproductor);
}

function pause(index){
    var reproductor = initRepro(index);
    reproductor.pause();

    
    console.log("PAUSE "+reproductor);
}

function stop(index){
    var reproductor = initRepro(index);
    reproductor.pause();
    reproductor.currentTime = 0;
    
    console.log("STOP "+reproductor);
}
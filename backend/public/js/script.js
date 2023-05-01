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

function initRepro(index){
    // Obtiene el elemento a reproducir
    var reproductor = document.getElementById("reproductor" + index);

    return reproductor
}

function getElementsByIdStartsWith(container, selectorTag, prefix) {
    var items = [];
    var repro = document.getElementById(container).getElementsByTagName(selectorTag);
    for (var i = 0; i < repro.length; i++) {
        if (repro[i].id.lastIndexOf(prefix, 0) === 0) {
            items.push(repro[i]);
        }
    }
    return items;
}

function stopAllBut(index){
    var reproductores = getElementsByIdStartsWith("lanzamientos", "audio", "reproductor")

    for(var i =0 ;i < reproductores.length;i++){
        console.log(reproductores[i]);
        var reproductor = document.getElementById(reproductores[i].id);
        if(reproductor.id !== initRepro(index).id){
            reproductor.pause();
            reproductor.currentTime = 0;
        }
    }
}

function play(index){
    var reproductor = initRepro(index);
    stopAllBut(index);
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
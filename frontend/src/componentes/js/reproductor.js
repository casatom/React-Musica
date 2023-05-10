function Reproductor ({index}){
    function initRepro(){
        // Obtiene el elemento a reproducir
        console.log("incio reproductor"+index);
        var reproductor = document.getElementById("reproductor"+index);
        return reproductor
    }
    

    function pause(){
        var reproductor = initRepro();
        reproductor.pause();

        
        console.log("PAUSE "+reproductor);
    }

    function stop(){
        var reproductor = initRepro();
        reproductor.pause();
        reproductor.currentTime = 0;
        
        console.log("STOP "+reproductor);
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

    function stopAllBut(){
        var reproductores = getElementsByIdStartsWith("lanzamientos", "audio", "reproductor")

        for(var i =0 ;i < reproductores.length;i++){
            console.log(reproductores[i]);
            var reproductor = document.getElementById(reproductores[i].id);
            if(reproductor.id !== initRepro().id){
                reproductor.pause();
                reproductor.currentTime = 0;
            }
        }
    }

    function play(){
        stopAllBut();
        var reproductor = initRepro();
        reproductor.play();
        console.log("PLAY "+reproductor);
    }

    return(
        <div className="row mt-3">
            <div className="col-md-12">
            <button onClick={play} class="btn btn-primary mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                </svg>
            </button>
            <button onClick={pause} class="btn btn-secondary mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause" viewBox="0 0 16 16">
                <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                </svg>
            </button>
            <button onClick={stop} class="btn btn-danger mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop-fill" viewBox="0 0 16 16">
                <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
                </svg>
            </button>
            </div>
        </div>
    )

    

}


export default Reproductor;
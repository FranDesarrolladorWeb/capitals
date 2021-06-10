//Pol Surriel Muixench | 01/2018
window.help_tester = true;

// * INICIALIZACION VARIABLES ---------------------------
window.country = [    'Albania',    'Alemania',   'Andorra',   'Austria',    'Bélgica',    'Bielorrusia',    'Bosnia-Herzegovina',    'Bulgaria',    'Chipre',    'Croacia',    'Dinamarca',    'Eslovaquia',    'Eslovenia',    'España',    'Estonia',    'Finlandia',    'Francia',    'Grecia',    'Hungría',    'Irlanda',    'Islandia',    'Italia',    'Kosovo',    'Letonia',    'Liechtenstein',    'Lituania',    'Luxemburgo',    'Macedonia',    'Malta',    'Moldavia',          'Mónaco',    'Montenegro',    'Noruega',    'Países Bajos',    'Polonia',    'Portugal',    'Reino Unido',    'República Checa',    'Rumania',    'Rusia',    'San Marino',    'Serbia',    'Suecia',    'Suiza',    'Ucrania',    'Turquía' ];
window.capital = [	'Tirana',	'Berlín','Andorra la Vieja',	'Viena','Bruselas',	'Minsk',	'Sarajevo',	'Sofía',	'Nicosia',	'Zagreb',	'Copenhague',	'Bratislava',	'Liubliana',	'Madrid',	'Tallin',	'Helsinki',	'París',	'Atenas', 	'Budapest',	'Dublín',	'Reikiavik',	'Roma',	'Pristina',	'Riga',	'Vaduz',	'Vilna',	'Luxemburgo',	'Skopie',	'La Valeta',	'Chisináu', 	'Mónaco',	'Podgorica',	'Oslo','Ámsterdam',	'Varsovia','Lisboa',	'Londres',	'Praga',	'Bucarest',	'Moscú',	'San Marino',	'Belgrado',	'Estocolmo',	'Berna',	'Kiev','Ankara'];
window.countryToAsk = country.slice(0);
window.reference = 0;
window.good = 0;
window.bad = -1;
window.progress = 100;
window.speed = 0.6;
window.desaceleracion = 0;
window.RGB = [0,200,0];
window.R=0; window.G=1; window.B=2;
window.bc = [29,119,239];

function onload(){
    window.goodDiv = document.getElementById('bien');
    window.badDiv = document.getElementById('mal');
    window.answersDiv = document.getElementById('respuesta');
    window.countryDiv = document.getElementById('pais');
    window.opContainer = document.getElementById('optionsContainer');
    window.bandera = document.getElementById('bandera');
    window.flash = document.getElementById('flash');
    window.cont = document.getElementById('cont');
    document.body.style.backgroundColor = 'rgb(29,119,239)';

    refrescarPuntuacion();
    refrescar();
}
// ----------------------------------------------------



// * FUNCIONES ----------------------------------------

//Funcion para elegir una opción desde JS.
function elegir(esto){
    document.getElementById('respuesta').value = esto;
    probar();
}

//Comprueba si la opción elegida es correcta.
//Switchea el flujo de ejecución.
function probar() {    
    if(country.length-1 <= (good+bad)){
        if(answersDiv.value == capital[reference]){
            good++;
        }else{
            bad++;
        }
        end();    
    }else{
        refrescarBarra();
        refrescarPuntuacion();
        refrescar();
    }
}

//Resetea los valores de la barra que decrece.
//No uso constantes por picar rápido.
function refrescarBarra(){
    window.progress = 100;
    window.speed = 0.6;
    window.desaceleracion = 0;
    window.RGB = [0,200,0];

}

//Modifica los contadores de aciertos y fallos y sus respectivas variantes:
 //Color de fondo e indicador de progreso.
function refrescarPuntuacion(){
    if(answersDiv.value == capital[reference]){
        good++;
        bc[R]-=2.5;
        bc[G]+=6.5;
        bc[B]-=3;
        document.body.style.backgroundColor = 'rgb('+bc[R]+','+bc[G]+','+bc[B]+')';
        cont.innerHTML = (good+bad+1)+"/"+country.length;
        flashColor('#00ff80');
    }else{
        bad++;
        bc[R]+=2.5;
        bc[G]-=6.5;
        bc[B]-=13;
        document.body.style.backgroundColor = 'rgb('+bc[R]+','+bc[G]+','+bc[B]+')';
        cont.innerHTML = (good+bad+1)+"/"+country.length;
        flashColor('red');
    }
}

//Prepara y muestra de nuevo el cuestionario con un país aún no preguntado.
function refrescar() {

    numOptions = 5;
    positionOfTrurth = Math.round(Math.random()*(numOptions-1)); 

    aux = Math.round(Math.random()*(countryToAsk.length-1));
    reference = country.indexOf(countryToAsk[aux]);
    countryToAsk.splice(aux,1);
    
    bandera.src= "./img/"+country[reference]+".png";
    countryDiv.innerHTML = country[reference];
    answersDiv.innerHTML = '<option hidden class="opcion">Elige una opción</option>';
    opContainer.innerHTML = '';
    if(window.help_tester){
        document.getElementById('help_tester').innerHTML = capital[reference];
    }

    added = '';
    for (var i = 0; i < numOptions; i++) {
        if(i == positionOfTrurth){
            answersDiv.innerHTML += '<option class="opcion">'+capital[reference]+'</option>';
            opContainer.innerHTML += '<div class="opcion" onclick="elegir(\''+capital[reference]+'\')">'+capital[reference]+'</div>';
        }else{
            do{randomPosition = Math.round(Math.random()*(country.length-1));
            }while(randomPosition == reference || added.includes(capital[randomPosition]));
            answersDiv.innerHTML += '<option class="opcion">'+capital[randomPosition]+'</option>';
            opContainer.innerHTML += '<div class="opcion" onclick="elegir(\''+capital[randomPosition]+'\')">'+capital[randomPosition]+'</div>';
            added += capital[randomPosition]; 
        }   
    }
}

//Animación de un flash superpuesto en z-index 1.
//Pasar valor del color (CSS) por parámetro
function flashColor(color){
    
    window.flash.style.backgroundColor = color;
    window.flash.style.display = 'block';
    window.op = 0;

    var interval = setInterval(function() {
        op += 0.1;
        window.flash.style.opacity = op;
    }, 30);

    setTimeout(function() {
        clearInterval(interval);
        
        interval = setInterval(function() {
            op -= 0.1;
            window.flash.style.opacity = op;
        }, 30);
    
        setTimeout(function() {
            clearInterval(interval);    
            window.flash.style.display = 'none';
        }, 100);

    }, 100);
}

//Animación que da lugar a la pantalla de game over.
function end(){
    clearInterval(window.movBarra);
    flash.style.display = 'block';
    flash.style.backgroundColor = 'gray';

    var interval = setInterval(function() {
        op += 0.02;
        window.flash.style.opacity = op;
    }, 30);

    setTimeout(function() {
        clearInterval(interval);

    }, 1000);

    goodPercentage = (good * 100) /country.length;
    badPercentage = 100 - goodPercentage;
    
    document.getElementById('mensajeFinal').innerHTML = good+'/'+country.length+' Acertadas <br> <h1>'+ Math.round(goodPercentage)+'%</h1> <a href="index.html"><img id="ref" src="./img/refresh.png"></a>';
    document.getElementById('mensajeFinal').style.opacity = 0;

    fs = 70;
    top = 100;
    desc = 0.08;
    op2 = 0;
    var interval2 = setInterval(function() {
        op2 += 0.015;
        fs -= desc;
        top += desc;
        if (desc >0){
            desc -= 0.001;
        }
        document.getElementById('mensajeFinal').style.opacity = op2;
        document.getElementById('mensajeFinal').style.fontSize = fs+"px";
        document.getElementById('mensajeFinal').style.marginTop = top+"px";
    }, 30);

    setTimeout(function() {
        clearInterval(interval2);

    }, 2500);


}

// ------------------------------------------


// RUTINAS ----------------------------------

window.movBarra = setInterval(function() { 
    
        window.progress-= speed;
        if(window.speed >= 0.1){
            window.speed -= 0.0015; //desaceleracionConstante
            window.speed -= desaceleracion;
            desaceleracion += 0.000002;
    
        }
        if(RGB[R] < 255){
            if (RGB[G] < 90){
                window.RGB[R] -= Math.round(speed*3 );
            }else{
                window.RGB[R] += Math.round(speed*3.5 );
            }
        }
        if(RGB[0] >= 170 && RGB[1] > 0){
            window.RGB[G] -= Math.round(speed*4.3 );
        }
        
    
        bar = document.getElementById('b1');
        bar.style.width = window.progress+'%';
        bar.style.backgroundColor = 'rgb('+RGB[0]+','+RGB[1]+','+RGB[2]+')';
        
        
        if(progress < 0){
            probar();
        } 
    
    
    }, 30);


    //AYUDA PARA TESTER:


// ------------------------------------------------
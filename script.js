"uses strict";
const lienzo=document.getElementById("lienzo");
const ctx=lienzo.getContext("2d");

const rango=document.getElementById("rango");
rango.addEventListener("change", dibujarCuadricula);

const color=document.getElementById("color");
color.addEventListener("change", dibujarCuadricula);

const ancho=lienzo.clientWidth;
const alto=lienzo.clientHeight;

let zoom=100;//variable de control de Zoom con parámetro inicial
let desplazamiento=[]; //Variable de control de coordenadas
desplazamiento[0]=ancho/2; //Coordenadas iniciales
desplazamiento[1]=alto/2;
//Variables de control de movimiento
let x_inicio=0, y_inicio=0, x_final=0, y_final=0;
//función de escucha de rueda de mouse para zoom
lienzo.addEventListener("wheel", e=>{
    if (e.deltaY<0){
        zoom+=3;
        dibujarCuadricula();
    }else{
        zoom-=3;
        if (zoom<40)
            zoom=40;
        dibujarCuadricula();
    } 
});

dibujarCuadricula();
//función de dibujado de cuadrícula
function dibujarCuadricula(){
    ctx.clearRect(0,0, ancho,alto);//borra lienzo por cada modificación
    ctx.lineWidth=0.5; //establece ancho de lineas secundarias
    //CONTROL DEL EJE X
    if (desplazamiento[0]<0){

        /*Condicional que comprueba si el y=0 está a la izquierda del canvas,
        en ese caso le da continuidad de graficamiento a la cuadrícula*/

        let numeros=0;//variables de escala numérica de ejes X
        for(let x=desplazamiento[0];x<ancho;x+=zoom){        
            ctx.beginPath();
            ctx.moveTo(x,0);
            ctx.lineTo(x,alto);
            ctx.stroke();
            ctx.closePath();
            //Condicionales de dibujo de números de axis
            if (desplazamiento[1]<0){
                /*En el caso de que el y=0 de dezplace por arriba del lienzo
                este condicional ancla los números la parte superior de la pantalla
                para no perder la referencia de la ubicación*/
                ctx.fillText(numeros, x+10,30);
                ctx.font="25px Arial";
                ctx.fillStyle="Blue";
                ctx.textAlign="center";
                numeros++;
            }else if (desplazamiento[1]>alto){
                /*En el caso de y>alto del lienzo este condicional ancla los números 
                a la parte inferiror de la pantalla para no perder la referencia 
                de la ubicación*/
                ctx.fillText(numeros, x+10,alto-30);
                ctx.font="25px Arial";
                ctx.fillStyle="Blue";
                ctx.textAlign="center";
                numeros++;
            }else{
                /*En el caso de que el eje de coordenadas y=0 esté dentro
                de la parte visible del canvas dibuja los números pegados 
                a la parte inferior al eje X*/
                ctx.fillText(numeros, x+10,desplazamiento[1]+30);
                ctx.font="25px Arial";
                ctx.fillStyle="Blue";
                ctx.textAlign="center";
                numeros++;
            }
        }
    }else if(desplazamiento[0]>ancho){

        /*Condicional que comprueba si el y>ancho está a la derecha del canvas,
        en ese caso le da continuidad de graficamiento a la cuadrícula*/

        let numeros=0;
        for(let x=desplazamiento[0];x>0;x-=zoom){        
            ctx.beginPath();
            ctx.moveTo(x,0);
            ctx.lineTo(x,alto);
            ctx.stroke();
            ctx.closePath();
            
            if (desplazamiento[1]<0){
                /*En el caso de que el y=0 de dezplace por arriba del lienzo
                este condicional ancla los números la parte superior de la pantalla
                para no perder la referencia de la ubicación*/
                ctx.fillText(numeros, x+10,30);
                ctx.font="25px Arial";
                ctx.fillStyle="Blue";
                ctx.textAlign="center";
                numeros--;
            }else if (desplazamiento[1]>alto){
                /*En el caso de y>alto del lienzo este condicional ancla los números 
                a la parte inferiror de la pantalla para no perder la referencia 
                de la ubicación*/
                ctx.fillText(numeros, x+10,alto-30);
                ctx.font="25px Arial";
                ctx.fillStyle="Blue";
                ctx.textAlign="center";
                numeros--;
            }else{
                /*En el caso de que el eje de coordenadas y=0 esté dentro
                de la parte visible del canvas dibuja los números pegados 
                a la parte inferior al eje X*/
                ctx.fillText(numeros, x+10,desplazamiento[1]+30);
                ctx.font="25px Arial";
                ctx.fillStyle="Blue";
                ctx.textAlign="center";
                numeros--;
            }
        }
    }else{
        
        /*Condicional que comprueba si el eje y está dentro del ancho  del canvas,
        en ese caso dibuja la cuadrícula normalmente*/

        let aux=0, numeros=0;
        aux=(Math.ceil(desplazamiento[0]/zoom))*zoom;
        numeros=-Math.ceil(desplazamiento[0]/zoom)
        aux=desplazamiento[0]-aux;
        for(let x=aux;x<ancho;x+=zoom){        
            ctx.beginPath();
            ctx.moveTo(x,0);
            ctx.lineTo(x,alto);
            ctx.stroke();
            ctx.closePath();
            
            if (desplazamiento[1]<0){
                /*En el caso de que el y=0 de dezplace por arriba del lienzo
                este condicional ancla los números la parte superior de la pantalla
                para no perder la referencia de la ubicación*/
                ctx.fillText(numeros, x+10,30);
                ctx.font="25px Arial";
                ctx.fillStyle="Blue";
                ctx.textAlign="center";
                numeros++;
            }else if (desplazamiento[1]>alto){
                /*En el caso de y>alto del lienzo este condicional ancla los números 
                a la parte inferiror de la pantalla para no perder la referencia 
                de la ubicación*/
                ctx.fillText(numeros, x+10,alto-30);
                ctx.font="25px Arial";
                ctx.fillStyle="Blue";
                ctx.textAlign="center";
                numeros++;
            }else{
                /*En el caso de que el eje de coordenadas y=0 esté dentro
                de la parte visible del canvas dibuja los números pegados 
                a la parte inferior al eje X*/
                ctx.fillText(numeros, x+10,desplazamiento[1]+30);
                ctx.font="25px Arial";
                ctx.fillStyle="Blue";
                ctx.textAlign="center";
                numeros++;
            }
        }
    }
//----------------------------------------------
    //CONTROL DEL EJE Y -IDEM EJEX-
    if (desplazamiento[1]<0){
        let numeros=0;
        for(let y=desplazamiento[1];y<alto;y+=zoom){        
            ctx.beginPath();
            ctx.moveTo(0,y);
            ctx.lineTo(ancho,y);
            ctx.stroke();
            ctx.closePath();

            if(desplazamiento[0]<0){
                ctx.fillText(numeros, 20,y-5);
                ctx.font="25px Arial";
                ctx.fillStyle="Blue";
                ctx.textAlign="center";
                numeros--;
            }else if(desplazamiento[0]>ancho){
                ctx.fillText(numeros, ancho-20,y-5);
                ctx.font="25px Arial";
                ctx.fillStyle="Blue";
                ctx.textAlign="center";
                numeros--;
            }else{
                ctx.fillText(numeros, desplazamiento[0]+20,y-5);
                ctx.font="25px Arial";
                ctx.fillStyle="Blue";
                ctx.textAlign="center";
                numeros--;
            }
        }
    }else if(desplazamiento[1]>alto){
        let numeros=0;
        for(let y=desplazamiento[1];y>0;y-=zoom){        
            ctx.beginPath();
            ctx.moveTo(0,y);
            ctx.lineTo(ancho,y);
            ctx.stroke();
            ctx.closePath();

            if(desplazamiento[0]<0){
                ctx.fillText(numeros, 20,y-5);
                ctx.font="25px Arial";
                ctx.fillStyle="Blue";
                ctx.textAlign="center";
                numeros++;
            }else if(desplazamiento[0]>ancho){
                ctx.fillText(numeros, ancho-20,y-5);
                ctx.font="25px Arial";
                ctx.fillStyle="Blue";
                ctx.textAlign="center";
                numeros++;
            }else{
                ctx.fillText(numeros, desplazamiento[0]+20,y-5);
                ctx.font="25px Arial";
                ctx.fillStyle="Blue";
                ctx.textAlign="center";
                numeros++;
            }
        }
    }else{
        let aux=0, numeros=0;
        aux=(Math.ceil(desplazamiento[1]/zoom))*zoom;
        aux=desplazamiento[1]-aux;

        numeros=Math.ceil(desplazamiento[1]/zoom);
        for(let y=aux;y<alto;y+=zoom){        
            ctx.beginPath();
            ctx.moveTo(0,y);
            ctx.lineTo(ancho,y);
            ctx.stroke();
            ctx.closePath();

            if(desplazamiento[0]<0){
                ctx.fillText(numeros, 20,y-5);
                ctx.font="25px Arial";
                ctx.fillStyle="Blue";
                ctx.textAlign="center";
                numeros--;
            }else if(desplazamiento[0]>ancho){
                ctx.fillText(numeros, ancho-20,y-5);
                ctx.font="25px Arial";
                ctx.fillStyle="Blue";
                ctx.textAlign="center";
                numeros--;
            }else{
                ctx.fillText(numeros, desplazamiento[0]+20,y-5);
                ctx.font="25px Arial";
                ctx.fillStyle="Blue";
                ctx.textAlign="center";
                numeros--;
            }
        }
    }    
    //línea vertical del eje Y=0
    ctx.lineWidth=5;
    ctx.beginPath();
    ctx.moveTo(desplazamiento[0],0);    
    ctx.lineTo(desplazamiento[0],alto);
    ctx.stroke();
    ctx.closePath();
    //línea horizontal del eje X=0
    ctx.lineWidth=5;
    ctx.beginPath();
    ctx.moveTo(0,desplazamiento[1]);    
    ctx.lineTo(ancho,desplazamiento[1]);
    ctx.stroke();
    ctx.closePath();
    //Grafico la función
    dibujarFuncion();   
};
//Control de evento inicial de arrastre del mouse
lienzo.addEventListener("mousedown",e=>{
    lienzo.style.cursor="pointer";   
    const tam=lienzo.getBoundingClientRect();
    x_inicio = tam.left;
    y_inicio = tam.top;
    x_inicio = e.pageX-x_inicio;
    y_inicio = e.pageY-y_inicio;
});
//Control de evento final de suelta de mouse
lienzo.addEventListener("mouseup",e=>{  
    const tam=lienzo.getBoundingClientRect();
    x_final = tam.left;
    y_final = tam.top;
    x_final = e.pageX-x_final;
    y_final = e.pageY-y_final; 
    desplazamiento[0]+=x_final-x_inicio;
    desplazamiento[1]+=y_final-y_inicio;
    dibujarCuadricula();
    dibujarFuncion();
    lienzo.style.cursor="context-menu"; 
});
function dibujarFuncion(){
    let x; /*Variable de inicio de coordenadas dentro del área visible 
    del canvas del dominio para optimización de cálculo */
    let y;//Imagen de la función
    let final; //Valor final del dominio dentro del área visible del canvas
    let incremento;//Variable de intervalo de crecimiento  de la función 
    let aux_x, aux_y;//Variables de ajuste de ploteo de la función

    /*Condicionales de control que definen el origen y fin del dominio solo 
    en la parte visible del canvas -Optimización de operaciones de trazado-*/

    if (desplazamiento[0]<0){
        x=(0-desplazamiento[0])/zoom;
        final=(ancho/zoom)+x;
    }else if (desplazamiento[0]>ancho){
        x=-desplazamiento[0]/zoom;
        final=(ancho-desplazamiento[0])+x;
    }else{
        x=-desplazamiento[0]/zoom;
        final=(ancho-desplazamiento[0])/zoom;
    }
    incremento=(final-x)/rango.value; /*Asignación de la variable de control de incremento,
    el denominador determina la cantidad de puntos a graficar dentro del área visible
    del canvas, mientras más puntos halla, más contínua se va a ver la función*/

    for (x;x<final;x+=incremento){
        /*===================FUNCIÓN A GRAFICAR==========================*/
        y=Math.pow(x,3)+2-3*x;
        /*===================FUNCIÓN A GRAFICAR==========================*/

        //Corrección de coordenadas para ploteo en el canvas
        if (x<=0){
            aux_x=desplazamiento[0]-(Math.abs(x)*zoom);
        }else{
            aux_x=desplazamiento[0]+(Math.abs(x)*zoom);
        }
        if (y<=0){
            aux_y=desplazamiento[1]+(Math.abs(y)*zoom);
        }else{
            aux_y=desplazamiento[1]-(Math.abs(y)*zoom);
        }

        //Dibujo individual de puntos en el canvas
        ctx.beginPath();
        ctx.fillStyle=color.value;
        ctx.arc(aux_x, aux_y, 2, 0, 2 * Math.PI);
        ctx.fill(); 
        ctx.closePath();
        //Ploteo de la función en el canvas
        
    }
    ctx.fillStyle="Orange";
    ctx.fillText("", 100,50);
    ctx.font="25px Arial";
    ctx.textAlign="center";
};



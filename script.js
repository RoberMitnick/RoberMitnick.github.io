
var MatElements;
function fuenteMemN(){
    document.getElementById("funcMemN").style.display="block";
    document.getElementById("funcMarkov").style.display="none";
    //document.getElementById("checkExtendido").style.display="none";
    //document.getElementById("extendN").style.display="none";
}
function fuenteMarkov(){
    document.getElementById("funcMemN").style.display="none";
    document.getElementById("funcMarkov").style.display="block";
    document.getElementById("checkExtendido").style.display="none";
    document.getElementById("extendN").style.display="none";
}
var activExtend=false;
function actExtend(){
    if(activExtend){
        activExtend=false;
        document.getElementById("extendN").style.display="none";
    }else{
        activExtend=true;
        document.getElementById("extendN").style.display="block";
    }
}

function logB(r,q){
    let a=0;
    if(r!="e" && q!=0){
        a=Math.log(q)/Math.log(parseInt(r));
    }else if(q!=0){
        a=Math.log(q);
    }
    return a;
}
function CalcularEntro(mat,r){
    let a=0;
    for(let i=0;i<mat.length;i++){
        //vamos a calcular la entropia
        if(mat[i]!=0){
            a=a+(mat[i]*logB(r,1/mat[i]));
        }
        
    }
    return a;
}
function GenerarTable(){
    document.getElementById("resultado1").innerHTML="";
    document.getElementById("EntroCalcuN").style.display="none";
    document.getElementById("resultadoE").innerHTML="";
    document.getElementById("EntroCalcuE").style.display="none";
    document.getElementById("tableTExtendida").innerHTML="";
    document.getElementById("fimne").style.display="none";
    document.getElementById("fimn").style.display="block";
    document.getElementById("buttonCalMN").disabled=false;  
    MatElements=(document.getElementById("alfabetoS").value).split(",");
    let StringTable="<tr class=\"table-primary\"><th class=\"table-primary\">S</th><th>Pi</th></tr>";
    let tableT=document.getElementById("tableT");
    for(let i=0;i<MatElements.length;i++){
        let fila="<tr class=\"table-primary\" ><td class=\"table-primary\" >"+ MatElements[i] +"</td><td class=\"table-primary\" ><input type=\"text\" id=\"s"+ i +"\" ></td></tr>";
        StringTable+=fila;
    }
    tableT.innerHTML=StringTable;
}
function crearTable(elementsM){
    
    let StringTable="<tr class=\"table-primary\"><th class=\"table-primary\">Z</th><th>Pj</th></tr>";
    let tableTE=document.getElementById("tableTExtendida");
    for(let i=0;i<elementsM.length;i++){
        let fila="<tr class=\"table-primary\"><td class=\"table-primary\"> z"+(i+1)+"</td><td class=\"table-primary\">"+elementsM[i]+"</td></tr>";
        StringTable+=fila;
    }
    tableTE.innerHTML=StringTable;
}

function CEntropia(){
    let numf=MatElements.length;  //cantidad de probabilidades original 
    let calR=document.getElementById("baseR").value;
    let vecP=new Array(numf);//vector de las probabilidades de cada elemento
    let salida=0;
    for(let i=0;i<numf;i++){
        let ida="s"+i;
        //console.log(ida);
        vecP[i]=parseFloat(document.getElementById(ida).value);
    }
    let numverifi1=0;
    let menora0=false;
    for(let i=0;i<numf;i++){
        numverifi1=numverifi1+vecP[i];
        if(vecP[i]<0){
            menora0=true;
        }
    }
    if(numverifi1==1 && !menora0){
        salida=CalcularEntro(vecP,calR);
        document.getElementById("salidaError").innerHTML="";
        document.getElementById("EntroCalcuN").style.display="block";
        document.getElementById("resultado1").innerHTML="";
        document.getElementById("resultado1").innerHTML=salida.toFixed(3);
        if(activExtend){
            document.getElementById("EntroCalcuE").style.display="block";
            document.getElementById("fimne").style.display="block";
            let numExtend=document.getElementById("numExtendido").value;
            let numT=Math.pow(numf,numExtend);//numero de  de cada elemento
            let Arraycont=new Array(numExtend);
            for(let i=0;i<numExtend;i++){
                Arraycont[i]=Math.pow(numf,i);//guarda la repeticion de cada elemento en para su combinacion (4,2,1)=>{000,001,010,011,100,101,110,111}
            }
            for(let i = 0;i<numT;i++){
                console.log(Arraycont[i]);
            }
            let matCom=new Array(numT);//matriz de la combinaciones
            let vectSalida=new Array(numT); //vector del resultado de las combinaciones
            let estadoAct=new Array(numExtend);///vector  del estado actual
            for(let i = 0;i<numExtend;i++){
                estadoAct[i]=0;
            }
            for(let i = 0;i<numT;i++){
                matCom[i]=estadoAct;
                console.log("estadoAct antes: "+ estadoAct);
                let CalP=1;
                for(let e=0;e<numExtend;e++){
                    CalP=CalP*vecP[estadoAct[e]];
                    Arraycont[e]=Arraycont[e]-1; ///bajamos el numero de repeticiones de cada elemento
                    if(Arraycont[e]==0){
                        Arraycont[e]=Math.pow(numf,e);
                        estadoAct[e]=estadoAct[e]+1;///pasamos al siguiente elemento de nuestro alfabeto al estado actual
                        if(estadoAct[e]==numf){
                            estadoAct[e]=0;
                        }
                    }
                    //console.log("estadoAct actual ${e}: "+ estadoAct);
                }
                
                vectSalida[i]=CalP.toFixed(3);
            }
            salida=CalcularEntro(vectSalida,calR);
            document.getElementById("resultadoE").innerHTML="";
            document.getElementById("resultadoE").innerHTML=salida.toFixed(3);
            crearTable(vectSalida);
            /*
            console.log("Matriz de combinaciones");  
            for(let i=0;i<numT;i++){
                console.log(matCom[i]);
            }
            console.log("Ultima combinacion");
            for(let i=0;i<numExtend;i++){
                console.log(estadoAct[i]);
            }
            console.log("Vector de probabilidades");
            for(let i=0;i<numT;i++){
                console.log(vectSalida[i]);
            }
            console.log("Entropia: "+salida);
            */
        }
        
    }else{
        let salidaError="";
        if(numverifi1!=1){
            if(numverifi1>=0 || numverifi1>1 || numverifi1<0){
                salidaError=salidaError+"- La suma de las probabilidades no es 1 \n  ";
            }
            
            if(menora0){
                salidaError=salidaError+"- Existe un elemento con probabilidad menor a 0 \n";
            }
            console.log("salida Error: "+salidaError);
            document.getElementById("resultado1").innerHTML="";
            document.getElementById("EntroCalcuN").style.display="none";
            document.getElementById("resultadoE").innerHTML="";
            document.getElementById("EntroCalcuE").style.display="none";
            document.getElementById("tableTExtendida").innerHTML="";
            document.getElementById("fimne").style.display="none";
            document.getElementById("salidaError").innerHTML=salidaError;
        }
        
    }



}
function CEntropiaM(){

}

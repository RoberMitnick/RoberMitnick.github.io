
var MatElements;
var MatElementsMarkov;
function fuenteMemN(){
    document.getElementById("funcMemN").style.display="block";
    document.getElementById("funcMarkov").style.display="none";
    document.getElementById("mMarkov").style.display="none";
    document.getElementById("fimn").style.display="none";
    document.getElementById("fimMarkov").style.display="none";
    document.getElementById("EntroCalcuN").style.display="none";
    document.getElementById("EntroCalcuMarkov").style.display="none";
    document.getElementById("alfabetoS").disabled=false;
    document.getElementById("baseR").disabled=false;
    document.getElementById("ordenMarkov").disabled=false;
    document.getElementById("alfabetoS").value="";
    document.getElementById("baseR").value="";
    document.getElementById("ordenMarkov").value=0;
    document.getElementById("inputArch").style.display="none";
    
}
function fuenteMarkov(){
    document.getElementById("funcMemN").style.display="none";
    document.getElementById("funcMarkov").style.display="block";
    document.getElementById("mMarkov").style.display="block";
    document.getElementById("fimn").style.display="none";
    document.getElementById("fimMarkov").style.display="none";
    document.getElementById("EntroCalcuN").style.display="none";
    document.getElementById("EntroCalcuMarkov").style.display="none";
    document.getElementById("alfabetoS").disabled=true;
    document.getElementById("baseR").disabled=true;
    document.getElementById("ordenMarkov").disabled=true;
    document.getElementById("alfabetoS").value="";
    document.getElementById("baseR").value="";
    document.getElementById("ordenMarkov").value=0;
    document.getElementById("tableMarkov").innerHTML="";
    document.getElementById("inputArch").style.display="block";
}
var activExtend=false;
function actExtend(){
    if(activExtend){
        activExtend=false;
        document.getElementById("extendMarkov").style.display="none";
    }else{
        activExtend=true;
        document.getElementById("extendMarkov").style.display="block";
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
            a=a+parseFloat(mat[i])*logB(r,1/parseFloat(mat[i]));
        }
        
    }
    return a;
}
//function corregirDec(vectorSs){
function corregirDecimalSum(vectorSs){//verificar si el vectr suma 1
    let salidaT=false;
    let numk=vectorSs.length;
    let vectorotro=new Array(numk);
    let maxleng=0;
    for(let i=0;i<numk;i++){
        let auxvector=new Array(2);
        auxvector=(vectorSs[i].toString()).split('.');
        vectorotro[i]=auxvector;
        if(vectorotro[i][1].length>maxleng){
            maxleng=vectorotro[i][1].length;
        }
    }
    //console.log("maxleng anterior:" + maxleng);
    //console.log("vectorotro anterior:" + vectorotro);

    for(let i=0;i<numk;i++){
        if(vectorotro[i][1].length<maxleng){
            let minuss=maxleng-vectorotro[i][1].length;
            //console.log("vectorotro "+i+","+1+": "+ minuss);
            for(let j=0;j<minuss;j++){
                vectorotro[i][1]=vectorotro[i][1]+"0";
            }
            //console.log("vectorotro22222222 "+i+","+1+": "+ vectorotro[i][1]);
        }
    }
    let sumpunto=0;
    for(let i=0;i<numk;i++){
        sumpunto=BigInt(sumpunto)+BigInt(vectorotro[i][1]);
    }
    let restleng=(sumpunto.toString()).length-maxleng;
    let acarreo=0;
    let decimalAct=0;
    //console.log("sumpunto: "+sumpunto);
    //console.log("restleng: "+restleng);
    if(restleng>0){
        let acarreoString="";
        let puntor="";
        for(let i=0;i<=maxleng;i++){//
            // separar el acarreo de la suma total de los 
            if(i<restleng){
                acarreoString=acarreoString+(sumpunto.toString()).charAt(i);
            }else{
                puntor=puntor+(sumpunto.toString()).charAt(i);
            }
            //console.log("acarreoString "+i+": "+acarreoString);
            //console.log("puntor "+i+": "+puntor);
        }
        if(acarreoString!=""){
            acarreo=parseInt(acarreoString);
        }
        if(puntor!=""){
            decimalAct=parseInt(BigInt(puntor));
        }
        
    }else{
        acarreo=sumpunto;
    }
    
    let sumnumN=acarreo;
    for(let i=0;i<numk;i++){
        sumnumN=BigInt(sumnumN)+BigInt(vectorotro[i][0]);
    }
    //console.log("decimalAct[]: "+vectorotro);
    //console.log("sumnumN[]: "+vectorotro[0][1]);
    //console.log("decimalAct: "+decimalAct);
    //console.log("sumnumN: "+sumnumN.toString());
    if(sumnumN.toString()=="1"){
        if(decimalAct.toString()=="0"){
            salidaT=true;
        }
    }
    return salidaT;
}
/*
function corregirDec(){
//function corregirDecimalSum(vectorS){
    let numk=vectorS.length;
    let vectotro=new Array(numk);
    let menora0=false;
    for(let i=0;i<numk;i++){
        vectotro[i]=vectorS[i];
    }
    let sumatt=0;
    //verificamos si el vectotro tiene numeros mayores a 1
    let numExp=0;//numero de veces que multiplicamos con 10
    for(let i=0;i<numk;i++){
        let numAct=(vectotro[i].toString()).length;
        console.log("numAct: "+numAct);
        if(vectotro[i]<1){
            Epunto=true;
        }
        if(numAct>numExp){
            numExp=numAct;
        }
    }
    console.log("numExp: "+numExp);
    for(let i=0;i<numk;i++){
        vectotro[i]=BigInt(vectotro[i]*Math.pow(10,numExp));
    }
    for(let i=0;i<numk;i++){
        sumatt=BigInt(sumatt)+vectotro[i];
        if(menora0){
            break;
        }
    }
    console.log("sumatt: "+sumatt);
    let salidaSumatt=(sumatt/BigInt(Math.pow(10,numExp))).toString();
    console.log("salidaSumatt: "+salidaSumatt);
    return [salidaSumatt]
}*/

function GenerarTable(){
    document.getElementById("resultado1").innerHTML="";
    document.getElementById("EntroCalcuN").style.display="none";
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
    let menora0=false;
    for(let i=0;i<numf;i++){
        let ida="s"+i;
        //console.log(ida);
        let varvecp=document.getElementById(ida).value;
        if(varvecp=="1" || varvecp=="0"){
            vecP[i]=varvecp+".0";
        }else{
            vecP[i]=varvecp; 
        }
        
        if(parseFloat(vecP[i])<0){
            menora0=true;
        }
    }
    let numverifi1=corregirDecimalSum(vecP);
    console.log("menora0: "+ menora0);
    if(numverifi1 && !menora0){
        salida=CalcularEntro(vecP,calR);
        document.getElementById("salidaError").innerHTML="";
        document.getElementById("EntroCalcuN").style.display="block";
        document.getElementById("resultado1").innerHTML="";
        document.getElementById("resultado1").innerHTML=salida.toFixed(3);
        /*if(activExtend){
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
            
        }*/
        
    }else{
        let salidaError="";
            if(numverifi1!=1){
                salidaError=salidaError+"- La suma de las probabilidades no es 1 \n  ";
            }
            
            if(menora0){
                salidaError=salidaError+"- Existe un elemento con probabilidad menor a 0 \n";
            }
            //console.log("salida Error: "+salidaError);
            document.getElementById("resultado1").innerHTML="";
            document.getElementById("EntroCalcuN").style.display="none";
            document.getElementById("resultadoE").innerHTML="";
            document.getElementById("EntroCalcuE").style.display="none";
            document.getElementById("tableTExtendidaM").innerHTML="";
            document.getElementById("fimne").style.display="none";
            document.getElementById("salidaError").innerHTML=salidaError;
        
    }

}
//FUENTES DE MARKOV
function GenerarMatriz(matriz){
    document.getElementById("resultadoM").innerHTML="";
    document.getElementById("EntroCalcuMarkov").style.display="none";
    document.getElementById("fimMarkov").style.display="block";
    document.getElementById("buttonCalMarkov").disabled=false;  
    let MatElements1=matriz;
    let StringTable="";
    MatElementsMarkov=new Array(matriz.length);
    let tableT=document.getElementById("tableMarkov");
    for(let i=0;i<MatElements1.length;i++){
        let fila="<tr class=\"table-primary\" >";
        let col=MatElements1[i].split(',');
        MatElementsMarkov[i]=col;
        
        for(let j=0;j<col.length;j++){
            fila+="<td class=\"table-primary\" ><p id=\"s"+ i+""+j+"\" >"+col[j]+"</p></td>";
        }
        fila+="</tr>";
        StringTable+=fila;
    }
    tableT.innerHTML=StringTable;
}

function leerContend(contend){
    const contenidoT=contend.split(/\r?\n|\r/);
    let alfab=contenidoT[0].split(':');
    let rbase=contenidoT[1].split(':');
    let morden=contenidoT[2].split(':');
    document.getElementById("alfabetoS").value=alfab[1];
    document.getElementById("baseR").value=rbase[1];
    document.getElementById("ordenMarkov").value=morden[1];
    let salidaM=new Array(contenidoT.length-3);
    for(let i=0;i<contenidoT.length-3;i++){
            salidaM[i]=contenidoT[i+3]; 
        
    }
    return salidaM;
}
function leerarch(e){
    let archivo= e.target.files[0];
    if(!archivo){
        return;
    }
    let lector=new FileReader();
    lector.onload=function(e){
        let contenido=e.target.result;
        let matrixc=leerContend(contenido);
        GenerarMatriz(matrixc);
        document.getElementById('inputArch').value="";
        console.log(MatElementsMarkov);
    };
    lector.readAsText(archivo);

}
document.querySelector('#inputArch').addEventListener('change', leerarch, false);

function distribucionEsta(matest){
    let lengmat=matest.length;
    for(let i=0;i<lengmat;i++){
        for(let j=0;j<matest[i].length;j++){
            if(i==j){
                matest[i][j]=matest[i][j]-1;
            }
            if(i==lengmat-1){
                matest[i][j]=1;
            }
        }
    }
    console.log("mat rest: "+matest);
    let inver=math.inv(matest);
    console.log("invertido: "+inver);
    let dist=new Array(lengmat);
    for(let i=0;i<lengmat;i++){
        dist[i]=inver[i][lengmat-1].toFixed(9);
    }
    return dist;
}
function entroMarkov(mat,distE,r){
    let a=0;
    for(let i=0;i<mat.length;i++){
        //vamos a calcular la entropia
        if(mat[i]!=0){
            a=a+distE[i]*parseFloat(mat[i]);
        }
    }
    return a;
}
function CEntropiaM(){
    let existE=false;
    let vecFila=new Array(MatElementsMarkov[0].length);
    let verifipos=false;
    for(let i=0;i<MatElementsMarkov[0].length;i++){
        //TODO: separar vectores columnas para verificar si suman 1
        for(let j=0;j<MatElementsMarkov.length;j++){
            if(MatElementsMarkov[j][i]=="1" || MatElementsMarkov[j][i]=="0"){
                vecFila[j]=MatElementsMarkov[j][i]+".0";
            }else{
                vecFila[j]=MatElementsMarkov[j][i];
            }
            if(vecFila[j].search('-')!=-1){
                verifipos=true;
            }
        }
        let varVerifi=corregirDecimalSum(vecFila);
        if(varVerifi){
            existE=varVerifi;
        }
    }
    if(!existE || !verifipos){
        document.getElementById("salidaError").innerHTML="";
        document.getElementById("EntroCalcuMarkov").style.display="block";
        let basR=parseInt(document.getElementById("baseR").value);
        let vecAlpha=new Array(MatElementsMarkov[0].length);
        for(let i=0;i<MatElementsMarkov[0].length;i++){
            let vectorColum=new Array(MatElementsMarkov.length);
            for(let j=0;j<MatElementsMarkov.length;j++){
                vectorColum[j]=MatElementsMarkov[j][i]; 
            }
            vecAlpha[i]=CalcularEntro(vectorColum,basR);
        }
        console.log("vecAlpha: "+vecAlpha);
        let matEst=new Array(MatElementsMarkov.length);
        for(let i=0;i<MatElementsMarkov.length;i++){
            let aF=new Array(MatElementsMarkov.length);
            for(let j=0;j<MatElementsMarkov[0].length;j++){
                aF[j]=MatElementsMarkov[i][j];
            }
            matEst[i]=aF;
        }
        let distEstacionaria=distribucionEsta(matEst);
        console.log("destribucion estacionaria: "+distEstacionaria);
        let salida=entroMarkov(vecAlpha,distEstacionaria,basR).toFixed(4);
        document.getElementById("resultadoM").innerHTML=salida;
        console.log("salida: "+salida);
        if(activExtend){
            
        }
    }else{
        document.getElementById("resultadoM").innerHTML="";
            document.getElementById("EntroCalcuMarkov").style.display="none";
            document.getElementById("resultadoEM").innerHTML="";
            document.getElementById("EntroCalcuME").style.display="none";
            document.getElementById("tablTeExtendidaM").innerHTML="";
            document.getElementById("fimne").style.display="none";
            document.getElementById("salidaError").innerHTML=salidaError;
    }
    
}

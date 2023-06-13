
function limpiarT(){
    document.getElementById("funcMemN").style.display="none";
    document.getElementById("funNula").style.display="none";
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
    document.getElementById("tableMarkov").innerHTML="";
    document.getElementById("FactPolynomioGF2").style.display="none";
    document.getElementById("ResulFactPoly").style.display="none";
    document.getElementById("MCDPolyGF2").style.display="none";
    document.getElementById("RMcdGF2").style.display="none";
    document.getElementById("CiclicoCodeG").style.display="none";
    document.getElementById("RCodeGF2").style.display="none";
    document.getElementById("ResultadoFactPol").value="";

}
function FactoriPoly(){
    limpiarT();
    
    document.getElementById("FactPolynomioGF2").style.display="block";
    document.getElementById("ResulFactPoly").style.display="block";

}
function MCDPolyGR2(){
    limpiarT();
    
    document.getElementById("MCDPolyGF2").style.display="block";
    document.getElementById("RMcdGF2").style.display="block";

}
function CiclicoPolyGenerador(){
    limpiarT();
    
    document.getElementById("CiclicoCodeG").style.display="block";
    document.getElementById("RCodeGF2").style.display="block";

}
function converVPol(a){// convierte un vector [1,0,1,1] a polinomio  1 + x^2 + x^3
    var v=a.slice();
    var pol="";
    for(var i=0;i<v.length;i++){
        if(i==0 & v[i]==1){
            pol="1";
        }else if(i==1 & v[i]==1){
            if(pol!=" " & pol.length!=0){
                pol=" + x";
            }else{
                pol="x";
            }
            
        }else if(i==v.length-1 & v[i]==1){
            if(pol.length != 0){
                pol=pol+" + x^"+ i;
            }else{
                pol=pol+"x^"+ i;
            }
            
        }else{
            if(v[i]==1){
                if(pol.length != 0){
                    pol=pol+" + x^"+ i;
                }else{
                    pol=pol + "x^"+i;
                }

                
            }
            
        }
    }
    return pol;
}

function sumgr2(a,b){
    var c=a+b;
    if(c%2==0){
        return 0;
    }else{
        return 1;
    }
}
function mulgr2(a,b){
    var c=a*b;
    if(c%2==0){
        return 0;
    }else{
        return 1;
    }
}
//para sumar polinomios en un campo 2,  con vectores, y la posicion de los vectores representando su grado
function gradoMP(v){ /// grado mayor de un polinomio en forma de vector ejem[0,1,0,0,1,1,0,0,0,0,1]
    var g=[];
    for(var i=0;i<v.length;i++){ //sacamos los grados de cada elemento que no es 0, ejem[1,4,5,10]
        var p=i*v[i];
        g.push(p);
    }
    var a=mayMP(g);
    return a; 
}
function mayMP(g){ /// numero mayor de un vector ejem [1,3,6,8]
    var may=0
    for(var i=0;i<g.length;i++){
        if(g[i]>may){
            may=g[i];
        }
    }
    return may;
}

function sumPolGr2(a,b){
    var c=new Array(a.length);
    for(var i=0;i<a.length;i++){
        c[i]=sumgr2(a[i],b[i]);
    }

    for(var i=c.length-1;i>=0;i--){
        if(c[i]==0){
            c.pop();
        }else{
            i=-1;
        }
    }
    return c;
}
// para multiplicar un polinomio con un numero
function mulPolGr2(a,b){ // a=el vector, b= numero
    var c=new Array(a.length);
    
    for(var i=0;i<a.length;i++){
        c[i]=mulgr2(a[i],b);
    }

    for(var i=c.length;i>=0;i--){
        if(c[i]==0){
            c.pop();
        }else{
            i=-1;
        }
    }
    return c;
}

function Poly01(c){ /// convierte un vetor de grados a un vector de coeficientes del polinomio gr(2), c=[0,2,5]
    var may=mayMP(c);
    console.log("c: "+may);
    var vect=c.slice(); 
    var vp= Array(may+1).fill(0); /// coeficientes del polinomio en un vector 
    for(var i=0;i<vect.length;i++){
        vp[vect[i]]=sumgr2(vp[vect[i]],1);
    }
    console.log("vp: "+vp);
    return vp;   
}

function divgr2(a,ga,b,gb){ // a=dividendo en forma de vector ejem[1,0,1,0,0,1,0,1], ga=grado de a , b=divisor ejem[1,0,1], gb=grado de b

    var D=a.slice();
    var d=b.slice();
    var gD=ga+1;
    var gd=gb+1;
    var gra=gD-gd; // restas de longitudes del vector a - longitud del vector b
    var resul=[];
    if(gD>=gd){
        for(var z=0;z<gra+1;z++){
            if(D.length < b.length){
                resul.push(0);
            // console.log("RESULTADO: ");
            // console.log(resul);
                //console.log("---------------------------------------------------------");
            }else{
                var h= gD-gd;
                var matD=[]
                for(var o=0;o<h;o++){
                    matD.push(0);
                }
                for(var o=0;o<=gd-1;o++){
                    matD.push(d[o]);
                }
            // console.log("grado de D: " + gD);
            // console.log(D);
            //  console.log(matD);
            //  console.log("---------------------------------------------------------");
                D=sumPolGr2(D,matD).slice();
            // console.log(D);
            //  console.log("---------------------------------------------------------");
                resul.push(1);
                var e=gD-D.length
                var a=e;
            //  console.log("e: "+e);
            //  console.log("---------------------------------------------------------");
                if(D.length >= b.length){
                    if(e==0){
                        resul.push(1);
                    }
                    while(a>1){
                        resul.push(0);
                        gD--;
                        a--;
                        
                        console.log("reduccion");
                        console.log(gD);
                    }
                }
            //  console.log("a: "+a);
            //      console.log("---------------------------------------------------------");
                
            //   console.log("RESULTADO: ");
            //   console.log(resul);
            //   console.log("---------------------------------------------------------");
                gD--;
            }
            
        }
        var temp=[];
        var tamaResul=resul.length-1;
        for(var o=tamaResul ;o>=0;o--){
            temp.push(resul[o]);
        }
        for(var o=0 ;o<=tamaResul;o++){
            resul[o]=temp[o];
        }
    }
    var resto=D.slice();
    return [resul,resto];
}
function verifi0(v){ /// verifica si un vector de coeficientes es de puro 0, Ejem.[0,0,0,0,0,0,0]
    var verif=true;
    for(var i=0;i<v.length;i++){
        if(v[i]!=0){
            verif=false;
            break;
        }
    }
    return verif;
}
/*
function verifi1(v){ // varifica si un polinomio solo tiene termino independiente, Ejem.[1,0,0,0,0,0,0,0,0,0]
    var verif=false;
    var v0=v.slice(1,v.length-1);
    if(verifi0(v0) & v[0]==1){
        verif=true;
    }
    return verif;

}*/
function MCDgr2(poliD, polid){ /// dividendo (polinomio de grado mayor), divisor (polinomio de grado menor)
    if(gradoMP(poliD)<gradoMP(polid)){
        var res=polid.slice();
        var Dp=polid.slice();
        var dp=poliD.slice();
    }else{
        var res=poliD.slice();
        var Dp=poliD.slice();
        var dp=polid.slice();
    }

    var mc=[];
    console.log("tama: "+res.length);
   // var cont=0;
    while(res.length>0){
        if(res.length==1){
            break;
        }
       // if(cont>9){
      //      break;
       // }
       // cont++;
        console.log("dividir");
        var t=divgr2(Dp,gradoMP(Dp),dp,gradoMP(dp));
        console.log(t);
        res=t[1].slice();
        Dp=dp.slice();
        dp=t[1].slice();
    }
    console.log("PASO EL BUCLE");
    if(res.length==0){
        mc=Dp.slice();
    }else if(res.length==1){
        mc=[1];
    }
    console.log("MCD:  ");
    console.log(mc);
    return mc;
}

function FgradosDist(p){  //factorizacion de grados distintos p= polinomio representado con coeficientes en un vector de izquierda a derecha [ 1,0,0,0,1,0,1]  
    var i=1;
    var S=[];
    var f=p.slice();
    while(gradoMP(f)>=2*i){        
        var e=Math.pow(2,i);
        var t=[1,e];
        var polt=Poly01(t);
        
        /*console.log("e: ");
        console.log(e);
        console.log("polt: ");
        console.log(polt);
        console.log("t: ");
        console.log(t);*/

        var g=MCDgr2(f,polt);
        console.log("g: ");
        console.log(gradoMP(f)+" : "+2*i);
        if(g.length>1){
            S.push(g);
            console.log("S: ");
            console.log(S);
            var fr=divgr2(f,gradoMP(f),g,gradoMP(g));
            f=fr[0]; /// sacamos el cociente [cociente,residuo]
        }
        console.log("*************************************");
        i++;
    }
    if(f.length!=1){
        S.push(f);
    }
    if(S.length==0){
        S.push(f);
    }
    return S;
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Formato => 5,2,6,8,2
function gradosP(a){ ///suma los grados de un polinomio
    var e=a.slice();
    var w=0;
    for(var i=0;i<e.length;i++){
        w=w+e[i]*i
    }
    return w;
}
function compVect(a,b){ /// verifica si los elementos del vector son iguales
    var resul=true;
    for(var i=0;i<a.length;i++ ){
        if(a[i]!=b[i]){
            resul=false;
        }
    }
    return resul;

}
function VerifiIncludeV(c,b){ /// para verificar si un vector esta en una matriz, c=matriz, b=vector 
    var resul=false;
    for(var i=0;i<c.length;i++ ){
        if(compVect(c[i],b)){
            resul=true;
            break;
        }
    }

    return resul;
}
function CiclicoVecMIN(v, N){ /// halla el codigo ciclico y el codigo; v=polinomio , N=longitud del codigo lineal
    var vecc=v.slice();
    var may=N;
    var grados=[]; /// para los grados de cada polinomio excluyendo el primer polinomio de 0's
    var vp= Array(may+1).fill(0); /// coeficientes del polinomio en un vector 

    for(var i=0;i<vecc.length;i++){
            vp[vecc[i]]=sumgr2(vp[vecc[i]],1);
    }
    var v0=Array(may+1).fill(0);
    var Ciclico1=[v0.slice(),vp.slice()]
    var g1=gradosP(vp);
    grados.push(g1);
    var vectRotar=vp.slice();
    for(var i=0;i<vp.length-1;i++){ // rotamos el vector quitando el ultimo y agregandolo al inicio
        var r=vectRotar;
        var e = r.pop();
        r.unshift(e);
        var t=gradosP(r);
        console.log(t);
            console.log(r);
            console.log("-----------------------------------------------------");

        if(!VerifiIncludeV(Ciclico1,r)){
            Ciclico1.push(r.slice()); 
        }
        grados.push(t);
               
    }
    
    var minv=grados[0];
    var posgrMenor=0;
    for(var q=1;q<grados.length;q++){
        if(grados[q]<minv & grados[q]!=0){
            minv=grados[q];
            posgrMenor=q;
        }
    }
    var t=Ciclico1[posgrMenor+1]; // polinomio de grado menor
    return [Ciclico1,t] 
}
function Solvpolinomios(){  //// para sacar el codigo ciclico 
    var mat1=(document.getElementById("inputPoly").value).split(",");
    var polmat=[];
    for(var i=0;i<mat1.length;i++){
        polmat.push(parseInt(mat1[i]));
    }
    var pfac3=Poly01(polmat);
    console.log("-----------------POLINOMIO FACTORIZADO-----------------");
    var factP=FgradosDist(pfac3);
    console.log(factP);
    var polvv=[];
    for(var i=0;i<factP.length;i++){
        polvv.push(converVPol(factP[i]));
    }
    console.log(polvv);

    var sre=document.getElementById("representacionPoly");
    var ar="<label>"+converVPol(pfac3)+"</label> </br>";

    sre.innerHTML=ar;


    var salida=document.getElementById("ResultadoFactPol");
    var contendS="";
    for(var i=0;i<polvv.length;i++){
        var a="<label>"+polvv[i]+"</label> </br>";
        contendS=contendS+a;
    }
    salida.innerHTML=contendS;

}
function SolvMCD(){
    var mat1=(document.getElementById("inputPmcd1").value).split(",");
    var pol1=[];
    for(var i=0;i<mat1.length;i++){
        pol1.push(parseInt(mat1[i]));
    }
    var mat2=(document.getElementById("inputPmcd2").value).split(",");
    var pol2=[];
    for(var i=0;i<mat1.length;i++){
        pol2.push(parseInt(mat2[i]));
    }
    var pq1=Poly01(pol1);
    var pq2=Poly01(pol2);
    var mcdsol=MCDgr2(pq1,pq2);
    var w=converVPol(mcdsol);
    var sre=document.getElementById("ResMCDFactPol");
    var ar="<label>"+w+"</label> </br>";
    sre.innerHTML=ar;

}






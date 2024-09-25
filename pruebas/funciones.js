function saludar(){
    console.log("Hola");
}
saludar();



function saludar2(nombre="anonimo"){
     console.log("Hola"+nombre);
     
}
saludar2("Juan");



function saludar3(nombre="anonimo"){
    var s="Hola"+nombre;
    return s;
}
console.log(saludar3("Aldo"));



var saludo=(nombre)=>{
    console.log("Hola"+nombre); 
}
saludo("Menganito");
 

var saludo2=(nombre)=>{
    console.log("Hola"+nombre); 
}
saludo2("Perenganito");


var saludo3=nombre=>{
    return "Hola"+nombre; 
}
console.log( saludo3("Tenganito"));



var saludo4=nombre=>"Hola"+nombre; 
console.log( saludo4("Pedro"));


var  saludo5=function(){
    console.log("hola");
    
}
saludo5();

var saludo6=()=>{
    console.log("Saludo6");
}
var saludo7=(nombre, s)=>{
    console.log("Hola"+nombre);
    s();
}

saludo7("Bethoven",saludo6);
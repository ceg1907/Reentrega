const Articulos = function (nombre, precio, stock){
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
}



let listaArticulos = [];



const body = document.querySelector ("body");
const box = document.querySelector(".box");
const boxHeader = document.querySelector(".box-header");






const Carrito = function (nombre, precio){
    this.nombre = nombre;
    this.precio = precio;
}
let CarritoArmado = [];

if(localStorage.getItem("articulos")){
    CarritoArmado = JSON.parse(localStorage.getItem("articulos"))
}else{
    CarritoArmado = CarritoArmado
}



function buscarProductos(){
    const input = document.getElementById ("buscador").value;
    let palabraIngresada = input.toUpperCase().trim();
    let resultadoBusqueda = listaArticulos.filter (   (revisa)=>revisa.nombre.toUpperCase().includes(palabraIngresada)   );
    
    if(resultadoBusqueda.length > 0){
        box.innerHTML = "";

        resultadoBusqueda.forEach ( (articulo) =>{
            
            const boxElement =document.createElement ("div");

            let nombre = document.createElement ("h2");
            nombre.textContent = articulo.nombre
            boxElement.appendChild(nombre)

            let precio = document.createElement ("p");
            precio.textContent = `Precio: $${articulo.precio}`
            boxElement.appendChild(precio)

            let btnCarrito = document.createElement ("button");
            btnCarrito.classList.add("btn-carrito")
            btnCarrito.textContent = "agregar"
            btnCarrito.addEventListener ("click", btnAgregar)
            articuloEnCarrito = new Carrito (nombre.textContent, precio.textContent);
            boxElement.appendChild (btnCarrito)
            box.appendChild(boxElement)
        });
        body.appendChild(box)
    }
    else{
        Swal.fire(`No se encontro el articulo ${palabraIngresada}`);
    }
}

function btnAgregar(){
    
    CarritoArmado.push (articuloEnCarrito)
    alert ("el articulo fue agregado")
    localStorage.setItem ("articulos", JSON.stringify(CarritoArmado))
}






function mostrarCarrito(){
    box.innerHTML = "";
    let container = document.createElement ("div")

    if (CarritoArmado.length > 0){
        

        boxC = document.createElement ("div")

        CarritoArmado.forEach( (x)=>{
            boxElementC = document.createElement ("div")
    
            let nombre = document.createElement ("h2");
            nombre.textContent = x.nombre
            boxElementC.appendChild(nombre)
    
            let precio = document.createElement ("p");
            precio.textContent = x.precio
            boxElementC.appendChild(precio)
    
            boxC.appendChild (boxElementC)
        })
    
        body.appendChild(boxC)
    }else{
        box.innerHTML = "";
        alerta = document.createElement ("p")
        alerta.textContent = "El carrito esta vacio"
        container.appendChild (alerta)
    }
    box.appendChild (container)
    body.appendChild(box)
}


const btnBuscar = document.getElementById("Btn-buscar");
btnBuscar.addEventListener ("click", ()=> {buscarProductos()});

const btnMostrar = document.getElementById ("Btn-mostrar");
btnMostrar.addEventListener ("click", ()=> {mostrarCarrito()} );
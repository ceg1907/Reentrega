
listaArticulos=[];
fetch("./articulos.json")
.then(response => response.json())
.then(data=> {
    listaArticulos=data
    MostrarStock(listaArticulos)
})


let cuerpo = document.querySelector ("body");
let boxStock = document.querySelector(".box");

if(localStorage.getItem("stock")){
    listaArticulos = JSON.parse(localStorage.getItem("stock"))
}else{
    listaArticulos = listaArticulos
}



function MostrarStock(){
    boxStock.innerHTML = "";
    listaArticulos.forEach ( (articulo) =>{
        
            
        const boxElement =document.createElement ("div");

        let nombre = document.createElement ("h2");
        nombre.textContent = articulo.nombre
        boxElement.appendChild(nombre)

        let cantidad = document.createElement ("p");
        cantidad.textContent = `Cantidad: ${articulo.stock}`
        boxElement.appendChild(cantidad)

        let precio = document.createElement ("p");
        precio.textContent = `Precio: $${articulo.precio}`
        boxElement.appendChild(precio)
        
        boxStock.appendChild(boxElement)
    });
    cuerpo.appendChild(boxStock)
}



    function buscarProductosStock(){
        const input = document.getElementById ("buscador").value;
        let palabraIngresada = input.toUpperCase().trim();
        let resultadoBusqueda = listaArticulos.filter (   (revisa)=>revisa.nombre.toUpperCase().includes(palabraIngresada)   );
        
        if(resultadoBusqueda.length > 0){
            boxStock.innerHTML = "";
    
            resultadoBusqueda.forEach ( (articulo) =>{
                
                const boxElement =document.createElement ("div");
    
                let nombre = document.createElement ("h2");
                nombre.textContent = articulo.nombre
                boxElement.appendChild(nombre);
        
                let cantidad = document.createElement ("p");
                cantidad.textContent = `Cantidad: ${articulo.stock}`
                boxElement.appendChild(cantidad);
        
                let precio = document.createElement ("p");
                precio.textContent = `Precio: $${articulo.precio}`
                boxElement.appendChild(precio);
                box.appendChild(boxElement);
            });
            body.appendChild(box)
        }
        else{
            Swal.fire(`No se encontro el articulo ${palabraIngresada}`);
            
        };
    };


    function AgregarProductosStock(){
        boxStock.innerHTML= "";
        const formulario = document.createElement("form")
        formulario.classList.add("form-stock")
        formulario.innerHTML=`
        <label for="Nombre">
            Nombre del Producto:
            <input type="text" id="Nombre">
        </label>

        <label for="Precio">
            Precio: $
            <input type="number" id="Precio">
        </label>

        <label for="Cantidad">
            Cantidad:
            <input type="number" id="Cantidad">
        </label>

        <button type="submit">Agregar</button>
    `
        formulario.addEventListener("submit", (e)=>{
            e.preventDefault();

            const nombreArticulo = document.querySelector("#Nombre").value.trim();
            const cantidadArticulo = parseFloat(document.querySelector("#Cantidad").value);
            const precioArticulo = parseFloat(document.querySelector("#Precio").value);
            
            let articuloNuevo = new Articulos (nombreArticulo, precioArticulo, cantidadArticulo)

            if (nombreArticulo === ""|| isNaN(cantidadArticulo) || isNaN(precioArticulo)  ){
                Swal.fire("Ingrese datos validos");
                return
                
            };

            if (listaArticulos.some((articulo) => articulo.nombre === articuloNuevo.nombre) ){
                Swal.fire("El  articulo ya existe");
                return
            }

            listaArticulos.push(articuloNuevo);

            Swal.fire(`Se agrego el producto`);
            localStorage.setItem("stock", JSON.stringify(listaArticulos));


            MostrarStock()

            formulario.reset
        });
        boxStock.appendChild(formulario)
        cuerpo.appendChild(boxStock)
    }


const btnBuscarStock = document.getElementById("Btn-buscar-stock");
btnBuscarStock.addEventListener ("click", buscarProductosStock);

const btnAgregarStock = document.getElementById("Btn-agregar-articulo");
btnAgregarStock.addEventListener ("click", AgregarProductosStock);






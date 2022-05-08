const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener(){//cargar eventos a escuchar
    listaCursos.addEventListener('click', cargarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarritoBtn.addEventListener('click',() => {
        articulosCarrito = [];
        limpiarHTML();
    })
};

//Funciones:
function cargarCurso(e){
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }    
};
function eliminarCurso(e){
    if (e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito=articulosCarrito.filter(curso => curso.id !== cursoId)
        cargarHTML()
        console.log(articulosCarrito);
    }


    
    /*if (e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso=> curso.id !== cursoId);
        cargarHTML();
    }
    //console.log(e.target.classList);*/
};

function leerDatosCurso(curso){//se crea un objeto con la informacion del curso
    infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };
    const existe = articulosCarrito.some((curso)=>curso.id === infoCurso.id); //arroja true si cumple con la condicion 
    if (existe){
        const cursos = articulosCarrito.map(curso=>{
            if (curso.id === infoCurso.id){
                curso.cantidad ++;
                return curso;
            }
            else{
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    }
    else{
        articulosCarrito = [...articulosCarrito, infoCurso];//se crea un arreglo con los objetos que se van creando
    }
    
    cargarHTML();
    console.log(articulosCarrito);
};

function cargarHTML(){
    limpiarHTML();
    articulosCarrito.forEach((curso)=>{
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${curso.imagen}" width = "100"></td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${curso.id}"> x </a></td>
        `;
        contenedorCarrito.appendChild(row);//muestra el contenido del carrito en el HTML
    });
};
function limpiarHTML(){
    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
};
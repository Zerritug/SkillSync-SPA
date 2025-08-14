const API_URL = 'http://localhost:3000/api/lessons/category';

document.addEventListener('DOMContentLoaded', () => {
 cargarContenido();
})

async function cargarContenido() {
    try {
        const res = await fetch(API_URL);
        const contenido = await res.json();

        const tbody = document.getElementById('categoryList');
        tbody.innerHTML = '';

        contenido.forEach( c => {
            console.log(c);
            const fila = document.createElement('tr');
            fila.innerHTML=
                `<td>${c.Id}</td>
                 <td>${c.Tittle}</td>
                 <td>${c.Description}</td>
                 <td>${c.Date}</td>
                 <td>
                     <button class="btn btn-primary" onclick="editarCategoria(${c.Id})">Editar</button>
                     <button class="btn btn-danger" onclick="eliminarCategoria(${c.Id})">Eliminar</button>
                 </td>`;
                 tbody.appendChild(fila);
        })  

    } catch (error) {
        console.error("Error al cargar las categorias", error)
    }

}



async function eliminarCategoria(id) {
    
    try {
        const res = await fetch(`http://localhost:3000/api/lessons/category/${id}`, {
            method: 'DELETE'
        });
        if (res.ok) {
            alert("Categoría eliminada correctamente");
            cargarContenido();
        } else {
            alert("Error al eliminar la categoría");
        }
    } catch (error) {
        console.error("Error al eliminar la categoría", error);
    }
}

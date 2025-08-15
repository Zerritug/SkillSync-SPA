const API_URL = 'http://localhost:3000/api/skill/category';
const API_LESSON = 'http://localhost:3000/api/skill/lessons';

document.addEventListener('DOMContentLoaded', () => {
    router();
});

function Category() {
    cargarContenido();
}

function Lesson() {
    cargarlecciones();
}

async function cargarlecciones() {
    try {
        const res = await fetch(API_LESSON);
        const contenido = await res.json();

        const createtablelesson = document.getElementById('CreateContent');
        createtablelesson.innerHTML = `
            <table class="lesson-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Contenido</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="lessonList"></tbody>
            </table>
        `;

        const createL = document.getElementById('Create');
        createL.innerHTML = `
            <div class="create">
                <label for="Tittle">Título</label>
                <input type="text" id="TittleInput" required placeholder="Ingresa el título">
                <label for="Content">Contenido</label>
                <input type="text" id="ContentInput" required placeholder="Ingresa el contenido">
                <label for="Date">Fecha</label>
                <input type="date" id="DateInput" required>
                <button id="CreateLessonBtn">Crear</button>
            </div>
        `;

        document.getElementById('CreateLessonBtn').addEventListener('click', crearLesson);

        const tbody = document.getElementById('lessonList');
        tbody.innerHTML = '';
        contenido.forEach(l => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${l.Id}</td>
                <td>${l.Tittle}</td>
                <td>${l.Content}</td>
                <td>${l.Date}</td>
                <td>
                    <button class="btn btn-primary" onclick="editarLesson(${l.Id})">Editar</button>
                    <button class="btn btn-danger" onclick="eliminarLesson(${l.Id})">Eliminar</button>
                </td>`;
            tbody.appendChild(fila);
        });

    } catch (error) {
        console.error("Error al cargar las lecciones", error);
    }
}

async function crearLesson(e) {
    e.preventDefault();
    const Tittle = document.getElementById('TittleInput').value;
    const Content = document.getElementById('ContentInput').value;
    const Date = document.getElementById('DateInput').value;

    if (!Tittle || !Content || !Date) {
        return alert("Todos los campos son obligatorios");
    }

    try {
        const res = await fetch(API_LESSON, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Tittle, Content, Date })
        });
        if (res.ok) {
            alert("Lección creada correctamente");
            limpiarFormulario();
            cargarlecciones();
        } else {
            alert("Error al crear la lección");
        }
    } catch (error) {
        console.error("Error al crear la lección", error);
    }
}

async function eliminarLesson(id) {
    if (!confirm("¿Deseas eliminar la lección?")) return;

    try {
        const res = await fetch(`${API_LESSON}/${id}`, {
            method: 'DELETE'
        });
        if (res.ok) {
            alert("Lección eliminada");
            cargarlecciones();
        } else {
            alert("Error al eliminar la lección");
        }

    } catch (error) {
        console.error("Error eliminando la lección", error);
    }
}

async function editarLesson(id) {
    const newTittle = prompt("Escribe el nuevo título:");
    const newContent = prompt("Escribe el nuevo contenido:");
    const newDate = prompt("Ingresa la nueva fecha (YYYY-MM-DD):");

    if (!newTittle || !newContent || !newDate) {
        alert("Todos los campos son obligatorios");
        return;
    }

    try {
        const res = await fetch(`${API_LESSON}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Tittle: newTittle, Content: newContent, Date: newDate })
        });

        if (res.ok) {
            alert("Lección editada correctamente");
            cargarlecciones();
        } else {
            alert("Error al actualizar la lección");
        }
    } catch (error) {
        console.error("Error al actualizar la lección", error);
    }
}

async function cargarContenido() {
    try {
        const res = await fetch(API_URL);
        const contenido = await res.json();

        const createtable = document.getElementById('CreateContent');
        createtable.innerHTML = `
            <table class="category-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="categoryList"></tbody>
            </table>
        `;

        const create = document.getElementById('Create');
        create.innerHTML = `
            <div class="create">
                <label for="Tittle">Título</label>
                <input type="text" id="TittleInput" required placeholder="Ingresa el título">
                <label for="Description">Descripción</label>
                <input type="text" id="DescriptionInput" required placeholder="Ingresa la descripción">
                <label for="Date">Fecha</label>
                <input type="date" id="DateInput" required>
                <button id="createCategoryBtn">Crear</button>
            </div>
        `;

        document.getElementById('createCategoryBtn').addEventListener('click', crearCategoria);

        const tbody = document.getElementById('categoryList');
        tbody.innerHTML = '';

        contenido.forEach(c => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${c.Id}</td>
                <td>${c.Tittle}</td>
                <td>${c.Description}</td>
                <td>${c.Date}</td>
                <td>
                    <button class="btn btn-primary" onclick="editarCategoria(${c.Id})">Editar</button>
                    <button class="btn btn-danger" onclick="eliminarCategoria(${c.Id})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(fila);
        });

    } catch (error) {
        console.error("Error al cargar las categorías", error);
    }
}

async function crearCategoria(e) {
    e.preventDefault();

    const Tittle = document.getElementById('TittleInput').value;
    const Description = document.getElementById('DescriptionInput').value;
    const Date = document.getElementById('DateInput').value;

    if (!Tittle || !Description || !Date) {
        return alert("Todos los campos son obligatorios");
    }

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Tittle, Description, Date })
        });

        if (res.ok) {
            alert("Categoría creada correctamente");
            limpiarFormulario();
            cargarContenido();
        } else {
            alert("Error al crear la categoría");
        }
    } catch (error) {
        console.error("Error al crear la categoría", error);
    }
}

async function eliminarCategoria(id) {
    if (!confirm("¿Deseas eliminar esta categoría?")) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, {
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

async function editarCategoria(id) {
    const newTittle = prompt("Ingrese el nuevo título:");
    const newDescription = prompt("Ingrese la nueva descripción:");
    const newDate = prompt("Ingrese la nueva fecha (YYYY-MM-DD):");

    if (!newTittle || !newDescription || !newDate) {
        return alert("Todos los campos son obligatorios");
    }

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Tittle: newTittle, Description: newDescription, Date: newDate })
        });

        if (res.ok) {
            alert("Categoría actualizada correctamente");
            cargarContenido();
        } else {
            alert("Error al actualizar la categoría");
        }
    } catch (error) {
        console.error("Error al editar la categoría", error);
    }
}

function limpiarFormulario() {
    const tittleInput = document.getElementById('TittleInput');
    const descriptionInput = document.getElementById('DescriptionInput');
    const dateInput = document.getElementById('DateInput');

    if (tittleInput) tittleInput.value = '';
    if (descriptionInput) descriptionInput.value = '';
    if (dateInput) dateInput.value = '';
}

async function render(route) {
    const routes = {
        category: Category,
        lesson: Lesson
    };
    if (routes[route]) {
        routes[route]();
    }
}

async function router() {
    const route = location.hash.slice(1) || 'category';
    await render(route);
}

window.addEventListener('hashchange', router);

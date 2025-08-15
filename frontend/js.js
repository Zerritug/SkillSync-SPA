async function cargarContenido() {
    try {
        const res = await fetch(API_URL);
        const contenido = await res.json();

        const createtable = document.getElementById('CreateContent');
        createtable.innerHTML = `
        <table class="lisson-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="lessonlist"></tbody>
        </table>
        `;

        const create = document.getElementById('Create');
        create.innerHTML = `
            <div class="create">
                <label for="Tittle">Título</label>
                <input type="text" id="TittleInput" required placeholder="Ingresa el título">
                <label for="Content">Descripción</label>
                <input type="text" id="ContentInput" required placeholder="Ingresa el contenido">
                <label for="Date">Fecha</label>
                <input type="date" id="DateInput" required>
                <button id="CreateLessonBtn">Crear</button>
            </div>
        `;

        document.getElementById('CreateLessonBtn').addEventListener('click', CrearLesson);

        const tbody = document.getElementById('lessonlist');
        tbody.innerHTML = '';

        contenido.forEach(l => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${l.Id}</td>
                <td>${l.Tittle}</td>
                <td>${l.Description}</td>
                <td>${l.Date}</td>
                <td>
                    <button class="btn btn-primary" onclick="editarLesson(${l.Id})">Editar</button>
                    <button class="btn btn-danger" onclick="eliminarLesson(${l.Id})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(fila);
        });

    } catch (error) {
        console.error("Error al cargar las categorías", error);
    }
}
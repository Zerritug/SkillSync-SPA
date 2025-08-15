const express = require('express');
const router = express.Router();
const db = require('../DataBaseSkill');


//Methods 
//get
router.get('/category', async (req, res) => {
    try {
        const [rows] = await db.query ("SELECT * FROM category")
        res.json(rows)
    } catch (err){
        console.error("Error al obtener categorias ", err)
        res.status(500).json("Eror")
    }
})

//Get by id

router.get('/category/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "Falta el id" });
    }

    try {
        const [rows] = await db.query ("SELECT * FROM category where id = ?", [id]);
        res.json(rows[0]);
    }catch (err) {
        console.error("Error al obtener categoria por id", err);
        res.status(500).json({ error: "Error al obtener categoria por id" });
}})

//post

router.post('/category', async (req, res) => {
    const { Tittle, Description } = req.body;
    if (!Tittle || !Description) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    const currentDate = new Date().toISOString().slice(0, 10);


    try {
        const sql = "INSERT INTO category (Tittle, Description, Date) VALUES (?, ?, ?)";
        const [result] = await db.query(sql, [Tittle, Description, currentDate]);

        res.status(201).json({ id: result.insertId, Tittle, Description, currentDate });
    } catch (err) {
        console.error("Error al crear categoria", err);
        res.status(500).json({ error: "Error al crear categoria" });
    }
});


//put

router.put('/category/:id', async (req, res) => {
    const { id } = req.params;
    const { Tittle, Description } = req.body;

    if (!id || !Tittle || !Description) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    const currentDate = new Date().toISOString().slice(0, 10);

    try {
        const sql = "UPDATE category SET Tittle = ?, Description = ?, Date = ? WHERE id = ?";
        await db.query(sql, [Tittle, Description, currentDate, id]);

        res.status(200).json({ message: "Categoría actualizada correctamente" });
    } catch (err) {
        console.error("Error al actualizar categoría", err);
        res.status(500).json({ error: "Error al actualizar categoría" });
    }
});


//delete

router.delete('/category/:id', async (req, res) => {
    const { id } = req.params;
    console.log("ID recibido para eliminar:", id);
    console.log("ID recibido para eliminar:", id);
    if (!id) {
        return res.status(400).json({ error: "Falta el id" });
    }

    
    try {
        const sql = "DELETE FROM category WHERE id = ?";
        await db.query(sql, [id]);
       
     

        console.log("Categoría eliminada correctamente");
        res.status(200).json({ message: "Categoría eliminada correctamente" });

    } catch (err) {
        console.error("Error al eliminar categoría", err);
        res.status(500).json({ error: "Error al eliminar categoría" });
    }
});

module.exports = router;
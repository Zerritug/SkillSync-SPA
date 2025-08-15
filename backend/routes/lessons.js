const express = require('express');
const router = express.Router();
const db = require('../DataBaseSkill');


//Methods 
//category
//get 
router.get('/lessons', async (req, res) => {
    try {
        const [rows] = await db.query ("SELECT * FROM lesson")
        res.json(rows)
    } catch (err){
        console.error("Error al obtener las lecciones ", err)
        res.status(500).json("Eror")
    }
})

//Get by id

router.get('/lessons/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "Falta el id" });
    }

    try {
        const [rows] = await db.query ("SELECT * FROM lesson where id = ?", [id]);
        res.json(rows[0]);
    }catch (err) {
        console.error("Error al obtener la leccion por id", err);
        res.status(500).json({ error: "Error al obtener leccion por id" });
}})

//post

router.post('/lessons', async (req, res) => {
    const { Tittle, Content } = req.body;
    if (!Tittle || !Content) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    const currentDate = new Date().toISOString().slice(0, 10);


    try {
        const sql = "INSERT INTO lesson (Tittle, Content, Date) VALUES (?, ?, ?)";
        const [result] = await db.query(sql, [Tittle, Content, currentDate]);

        res.status(201).json({ id: result.insertId, Tittle, Content, currentDate });
    } catch (err) {
        console.error("Error al crear la leccion", err);
        res.status(500).json({ error: "Error al crear la leccion" });
    }
});


//put

router.put('/lessons/:id', async (req, res) => {
    const { id } = req.params;
    const { Tittle, Content } = req.body;

    if (!id || !Tittle || !Content) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    const currentDate = new Date().toISOString().slice(0, 10);

    try {
        const sql = "UPDATE lesson SET Tittle = ?, Content = ?, Date = ? WHERE id = ?";
        await db.query(sql, [Tittle, Content, currentDate, id]);

        res.status(200).json({ message: "Leccion actualizada correctamente" });
    } catch (err) {
        console.error("Error al actualizar la leccion", err);
        res.status(500).json({ error: "Error al actualizar la leccion" });
    }
});


//delete

router.delete('/lessons/:id', async (req, res) => {
    const { id } = req.params;
    console.log("ID recibido para eliminar:", id);
    console.log("ID recibido para eliminar:", id);
    if (!id) {
        return res.status(400).json({ error: "Falta el id" });
    }

    
    try {
        const sql = "DELETE FROM lesson WHERE id = ?";
        await db.query(sql, [id]);
       
     

        console.log("Leccion eliminada correctamente");
        res.status(200).json({ message: "Leccion eliminada correctamente" });

    } catch (err) {
        console.error("Error al eliminar la leccion", err);
        res.status(500).json({ error: "Error al eliminar la leccion" });
    }
});




module.exports = router;
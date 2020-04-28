const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');

exports.crearTarea = async (req, res) => {
    // revisar si hay errores
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({ errores : errores.array() })
    }

    try {
        // Extraer el proyecto y comprobar si existe
        const {proyecto} = req.body;

        const existeProyecto = await Proyecto.findById(proyecto);

        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        // Revisar si el proyecto actual es del usuario que esta logeado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }

        // Creamos la tarea
        const tarea= new Tarea(req.body);
        await tarea.save();
        res.json(tarea);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Obtener tareas
exports.obtenerTareas = async (req, res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const {proyecto} = req.query;

        const existeProyecto = await Proyecto.findById(proyecto);

        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        // Revisar si el proyecto actual es del usuario que esta logeado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }

        // Obtener las tareas por proyecto ID
        const tareas = await Tarea.find({ proyecto });
        res.json({tareas});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Actualizar tarea
exports.actualizarTarea = async (req, res) => {

    try {
        // Extraer el proyecto y comprobar si existe
        const {proyecto, nombre, estado} = req.body;

        // Si la tarea existe o no
        let existeTarea = await Tarea.findById(req.params.id);

        if(!existeTarea){
            return res.status(404).json({msg: 'Tarea no encontrada'});
        }

        // extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecto actual es del usuario que esta logeado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }

        // Crear objeto con nueva información
        const nuevaTarea = {};

        //if(nombre){
            nuevaTarea.nombre = nombre;
        //}

        //if(estado){
            nuevaTarea.estado = estado;
        //}

        // Guardar la tarea
        existeTarea = await Tarea.findOneAndUpdate({ _id: req.params.id}, nuevaTarea, {new: true});
        res.json(existeTarea);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Eliminar tarea
exports.eliminarTarea = async (req, res) => {

    try {
        // Extraer el proyecto y comprobar si existe
        const {proyecto} = req.query;

        // Si la tarea existe o no
        let existeTarea = await Tarea.findById(req.params.id);

        if(!existeTarea){
            return res.status(404).json({msg: 'Tarea no encontrada'});
        }

        // extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecto actual es del usuario que esta logeado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }

        // Eliminar
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Tarea eliminada'});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
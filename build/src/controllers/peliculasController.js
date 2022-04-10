"use strict";
// import { Request, Response} from 'express';
// import pool from '../database/database'
// //Todo Tipos de status a usar
//     //? 200 OK 201 Se ha creado
//     //? 404 No se encontro
//     //? 500 Error del servidor
// class PeliculasController{
//     public async list(req:Request,res:Response){
//         var peliculas = await pool.query('SELECT * FROM peliculas')
//         res.status(200).json(peliculas);
//     }
//     public async getById(req:Request,res:Response){
//         const { id } = req.params;
//         const pelicula = await pool.query('SELECT * FROM peliculas WHERE id = ?',[id])
//         if(pelicula.length > 0){
//             res.status(200).json(pelicula[0])
//         }else{
//             res.status(404).json({message:"La pelicula no existe"})
//         }
//     }
//     public async create(req:Request,res:Response): Promise<void>{
//         console.log(req.body)
//         try{
//             await pool.query('INSERT INTO peliculas set ?',[req.body])
//             res.status(200).json('creando una peli');
//         }catch(error){
//             res.status(500).json('Error al añadir la pelicula');
//         }
//     } 
//     public async delete(req:Request,res:Response){
//         const {id} = req.params;
//         const borrada = await pool.query('DELETE FROM peliculas WHERE id= ?',[id])
//         res.status(200).json('El juego se ha eliminado')
//     }
//     public async update(req:Request,res:Response){
//         const {id} = req.params;
//         await pool.query('UPDATE peliculas set ? WHERE id = ?',[req.body,id])
//         res.status(200).json({ text:"Actualizando la pelim"+ id})
//     }
// }
// export const peliculasController = new PeliculasController();

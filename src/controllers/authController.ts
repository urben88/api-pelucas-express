// import { Request, Response} from 'express';

// import pool from '../database/database'
// //Todo Tipos de status a usar
//     //? 200 OK 201 Se ha creado
//     //? 404 No se encontro
//     //? 500 Error del servidor
// class AuthController{

//     public async create(req:Request,res:Response): Promise<void>{
//         try{
//             await pool.query('INSERT INTO peliculas set ?',[req.body])
//             res.status(200).json({
//                 ok:true,
//                 message:"El usuario se sha creado correctamente"
//             });
//         }catch(error){
//             res.status(500).json('Error al crear el usuario');
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
// export const authController = new AuthController();
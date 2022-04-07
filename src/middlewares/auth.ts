export default (req:any,res:any,next:any):any =>{
    console.log(req.headers)
    next();
}
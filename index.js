const express=require('express'); //importamos la libreria

const app=express() //instanciando una aplicacion tipo express

//req: request
//res: response

//ruta
app.get("/",(req, res)=>{
    res.send("backend con express")
});

const port=3000;

//ruta usuarios
//esto quedara en BBDD
let usuarios=[
    {id:1, nombre:"karol", email:"karol@gmail.com"},
    {id:2, nombre:"isabella", email:"isabella@gmail.com"},
    {id:3, nombre:"stephanie", email:"stephanie@gmail.com"},
]

//ruta para obtener listado de usuarios
app.get("/usuarios",(req,res)=>{
    res.json(usuarios)
});

//obtener usuarios por id
app.get("/usuarios/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    //console.log(typeof(id))
    const usuario=usuarios.find(user=>user.id===id)
    res.json(usuario)
})






app.listen(port,()=>{
    console.log(`servidor ejecutando en el puerto ${port}`)
})
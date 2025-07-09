const express=require('express'); //importamos la libreria

const app=express() //instanciando una aplicacion tipo express

//esto permite leer un JSON que llegue por body
app.use(express.json())
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
app.get("/usuarios/todos",(req,res)=>{
    res.json(usuarios)
});

//obtener usuarios por id
app.get("/usuarios/buscar/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    //console.log(typeof(id))
    const usuario=usuarios.find(user=>user.id===id)
    //console.log(usuario)
    if(!usuarios){
        res.usuario(404).json({
            mensaje:"usuario no encontrado"
        })
    }
    res.json(usuario)
})

//crear un nuevo usuario CREATE
app.post("/usuarios/crear",(req,res)=>{
    const {nombre, email}=req.body;
    //console.log(nombre, email)
    const nuevoUsuario={
        id:usuarios.length+1,
        nombre:nombre,
        email:email
    }
    //guardar el objeto creado en la BBDD
    usuarios.push(nuevoUsuario)
    res.status(201).json({
        mensaje:"usuario creado correctamente",
        usuarioCreado:nuevoUsuario
    })
})

//actualizar el objeto creado en la BBDD
app.put("/usuarios/actualizar/:id",(req,res)=>{
    const {nombre, email}=req.body;
    const id=parseInt(req.params.id);
    //buscar
    const usuario=usuarios.find(u=>u.id===id)
    if(!usuario, email){
        res.status(404).json({
            mensaje:"usuario a modificar no encontrado"
        })
    }
    const infoAnterior=usuario.nombre; //guardar los datos encontrados
    usuario.nombre=nombre; //modificar el campo nombre
    res.status(202).json({
        mensaje:"usuario modificado correctamente",
        infoAnterior:infoAnterior,
        infoNueva:usuario

    })
    usuario.email=email; //modificar el campo email
    res.status(202).json({
        mensaje:"usuario modificado correctamente",
    })
})

//eliminar usuarios
app.delete("/usuarios/eliminar/:id", (req,res)=>{
//capturar el id pasado por parametros
const id=parseInt(req.params.id);
//encontrar el indice correspondiente al id entregado
const index=usuarios.findIndex(user=>user.id===id)
//eliminar de la lista la info del indice encontrado
//console.log(index)
if(index===-1){
    res.status(404).json({
        mensaje: `usuario con id ${id} no encontrado`
    })
}else{
    usuarios.splice(index)
    res.status(200).json({
    mensaje: `usuario con id ${id} eliminado correctamente`
})}
})



app.listen(port,()=>{
    console.log(`servidor ejecutando en el puerto ${port}`)
})
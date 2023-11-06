const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/kidzworld',{
    useNewUrlParser : true,
    useUnifiedTopology : true
    //serverSelectionTimeoutMS : 20000
})

//model 1
const UsuarioSchema = new mongoose.Schema({
    email : {type : String, require : true},
    senha : {type : String}
}) 

const Usuario = mongoose.model("Usuario", UsuarioSchema);

app.post("/cadastrousuario", async(req, res)=>{
    const email = req.body.email;
    const senha = req.body.senha;

    if (email == null || senha == null){
        return res.status(400).json({error : "Preencher todos os campos"});
        }

    const emailExiste = await Usuario.findOne({email : email});

    if(emailExiste){
        return res.status(400).json({error : "O email cadastrado já existe!"})
    }

    const Usuario = new Usuario({
        email : email,
        senha : senha,
    })

    try{
        const newUsuario = await Usuario.save();
        res.json({error : null, msg : "Cadastro ok", pessoaId : newPessoa._id});
    } 
    catch(error){
        res.status(400).json((error))
    }
})

//model 2
const produtokidzSchema = new mongoose.Schema({
    id_produtokidz : {type : String},
    descricao : {type : String},
    marca : {type : String},
    validade : {type : Date},
    quantidade : {type : Number}
}) 

const produtokidz = mongoose.model("produtokidz", produtokidzSchema);

app.post("/produtokidz", async(req, res)=>{
    const id_produtokidz = req.body.id_produtokidz;
    const descricao = req.body.descricao;
    const marca = req.body.marca;
    const validade = req.body.validade;
    const quantidade = req.body.quantidade;

    if (email == null || senha == null){
        return res.status(400).json({error : "Preencher todos os campos"});
        }

    const emailExiste = await Usuario.findOne({email : email});

    if(emailExiste){
        return res.status(400).json({error : "O email cadastrado já existe!"})
    }

    const produtokidz = new produtokidz({
        id_produtokidz : id_produtokidz,
        descricao : descricao,
        marca : marca,
        validade : validade,
        quantidade : quantidade
    })

    try{
        const newprodutokidz = await produtokidz.save();
        res.json({error : null, msg : "Cadastro ok", pessoaId : newPessoa._id});
    } 
    catch(error){
        res.status(400).json((error))
    }
})

app.get("/cadastrousuario", async (req,res)=>{
    res.sendFile(__dirname + "/cadastrousuario.html")
})

app.get("/", async (req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
});


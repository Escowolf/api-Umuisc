const express = require("express");
const cors = require("cors");
const server = express();
const mongoClient = require('mongodb').MongoClient;

const MONGO_HOST = "mongodb+srv://admin:PPtkOKzu7YmpUvMb@cluster0.ucyz0.mongodb.net/?retryWrites=true&w=majority";
const MONGO_DB = 'Umusic';
server.use(express.json());
server.use(cors());

server.listen(4000);

//READ PLAYLISTS - TRAZ TODAS AS PLAYLISTS
//listar playlists
server.get("/playlists", (req, res) => {
  mongoClient.connect(MONGO_HOST, (err, client) => {
    if (err) throw err
    const database = client.db(MONGO_DB);
    database.collection('playlists').find({}).toArray((err, result) => {
      if (err) throw err
      res.json(result);
    });
  });
});
/*
//buscar playlist por ID
server.get("/playlists/:id", (req, res) => {
  const { id } = req.params;

  const playlist = playlists.find((p) => p.id == id); //confirma usuário por e-mail
  return res.json(playlist);
});


//Editar playlist - INCOMPLETO
server.put("/playlists/:id", (req, res) => {
  const { id } = req.params; // recupera o index com os dados
  const musica = req.body;

  const playlist = playlists.find((p) => p.id == id);
  //const songs = playlist.musicas.filter();
  //FALTA CRIAR O FIND DE MÚSICAS

  playlist.musicas = musica; //playlist precisa receber música

  return res.json(playlists);
});

//cadastrar playlist
server.post("/playlists", (req, res) => {
  const play = req.body; // assim esperamos buscar o name informado dentro do body da requisição
  playlists.push(play);
  return res.json(play); // retorna a informação da variável geeks
});

//deletar playlist
server.delete("/playlists/:id", (req, res) => {
  const { id } = req.params; // recupera o index com os dados

  playlists.splice(id, 1); // percorre o vetor até o index selecionado e deleta uma posição no array

  return res.send();
}); // retorna os dados após exclusão
*/

// usuarios representa a collection onde o novo registro será inserido
// insertOne é uma operação própria do MongoDB para inserir apenas 1 registro
// mongo_host é o servidor onde nosso banco está armazenado
//cadastrar usuário
server.post("/usuarios", (req, res) => {
  mongoClient.connect(MONGO_HOST, (err, client) => {
    if (err) throw err
    const database = client.db(MONGO_DB);
    database.collection('usuarios').insertOne(req.body, (err, result) => {
      if (err) throw err
      res.status(201).json(result);
    });
  });
});


/*
//login (buscarUsuario)
server.get("/usuarios", (req, res) => {
  const { email } = req.query;

  const usuario = usuarios.find((u) => u.email == email); //confirma usuário por e-mail
  return res.json(usuario);
});

//Editar Usuario
server.patch("/usuarios/:id", (req, res) => {
  const { id } = req.params; // recupera o index com os dados
  const { nome } = req.body; //atualiza apenas o nome do usário de id correspondente

  const usuario = usuarios.find((u) => u.id == id); //busca se há usuário com esse id

  usuario.nome = nome; // sobrepõe o index obtido na rota de acordo com o novo valor

  return res.json(usuarios);
}); // retorna novamente os geeks atualizados após o update

//Buscar música por nome
server.get("/musicas", (req, res) => {
  const { nome } = req.query;
  const musicaEncontrada = musicas.find((m) => m.nome == nome);
  return res.json(musicaEncontrada);
});

//retornar todas as músicas
server.get("/musicas", (req, res) => {
  return res.json(musicas);
});*/

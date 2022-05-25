const express = require("express");
const server = express();

server.use(express.json());

const playlists = [
  {
    id: 1,
    nome: "Play1",
    capa: "",
    musicas: [
      {
        id: 3,
        nome: "Teste3",
        cantor: "HoliznaCC0",
        arquivo: "/music/HoliznaCC0-HowCanThingsBe.mp3"
      },
      {
        id: 4,
        nome: "Teste Folk",
        cantor: "Scott Holmes Music",
        arquivo: "/music/HoliznaCC0 - Lost In The City.mp3"
      }
    ]
  },
  {
    id: 2,
    nome: "Play2",
    capa: "",
    musicas: [
      {
        id: 1,
        nome: "Teste",
        cantor: "HoliznaCC0",
        arquivo: "/music/HoliznaCC0-HowCanThingsBe.mp3"
      },
      {
        id: 2,
        nome: "Sensual Folk",
        cantor: "Scott Holmes Music",
        arquivo: "/music/HoliznaCC0 - Lost In The City.mp3"
      }
    ]
  }
];

const usuarios = [
  {
    nome: "ezequielss",
    senha: 123456,
    email: "es@g.com",
    data: "2022-05-04",
    id: 1
  },
  {
    nome: "Ezequiel Sousa",
    senha: "123456",
    email: "teste@g.com",
    data: "1995-04-17",
    id: 2
  }
];

const musicas = [
  {
    id: 1,
    nome: "Teste",
    cantor: "HoliznaCC0",
    arquivo: "/music/HoliznaCC0-HowCanThingsBe.mp3"
  },
  {
    id: 2,
    nome: "Sensual Folk",
    cantor: "Scott Holmes Music",
    arquivo: "/music/HoliznaCC0 - Lost In The City.mp3"
  }
];

server.get("/", (req, res) => {
  res.write("O servidor Umusic esta rodando!");
});

server.listen(4000);

//listar playlists
server.get("/playlists", (req, res) => {
  return res.json(playlists);
});

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

//cadastrar usuário
server.post("/usuarios", (req, res) => {
  const user = req.body;
  usuarios.push(user);
  return res.json(user); // retorna a informação da variável geeks
});

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
});

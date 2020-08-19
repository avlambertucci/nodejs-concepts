const express = require("express");
const cors = require("cors");
const {uuid, isUuid} = require('uuidv4')

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(repository);

  

  return response.json(repository)

});

app.put("/repositories/:id", (request, response) => {
  
  const {id} = request.params;
  const {url, title, techs} = request.body

  
  // if(!isUuid(id)){
  //   return response.status(400).json({error: 'Error invalid ID'})
  // }
  
  const projectSelected = repositories.findIndex(item=> item.id==id )
  
  if(projectSelected<0){
    return response.status(400).json({error: 'Wrong ID'})
  }
  const likes = repositories[projectSelected].likes
  
  const repository = {
    id,
    url,
    title,
    techs,
    likes
    
  }
  repositories[projectSelected] = repository
  return response.json(repository)


});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params

  const repositoryToDelete = repositories.findIndex(repository=> repository.id == id)
  console.log(repositoryToDelete)
  if(repositoryToDelete < 0 ){
    return response.status(400).json({error: 'Wrong ID'})  
  } else {
    
    repositories.splice(repositoryToDelete, 1)
    return response.status(204).send()
  }
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params
  
  const repository = repositories.find(repository=>repository.id==id);
  
  if(!isUuid(id)){
    return response.status(400).json({error: 'Id is not valid!'})
  }
  repository.likes += 1
  console.log(repository)
  

  
  return response.json(repository)
});

module.exports = app;

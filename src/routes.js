import { Router } from 'express'
import app from './app'

const routes = new Router();

let projects = [{ id: 1, title: "project 01", tasks: ['1', '2'] }]

let requestCount = 0

routes.use((req, res, next) => {
  console.log(`requests count ${requestCount++}`)
  return next()
})

function checkIfUserExist(req, res, next) {
  const { id } = req.params
  let project = projects.find(item => item.id == id)
  if (project) {
    return next()
  } else {
    return res.json({ message: "User does not exist" })
  }
}


routes.post('/projects', (req, res) => {
  const { id, title, tasks } = req.body
  projects.push({
    id,
    title,
    tasks
  })

  return res.json({
    message: 'Hello rocketseat',
    projects
  })
})

routes.get('/projects', (req, res) => {
  return res.json({ projects })
})

routes.put('/projects/:id', checkIfUserExist, (req, res) => {
  const { id } = req.params
  const { title } = req.body

  let project = projects.find(item => item.id == id)

  project.title = title

  return res.json({ projects })

})


routes.delete('/projects/:id', checkIfUserExist, (req, res) => {
  const { id } = req.params
  projects = projects.filter(item => item.id != id)

  return res.json({ message: 'Deleted' })

})

routes.post('/projects/:id/tasks', checkIfUserExist, (req, res) => {
  const { id } = req.params
  const { title } = req.body

  let project = projects.find(item => item.id == id)
  project.tasks.push(title)

  return res.json({ projects })
})



export default routes;
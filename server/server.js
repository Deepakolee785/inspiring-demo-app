// imports
const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()

// middlewares
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(jsonServer.defaults())

const SECRET_KEY = 'secret123'

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1 day' })
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  )
}

// Check if the password and email in database
function isPasswordMatches({ email, password }) {
  const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))
  return (
    userdb.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  )
}

// Check if the password and email in database
function isEmailExists({ email }) {
  const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))
  return userdb.users.findIndex((user) => user.email === email) !== -1
}

// Check if the password and email in database
function getUserFromEmail(email) {
  const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))
  const user = userdb.users.filter((user) => user.email == email)
  return user[0]
}

// Register New User
server.post('/user/register', (req, res) => {
  const { name, email, password } = req.body

  if (isEmailExists({ email })) {
    return res.status(401).json({ msg: 'Email already taken.' })
  }

  fs.readFile('./users.json', (err, data) => {
    if (err) {
      res.status(401).json({ msg: err })
      return
    }

    // Get current users data
    var data = JSON.parse(data.toString())

    // Get the id of last user
    var last_item_id = data.users[data.users.length - 1].id

    //Add new user
    data.users.push({
      id: last_item_id + 1,
      name: name,
      email: email,
      password: password,
    }) //add some data
    var writeData = fs.writeFile(
      './users.json',
      JSON.stringify(data),
      (err, result) => {
        // WRITE
        if (err) {
          return res.status(401).json({ msg: err })
        }
      }
    )
  })

  // Create token for new user
  const token = createToken({ name, email })
  res.status(200).json({ token })
})

// Login to one of the users from ./users.json
server.post('/user/login', (req, res) => {
  const { email, password } = req.body
  if (!isEmailExists({ email })) {
    return res.status(401).json({ msg: "Email is't registered." })
  }
  if (!isPasswordMatches({ email, password })) {
    return res.status(401).json({ msg: 'Incorrect email or password' })
  }
  const token = createToken({ email, password })
  res.status(200).json({ token })
})

// server.get('/user', (req, res) => {
//   try {
//     const token = req.headers.token
//     const tokenData = verifyToken(token)
//     const user = getUserFromEmail(tokenData.email)
//     res.send({ user })
//     // console.log(name, tokenData.email)
//   } catch (error) {
//     res.status(401).json({ msg: 'Invalid Token' })
//   }
// })

const port = process.env.PORT || 9000
server.listen(port, () => {
  console.log(`Fake API Server running on port ${port}`)
})

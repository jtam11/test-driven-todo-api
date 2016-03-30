// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  var id = req.query._id,
      task = req.query.task,
      description = req.query.description;

  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});

app.get('/api/todos', function index(req, res) {
  res.json({todos: todos});
  /* This endpoint responds with all of the todos
   */
});

app.post('/api/todos', function create(req, res) {
  if (todos.length > 0) {
   req.body._id = todos[todos.length - 1]._id + 1;
 } else {
   req.body._id = 1;
 }
  todos.push(req.body);
  res.json(req.body);
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
});

app.get('/api/todos/:id', function show(req, res) {
  var id = req.params.id;
  res.json(todos[id-1]);
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
});

app.put('/api/todos/:id', function update(req, res) {
  // var id = req.params.id;
  // id.task = req.body.task; //trying to set old task equal to task entered into form
  // id.description = req.body.description; //trying to set old description equal to description entered into form
  // res.json(todos[id]); //returning json that should have the updated values
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
});

app.delete('/api/todos/:id', function destroy(req, res) {
  var id = req.params.id;
  todos.splice(todos.indexOf(id), 1);
  res.json(todos);
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});

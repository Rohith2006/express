const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let courses = [
  { id: 1, name: "Java" },
  { id: 2, name: "JavaScript" },
  { id: 3, name: "C++" },
  { id: 4, name: "Ruby" },
];

app.get("/courses", (req, res) => {
  res.json(courses);
});

app.get("/courses/:id", (req, res) => {
  const courseId = parseInt(req.params.id);
  const course = courses.find((course) => course.id === courseId);

  if (!course) {
    return res.status(404).send("Course not found");
  }

  res.json(course);
});

app.post("/courses", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send("Name is required");
  }

  const newCourse = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(newCourse);
  res.status(201).json(newCourse);
});

app.put("/courses/:id", (req, res) => {
  const courseId = parseInt(req.params.id);
  const { name } = req.body;
  const course = courses.find((course) => course.id === courseId);

  if (!course) {
    return res.status(404).send("Course not found");
  }

  course.name = name;
  res.json(course);
});

// DELETE /courses/:id - Delete a course
app.delete("/courses/:id", (req, res) => {
  const courseId = parseInt(req.params.id);
  const courseIndex = courses.findIndex((course) => course.id === courseId);

  if (courseIndex === -1) {
    return res.status(404).send("Course not found");
  }

  courses.splice(courseIndex, 1);
  res.send("Course deleted successfully");
});

// Handle 404 - Route not found
app.use((req, res, next) => {
  res.status(404).send("404 - Not Found");
});

function logger(req, res, next){
    console.log("ip:", req.ip);
    console.log("method:", req.method);
    console.log("hostname:", req.hostname);
    console.log("date:", new Date());
    next();
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

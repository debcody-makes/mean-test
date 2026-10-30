const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

// Allow requests from Angular.
app.use(cors({
  origin: 'http://localhost:4200'
}));

// Parse incoming JSON.
app.use(express.json());

// Sample milestone records.
const milestones = [
  {
    id: 1,
    name: 'Create Angular Components',
    status: 'Completed'
  },
  {
    id: 2,
    name: 'Implement Reactive Forms',
    status: 'Completed'
  },
  {
    id: 3,
    name: 'Develop Express Backend',
    status: 'In Progress'
  }
];

// Home endpoint.
app.get('/', (req, res) => {
  res.send('Project Progress Tracker API is running!');
});

// Retrieve milestone records.
app.get('/milestones', (req, res) => {
  console.log('GET request received for milestones');
  res.status(200).json(milestones);
});

// Receive milestone information.
app.post('/milestones', (req, res) => {
  const { name, status } = req.body;

  console.log('New milestone received:');
  console.log('Name:', name);
  console.log('Status:', status);

  res.status(200).json({
    message: 'Milestone received successfully!'
  });
});

// Start the server.
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

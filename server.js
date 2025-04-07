const app = require('./app');
const PORT = 8000; //the door my app listens on

app.listen(PORT, () => {
  console.log('Servern startad');
});

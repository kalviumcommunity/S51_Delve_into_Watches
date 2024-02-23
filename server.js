const { startDatabase, stopDatabase, isConnected } = require('./db');

const express = require('express');
const app = express();
const port = 3000;
const {getRouter,postRouter,patchRouter,deleteRouter} = require('./routes/routes')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use("/",getRouter)
app.use("/",postRouter)
app.use("/",patchRouter)
app.use("/",deleteRouter)



app.get('/', (req, res) => {
  res.json({
    message: 'o_O',
    database: isConnected() ? 'connected' : 'disconnected'
  })
});

  
  app.get('/ping', (req, res) => {
    res.send('pong');
  });
  
  app.listen(port, async () => {
    await startDatabase();

    console.log(`🚀 server running on PORT: ${port}`);
  });
module.exports = app;
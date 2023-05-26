const express = require(express);
const cors  = require(cors);

const app = express();
app.use(cors());

app.use('/ogin', (req, res) => {
    res.send({
        token: 'test'
    })
})

app.listen(3344, () => console.log('App runnig on localhost:3344'))
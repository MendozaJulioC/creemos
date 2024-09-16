require('dotenv').config();
const app = require('./app');
const morgan = require('morgan');

app.use(morgan('dev'));

app.use(require('./routes/index.routes'));
app.use(require('./routes/auth.routes'))
app.use(require('./routes/info.routes'))


async function main()
{
    app.listen(process.env.KTRO_PORT,()=>{ console.log(`Servidor activo ${process.env.KTRO_PORT}`);})
}
main();
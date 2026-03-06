const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/users',    require('./modules/users/user.routes'));
app.use('/api/clients',  require('./modules/clients/client.routes'));
app.use('/api/invoices', require('./modules/invoices/invoice.routes'));
app.use('/api/payments', require('./modules/payments/payment.routes'));
app.use('/api/actions',  require('./modules/actions/action.routes'));
app.use('/api/stats',    require('./modules/stats/stats.routes'));

module.exports = app;
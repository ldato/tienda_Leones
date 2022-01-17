const consultasRoutes = require('../entidades/consultas/routes');
const ingresosRoutes = require('../entidades/ingresos/routes');
const ventasRoutes = require('../entidades/ventas/routes');

function router (app) {
    app.use('/consultas', consultasRoutes);
    app.use('/ingresos', ingresosRoutes);
    app.use('/ventas', ventasRoutes);

}

module.exports = router;
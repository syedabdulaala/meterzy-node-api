import { App } from './core/app';
const PORT = 60336;
new App().app.listen(PORT, () => console.log('Express server listening on port ' + PORT));

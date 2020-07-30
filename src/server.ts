import { app } from './app';

const PORT = 3333 || process.env.PORT;

app.listen(PORT, () => console.info(`Application running on ${PORT}`));

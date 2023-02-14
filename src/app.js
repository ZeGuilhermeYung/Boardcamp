import routeCustomers from './routers/customers.router.js';
import routeCategories from './routers/categories.routers.js';
import routeRentals from './routers/rentals.routers.js';
import routeGames from './routers/routers.games.js';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use(routeCustomers);
app.use(routeCategories);
app.use(routeRentals);
app.use(routeGames);
app.listen(5000, () => {
  console.log("Server listening on port " + 5000);
});
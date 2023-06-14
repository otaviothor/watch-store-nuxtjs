const usersSeeder = (server) => {
  server.createList('user', 10);
};

const productsSeeder = (server) => {
  server.createList('product', 25);
};

export default function seeds(server) {
  usersSeeder(server);
  productsSeeder(server);
}

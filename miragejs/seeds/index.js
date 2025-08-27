const usersSeeder = (server) => {
  server.createList('user', 10);
};

const productsSeeder = (server) => {
  server.createList('product', 24);
};

export default function seeds(server) {
  usersSeeder(server);
  productsSeeder(server);
}

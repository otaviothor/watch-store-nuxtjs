import { Server } from 'miragejs';
import products from '@/mocks/products.json';

export function makeServer({ environment = 'development' } = {}) {
  return new Server({
    environment,
    routes() {
      this.namespace = 'api';

      this.get('products', () => ({
        products,
      }));
    },
  });
}

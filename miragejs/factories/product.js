import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';

export default {
  product: Factory.extend({
    title() {
      return faker.commerce.product();
    },
    price() {
      return faker.commerce.price();
    },
  }),
};

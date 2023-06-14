import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';

export default {
  message: Factory.extend({
    content() {
      return faker.lorem.paragraph();
    },
    date() {
      const date = new Date(faker.date.past);
      return date.toLocaleDateString();
    },
  }),
};

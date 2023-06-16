// import { Response } from 'miragejs';

export default function routes() {
  this.namespace = 'api';
  // this.timing = 5000;

  this.resource('users');
  this.resource('products');

  // this.get('products', () => {
  //   return new Response(500, {}, 'unknow error');
  // });

  this.get('messages', (schema, request) => {
    const {
      queryParams: { userId },
    } = request;

    return schema.messages.where({ userId });
  });
}

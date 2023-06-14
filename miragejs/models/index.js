import { Model, hasMany, belongsTo } from 'miragejs';

export default {
  user: Model.extend({
    messages: hasMany(),
  }),
  messages: Model.extend({
    user: belongsTo(),
  }),
  product: Model,
};

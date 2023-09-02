import { CartManager } from '@/managers/CartManager';
import { mount } from '@vue/test-utils';
import { makeServer } from '~/miragejs/server';

describe('CartManager', () => {
  let server;
  let manager;

  beforeEach(() => {
    manager = new CartManager();
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should set cart to open', async () => {
    const state = manager.open();

    expect(state.open).toBe(true);
  });

  it('should set cart to closed', async () => {
    const state = manager.close();

    expect(state.open).toBe(false);
  });

  it('should add product to the cart only once', async () => {
    const product = server.create('product');
    manager.addProduct(product);
    const state = manager.addProduct(product);

    expect(state.items).toHaveLength(1);
  });

  it('should remove product from the cart', async () => {});

  it('should clear products', async () => {});

  it('should clear cart', async () => {});

  it('should return true if cart is not empty', async () => {});

  it('should returno true if product is already in the cart', async () => {});
});

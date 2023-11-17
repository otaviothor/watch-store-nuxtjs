import CartItem from '@/components/CartItem';
import { CartManager } from '@/managers/CartManager';
import { makeServer } from '@/miragejs/server';
import { mount } from '@vue/test-utils';

const mountCartItem = () => {
  const product = server.create('product', {
    title: 'Beautiful Watch',
    price: '22.33',
  });

  const cartManager = new CartManager();

  const wrapper = mount(CartItem, {
    propsData: {
      product,
    },
    mocks: {
      $cart: cartManager,
    },
  });

  return { wrapper, product, cartManager };
};

describe('CartItem', () => {
  let server;
  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
  });

  it('should mount the component', () => {
    const { wrapper, title } = mountCartItem();
    expect(wrapper.vm).toBeDefined();
  });

  it('should display product info', async () => {
    const {
      wrapper,
      product: { title, price },
    } = mountCartItem(server);
    const content = wrapper.text();

    expect(content).toContain(title);
    expect(content).toContain(price);
  });

  it('should display quantity 1 when product is first displayed', async () => {
    const { wrapper } = mountCartItem();
    const quantity = wrapper.find('[data-testid="quantity"]');

    expect(quantity.text()).toContain('1');
  });

  it('should increase quantity when + button is clicked', async () => {
    const { wrapper } = mountCartItem();
    const quantity = wrapper.find('[data-testid="quantity"]');
    const button = wrapper.find('[data-testid="+"]');

    expect(quantity.text()).toContain('1');
    await button.trigger('click');
    expect(quantity.text()).toContain('2');
    await button.trigger('click');
    expect(quantity.text()).toContain('3');
    await button.trigger('click');
    expect(quantity.text()).toContain('4');
  });

  it('should decrease quantity when - button is clicked', async () => {
    const { wrapper } = mountCartItem();
    const quantity = wrapper.find('[data-testid="quantity"]');
    const button = wrapper.find('[data-testid="-"]');

    await button.trigger('click');
    expect(quantity.text()).toContain('0');
  });

  it('should not go below zero when - button is repeatedly clicked', async () => {
    const { wrapper } = mountCartItem();
    const quantity = wrapper.find('[data-testid="quantity"]');
    const button = wrapper.find('[data-testid="-"]');

    await button.trigger('click');
    await button.trigger('click');

    expect(quantity.text()).toContain('0');
  });

  it('should display a button to remove item from cart', async () => {
    const { wrapper } = mountCartItem();
    const button = wrapper.find('[data-testeid="remove-button"]');

    expect(button.exists()).toBeTruthy();
  });

  it('should call cart manager removeProduct() when button gets clicked', async () => {
    const { wrapper, cartManager, product } = mountCartItem();
    const spy = jest.spyOn(cartManager, 'removeProduct');
    await wrapper.find('[data-testeid="remove-button"]').trigger('click');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(product.id);
  });
});

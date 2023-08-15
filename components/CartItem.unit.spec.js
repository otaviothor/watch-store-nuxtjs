import CartItem from '@/components/CartItem';
import { makeServer } from '@/miragejs/server';
import { mount } from '@vue/test-utils';

const mountCartItem = (server) => {
  const product = server.create('product', {
    title: 'Beautiful Watch',
    price: '22.33',
  });

  const wrapper = mount(CartItem, {
    propsData: {
      product,
    },
  });

  return { wrapper, product };
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
    const { wrapper, title } = mountCartItem(server);
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
    const { wrapper } = mountCartItem(server);
    const quantity = wrapper.find('[data-testid="quantity"]');

    expect(quantity.text()).toContain('1');
  });

  it('should increase quantity when + button is clicked', async () => {
    const { wrapper } = mountCartItem(server);
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
    const { wrapper } = mountCartItem(server);
    const quantity = wrapper.find('[data-testid="quantity"]');
    const button = wrapper.find('[data-testid="-"]');

    await button.trigger('click');
    expect(quantity.text()).toContain('0');
  });

  it('should not go below zero when - button is repeatedly clicked', async () => {
    const { wrapper } = mountCartItem(server);
    const quantity = wrapper.find('[data-testid="quantity"]');
    const button = wrapper.find('[data-testid="-"]');

    await button.trigger('click');
    await button.trigger('click');

    expect(quantity.text()).toContain('0');
  });
});

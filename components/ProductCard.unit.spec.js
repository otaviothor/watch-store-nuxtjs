import ProductCard from '@/components/ProductCard';
import { CartManager } from '@/managers/CartManager';
import { makeServer } from '@/miragejs/server';
import { mount } from '@vue/test-utils';

describe('ProductCart - unit', () => {
  let server;

  const mountProductCart = () => {
    const product = server.create('product', {
      title: 'Relógio Bonito',
      price: '22.00',
      image:
        'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&auto=format&fit=crop&w=689&q=80',
    });

    const cartManager = new CartManager();

    const wrapper = mount(ProductCard, {
      propsData: {
        product,
      },
      mocks: {
        $cart: cartManager,
      },
    });

    return {
      wrapper,
      product,
      cartManager,
    };
  };

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should match snapshot', () => {
    const { wrapper } = mountProductCart();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should mount the component', () => {
    const { wrapper } = mountProductCart();

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.text()).toContain('Relógio Bonito');
    expect(wrapper.text()).toContain('22.00');
  });

  it('should add item to cartState on button click', async () => {
    const { wrapper, cartManager, product } = mountProductCart();
    const spy1 = jest.spyOn(cartManager, 'open');
    const spy2 = jest.spyOn(cartManager, 'addProduct');

    await wrapper.find('button').trigger('click');

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledWith(product);
  });
});

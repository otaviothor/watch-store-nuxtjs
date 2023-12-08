import Cart from '@/components/Cart';
import CartItem from '@/components/CartItem';
import { CartManager } from '@/managers/CartManager';
import { makeServer } from '@/miragejs/server';
import { mount } from '@vue/test-utils';
import Vue from 'vue';

describe('Cart', () => {
  let server;
  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();

    jest.clearAllMocks();
  });

  const mountCart = () => {
    const products = server.createList('product', 2);

    const cartManager = new CartManager();

    const wrapper = mount(Cart, {
      propsData: {
        products,
      },
      mocks: {
        $cart: cartManager,
      },
    });

    return { wrapper, products, cartManager };
  };

  it('should mount the component', () => {
    const { wrapper } = mountCart();

    expect(wrapper.vm).toBeDefined();
  });

  it('should not display empty cart when there are no products', () => {
    const { cartManager } = mountCart();

    const wrapper = mount(Cart, {
      mocks: {
        $cart: cartManager,
      },
    });

    expect(
      wrapper.find('[data-testid="clear-cart-button"]').exists()
    ).toBeFalsy();
  });

  it('should emit close event when button gets clicked', async () => {
    const { wrapper } = mountCart();
    await wrapper.find('[data-testid="close-button"]').trigger('click');

    expect(wrapper.emitted().close).toBeTruthy();
    expect(wrapper.emitted().close).toHaveLength(1);
  });

  it('should hide the cart when no prop isOpen is passed', async () => {
    const { wrapper } = mountCart();

    expect(wrapper.classes()).toContain('hidden');
  });

  it('should display the cart when prop isOpen is passed', async () => {
    const { wrapper } = mountCart();

    await wrapper.setProps({
      isOpen: true,
    });

    expect(wrapper.classes()).not.toContain('hidden');
  });

  it('should display cart "Cart is empty" when there are no products', async () => {
    const { wrapper } = mountCart();

    wrapper.setProps({
      products: [],
    });

    await Vue.nextTick();

    expect(wrapper.text()).toContain('Cart is empty');
  });

  it('should display 2 instances of CartItem when 2 products are provided', async () => {
    const { wrapper } = mountCart();

    expect(wrapper.findAllComponents(CartItem)).toHaveLength(2);
    expect(wrapper.text()).not.toContain('Cart is empty');
  });

  it('should display a button to clear cart', async () => {
    const { wrapper } = mountCart();
    const button = wrapper.find('[data-testid="clear-cart-button"]');

    expect(button.exists()).toBeTruthy();
  });

  it('should call cart manager clearProducts() when button gets clicked', async () => {
    const { wrapper, cartManager } = mountCart();
    const spy = jest.spyOn(cartManager, 'clearProducts');
    await wrapper.find('[data-testid="clear-cart-button"]').trigger('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

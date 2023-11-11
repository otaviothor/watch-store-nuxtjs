import { mount } from '@vue/test-utils';
import Cart from '@/components/Cart';
import DefaultLayout from '@/layouts/default';
import { CartManager } from '@/managers/CartManager';

describe('DefaultLayout', () => {
  const mountLayout = () => {
    const wrapper = mount(DefaultLayout, {
      mocks: {
        $cart: new CartManager(),
      },
      stubs: {
        Nuxt: true,
      },
    });

    return { wrapper };
  };

  it('should mount cart', () => {
    const { wrapper } = mountLayout();
    expect(wrapper.findComponent(Cart).exists()).toBeTruthy();
  });

  it('should toggle Cart visibility', async () => {
    const { wrapper } = mountLayout();
    const button = wrapper.find('[data-testid="toggle-button"]');

    await button.trigger('click');
    expect(wrapper.vm.isCartOpen).toBeTruthy();

    await button.trigger('click');
    expect(wrapper.vm.isCartOpen).toBeFalsy();
  });
});

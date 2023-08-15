import { mount } from '@vue/test-utils';
import Cart from '@/components/Cart';

describe('Cart', () => {
  it('should mount the component', () => {
    const wrapper = mount(Cart);

    expect(wrapper.vm).toBeDefined();
  });

  it('should emit close event when button gets clicked', async () => {
    const wrapper = mount(Cart);
    await wrapper.find('[data-testid="close-button"]').trigger('click');

    expect(wrapper.emitted().close).toBeTruthy();
    expect(wrapper.emitted().close).toHaveLength(1);
  });

  it('should hide the cart when no prop isOpen is passed', async () => {
    const wrapper = mount(Cart);

    expect(wrapper.classes()).toContain('hidden');
  });

  it('should display the cart when prop isOpen is passed', async () => {
    const wrapper = mount(Cart, {
      propsData: {
        isOpen: true,
      },
    });

    expect(wrapper.classes()).not.toContain('hidden');
  });

  it('should display cart "Cart is empty" when there are no products', async () => {
    const wrapper = mount(Cart);

    expect(wrapper.text()).toContain('Cart is empty');
  });
});

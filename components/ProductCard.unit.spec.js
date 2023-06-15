import { mount } from '@vue/test-utils';
import ProductCard from '@/components/ProductCard';
import { makeServer } from '@/miragejs/server';

describe('ProductCart - unit', () => {
  let server;

  const mountProductCart = () => {
    const product = server.create('product', {
      title: 'Relógio Bonito',
      price: '22.00',
      image:
        'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&auto=format&fit=crop&w=689&q=80',
    });
    return {
      wrapper: mount(ProductCard, {
        propsData: {
          product,
        },
      }),
      product,
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

  it('should emit the event addToCart with product object when button gets clicked', async () => {
    const { wrapper, product } = mountProductCart();

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted().addToCard).toBeTruthy();
    expect(wrapper.emitted().addToCard.length).toBe(1);
    expect(wrapper.emitted().addToCard[0]).toEqual([{ product }]);
  });
});

import Search from '@/components/Search';
import ProductCard from '@/components/ProductCard';
import { mount } from '@vue/test-utils';
import axios from 'axios';
import ProductList from '.';
import { makeServer } from '@/miragejs/server';
import Vue from 'vue';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('ProductList - unit', () => {
  let server;
  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();

    jest.clearAllMocks();
  });

  const getProducts = (quantity = 10, overrides = []) => {
    let overrideList = [];

    if (overrides.length > 0) {
      overrideList = overrides.map((override) =>
        server.create('product', override)
      );
    }

    const products = [
      ...server.createList('product', quantity),
      ...overrideList,
    ];

    return products;
  };

  const mountProductList = async (
    quantity = 10,
    overrides = [],
    shouldReject = false
  ) => {
    const products = await getProducts(quantity, overrides);

    if (shouldReject) {
      axios.get.mockReturnValue(Promise.reject(new Error('')));
    } else {
      axios.get.mockReturnValue(Promise.resolve({ data: { products } }));
    }

    const wrapper = mount(ProductList, {
      mocks: {
        $axios: axios,
      },
    });

    await Vue.nextTick();

    return { wrapper, products };
  };

  it('should mount the component', async () => {
    const { wrapper } = await mountProductList();
    expect(wrapper.vm).toBeDefined();
  });

  it('should mount the Search component as a child', async () => {
    const { wrapper } = await mountProductList();
    expect(wrapper.findComponent(Search)).toBeDefined();
  });

  it('should call axios.get on component mount', async () => {
    await mountProductList();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/api/products');
  });

  it('should mount the ProductCard component 10 times', async () => {
    const { wrapper } = await mountProductList();
    const cards = wrapper.findAllComponents(ProductCard);
    expect(cards).toHaveLength(10);
  });

  it('should display the error message when Promise rejects', async () => {
    const { wrapper } = await mountProductList(10, [], true);
    expect(wrapper.text()).toContain('Problems when loading list');
  });

  it('should filter the product list when search a is performed', async () => {
    // arrange
    const { wrapper } = await mountProductList(10, [
      {
        title: 'my loved watch',
      },
      {
        title: 'my other loved watch',
      },
    ]);

    // act
    const search = wrapper.findComponent(Search);
    search.find('input[type="search"]').setValue('watch');
    await search.find('form').trigger('submit');

    // assert
    const cards = wrapper.findAllComponents(ProductCard);
    expect(wrapper.vm.searchTerm).toEqual('watch');
    expect(cards).toHaveLength(2);
  });

  it('should filter the product list when a search is performed', async () => {
    // arrange
    const { wrapper } = await mountProductList(10, [
      {
        title: 'my loved watch',
      },
    ]);

    // act
    const search = wrapper.findComponent(Search);
    search.find('input[type="search"]').setValue('watch');
    await search.find('form').trigger('submit');
    search.find('input[type="search"]').setValue('');
    await search.find('form').trigger('submit');

    // assert
    const cards = wrapper.findAllComponents(ProductCard);
    expect(wrapper.vm.searchTerm).toEqual('');
    expect(cards).toHaveLength(11);
  });

  it('should display the total quantity of products', async () => {
    const { wrapper } = await mountProductList(27);

    const label = wrapper.find('[data-testid="total-quantity-label"]');
    expect(label.text()).toEqual('27 Products');
  });

  it('should display product (singuler) when there is only 1 product', async () => {
    const { wrapper } = await mountProductList(1);

    const label = wrapper.find('[data-testid="total-quantity-label"]');
    expect(label.text()).toEqual('1 Product');
  });
});

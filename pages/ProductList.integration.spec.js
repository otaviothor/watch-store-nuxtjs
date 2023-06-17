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
  });

  it('should mount the component', () => {
    const wrapper = mount(ProductList);
    expect(wrapper.vm).toBeDefined();
  });

  it('should mount the Search component as a child', () => {
    const wrapper = mount(ProductList);
    expect(wrapper.findComponent(Search)).toBeDefined();
  });

  it('should call axios.get on component mount', () => {
    mount(ProductList, {
      mocks: {
        $axios: axios,
      },
    });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/api/products');
  });

  it('should mount the ProductCard component 10 times', async () => {
    const products = server.createList('product', 10);
    axios.get.mockReturnValue(Promise.resolve({ data: { products } }));

    const wrapper = mount(ProductList, {
      mocks: {
        $axios: axios,
      },
    });

    await Vue.nextTick();

    const cards = wrapper.findAllComponents(ProductCard);
    expect(cards).toHaveLength(10);
  });

  it('should display the error message when Promise rejects', async () => {
    axios.get.mockReturnValue(Promise.reject(new Error('')));

    const wrapper = mount(ProductList, {
      mocks: {
        $axios: axios,
      },
    });

    await Vue.nextTick();

    expect(wrapper.text()).toContain('Problems when loading list');
  });

  it('should filter the product list when search is performed', async () => {
    // arrange
    const products = [
      ...server.createList('product', 10),
      server.create('product', {
        title: 'my loved watch',
      }),
      server.create('product', {
        title: 'my other loved watch',
      }),
    ];
    axios.get.mockReturnValue(Promise.resolve({ data: { products } }));

    const wrapper = mount(ProductList, {
      mocks: {
        $axios: axios,
      },
    });

    await Vue.nextTick();

    // act
    const search = wrapper.findComponent(Search);
    search.find('input[type="search"]').setValue('watch');
    await search.find('form').trigger('submit');

    // assert
    const cards = wrapper.findAllComponents(ProductCard);
    expect(wrapper.vm.searchTerm).toEqual('watch');
    expect(cards).toHaveLength(2);
  });

  it('should filter the product list when search is performed', async () => {
    // arrange
    const products = [
      ...server.createList('product', 10),
      server.create('product', {
        title: 'my loved watch',
      }),
    ];
    axios.get.mockReturnValue(Promise.resolve({ data: { products } }));

    const wrapper = mount(ProductList, {
      mocks: {
        $axios: axios,
      },
    });

    await Vue.nextTick();

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
});

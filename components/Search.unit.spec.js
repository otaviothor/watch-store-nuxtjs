import Search from '@/components/Search';
import { mount } from '@vue/test-utils';

describe('Search - unit', () => {
  it('should mount the component', () => {
    const wrapper = mount(Search);
    expect(wrapper.vm).toBeDefined();
  });

  it('should emit the search event when form is submitted', async () => {
    const wrapper = mount(Search);
    const term = 'term for search';

    await wrapper.find('input[type="search"]').setValue(term);
    await wrapper.find('form').trigger('submit');

    expect(wrapper.emitted().doSearch).toBeTruthy();
    expect(wrapper.emitted().doSearch.length).toBe(1);
    expect(wrapper.emitted().doSearch[0]).toEqual([{ term }]);
  });

  it('should emit the search event when search input is cleard', async () => {
    const wrapper = mount(Search);
    const term = 'term for search';
    const input = wrapper.find('input[type="search"]');

    await input.setValue(term);
    await input.setValue('');

    expect(wrapper.emitted().doSearch).toBeTruthy();
    expect(wrapper.emitted().doSearch.length).toBe(1);
    expect(wrapper.emitted().doSearch[0]).toEqual([{ term: '' }]);
  });
});

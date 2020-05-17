import { shallowMount } from '@vue/test-utils'
import SelectValikko from '@/components/SelectValikko.vue'

describe('SelectValikko.vue', () => {
  it('asettaa ja nayttaa datan oikein propsin mukaan', () => {
    const teema = 1
    const wrapper = shallowMount(SelectValikko, {
      propsData: { teema }
    })
    const option1 = wrapper.findAll('option').at(0)
    expect(option1.text()).toBe('joulu')
    expect(wrapper.vm.$data.tulos).toBe(1)
  })
})

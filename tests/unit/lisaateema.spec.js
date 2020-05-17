import { shallowMount } from '@vue/test-utils'
import LisaaTeema from '@/components/LisaaTeema.vue'

const wrapper = shallowMount(LisaaTeema)

describe('LisaaTeema.vue', () => {
  it('renderoi elementit oikein', () => {
      expect(wrapper.find('button').text()).toBe('Tallenna')
      expect(wrapper.find('input').exists()).toBe(true)
      expect(wrapper.find('a').text()).toBe('Takaisin')
  })
  
  it('renderoi ehdon mukaan', async () => {
    await wrapper.setData({ submitted: true })
    expect(wrapper.find('h4').text()).toBe('Tallennus onnistui!')
    expect(wrapper.find('button').text()).toBe('Lisää')
  })
})
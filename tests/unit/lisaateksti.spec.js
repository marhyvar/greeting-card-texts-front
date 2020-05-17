import { shallowMount } from '@vue/test-utils'
import LisaaTeksti from '@/components/LisaaTeksti.vue'
import SelectValikko from '@/components/SelectValikko.vue'

const wrapper = shallowMount(LisaaTeksti)

describe('LisaaTeksti.vue', () => {
  it('renderoi elementit oikein', () => {
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find(SelectValikko).exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Tallenna')   
    expect(wrapper.find('a').text()).toBe('Takaisin')
  })
  
  it('vaihtaa teemaa kun get-teema emittoidaan', () => {
    wrapper.find(SelectValikko).vm.$emit('get-teema', 1)
    expect(wrapper.vm.$data.teksti.teema_id).toBe(1)
  })

  it('renderoi ehdon mukaan', async () => {
    await wrapper.setData({ submitted: true })
    expect(wrapper.find('h4').text()).toBe('Tallennus onnistui!')
    expect(wrapper.find('button').text()).toBe('Lisää')
  })
})
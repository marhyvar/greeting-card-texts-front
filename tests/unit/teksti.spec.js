import { shallowMount } from '@vue/test-utils'
import Teksti from '@/components/Teksti.vue'
import SelectValikko from '@/components/SelectValikko.vue'

const $route = {
    path: '/tekstit/',
    hash: '',
    params: { id: '1' }
}

const wrapper = shallowMount(Teksti, {
    mocks: {
        // lisää mock- `$route` objektin Vue instanssille
        $route
    }  
    }
)

describe('Teksti.vue', () => {
    it('renderoi elementit oikein', async () => {
        await wrapper.setData({ valittuTeksti: {id: 3, teksti: "On vain hiljaisuus ja sanaton suru.", teema_id: 2} })
        expect(wrapper.find('textarea').exists()).toBe(true)
        expect(wrapper.find(SelectValikko).exists()).toBe(true)
        expect(wrapper.findAll('button').at(0).text()).toBe('Poista')
        expect(wrapper.findAll('button').at(1).text()).toBe('Muokkaa')
        expect(wrapper.find('a').text()).toBe('Takaisin')
        expect(wrapper.find('p').text()).toBe('')
    })

    it('vaihtaa teemaa kun get-teema emittoidaan', async () => {
        await wrapper.find(SelectValikko).vm.$emit('get-teema', 1)
        expect(wrapper.vm.$data.valittuTeksti.teema_id).toBe(1)
    })

    it('renderoi ehdon mukaan', async () => {
        await wrapper.setData({ valittuTeksti: null })
        expect(wrapper.find('p').text()).toBe('Klikkaa tekstiä...')
    })   
  })
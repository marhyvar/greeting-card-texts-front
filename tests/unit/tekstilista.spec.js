import { shallowMount } from '@vue/test-utils'
import TekstiLista from '@/components/TekstiLista.vue'
import SelectValikko from '@/components/SelectValikko.vue'

const wrapper = shallowMount(TekstiLista)

describe('TekstiLista.vue', () => {
    it('asettaa oikean alkudatan', () => {
      const defaultData = TekstiLista.data()
      expect(defaultData.viesti).toBe('')
      expect(defaultData.teema).toBe('')
      expect(defaultData.valittuIndeksi).toBe(-1)
    })

    it('renderoi elementit oikein', () => {
        expect(wrapper.find(SelectValikko).exists()).toBe(true)
        expect(wrapper.findAll('button').at(0).text()).toBe('Hae teemalla')
        expect(wrapper.findAll('button').at(1).text()).toBe('Näytä kaikki')
        expect(wrapper.find('p').text()).toBe('Valitse teksti klikkaamalla')
    })

    it('renderoi ehdon mukaan', async () => {
        await wrapper.setData({ valittuTeksti: { teksti:"On vain hiljaisuus ja sanaton suru.", index: 2 }})
        expect(wrapper.find('h5').text()).toBe('Valittu teksti:')
    })

    it('renderoi listan oikein', async () => {
        await wrapper.setData({ tekstit: [{id: 3,teksti: "On vain hiljaisuus ja sanaton suru.", teema_id: 2},
        {id: 4,teksti: "Tää hiljaisuus sulle kantakoon sen, osanottoni suurimman lämpöisen.", teema_id: 2}]})
        expect(wrapper.findAll('li').at(0).text()).toBe('On vain hiljaisuus ja sanaton suru.')
        expect(wrapper.findAll('li').at(1).text()).toBe('Tää hiljaisuus sulle kantakoon sen, osanottoni suurimman lämpöisen.')
    })
  })
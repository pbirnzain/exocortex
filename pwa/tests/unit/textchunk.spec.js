import { mount } from '@vue/test-utils'
import TextChunk from '@/pages/edit/chunks/TextChunk.vue'

describe('TextChunk.vue', () => {
  let wrapper

  beforeEach(async () => {
    const chunk = { text: '## ThisIsMyChunkText' }
    wrapper = mount(TextChunk, {
      propsData: { chunk }
    })
    await wrapper.vm.$nextTick()
  })

  it('renders markdown', async () => {
    expect(wrapper.find('.markdown-body').text()).toContain('ThisIsMyChunkText')
    expect(wrapper.find('.markdown-body').contains('h2')).toBe(true)
  })

  it('allows editing on click', async () => {
    wrapper.find('.markdown-body').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('textarea').element.value).toContain('## ThisIsMyChunkText')

    wrapper.find('textarea').trigger('blur')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.markdown-body').contains('h2')).toBe(true)
  })
})

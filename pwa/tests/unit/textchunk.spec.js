import { mount } from '@vue/test-utils'
import TextChunk from '@/components/chunks/TextChunk.vue'

describe('TextChunk.vue', () => {
  it('renders markdown', () => {
    const chunk = { text: '## ThisIsMyChunkText' }
    const wrapper = mount(TextChunk, {
      propsData: { chunk }
    })
    expect(wrapper.find('.markdown-body').text()).toContain('ThisIsMyChunkText')
    expect(wrapper.find('.markdown-body').contains('h2')).toBe(true)
  })

  it('allows editing on click', () => {
    const chunk = { text: '## ThisIsMyChunkText' }
    const wrapper = mount(TextChunk, {
      propsData: { chunk }
    })

    wrapper.find('.markdown-body').trigger('click')
    expect(wrapper.find('textarea').element.value).toContain('## ThisIsMyChunkText')

    wrapper.find('textarea').trigger('blur')
    expect(wrapper.find('.markdown-body').contains('h2')).toBe(true)
  })
})

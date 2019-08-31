
function createMockTopics () {
  return [
    {
      title: 'pinned topic',
      pinned: true,
      complete: false
    },
    {
      title: 'non-pinned topic',
      pinned: false,
      complete: false
    },
    {
      title: 'archived topic',
      pinned: false,
      complete: true
    },
    {
      title: 'pinned, archived topic',
      pinned: true,
      complete: true
    }
  ]
}

function createMockState () {
  return {
    searchText: '',
    filter: undefined,
    completeLoaded: true,
    incompleteLoaded: true
  }
}

export { createMockState, createMockTopics }

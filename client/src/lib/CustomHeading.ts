import { Heading as DefaultHeading } from '@tiptap/extension-heading'

let usedIds = new Set()

function slugify(text = '') {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export function generateUniqueId(text: string) {
  const base = slugify(text)
  let id = base
  let counter = 1

  while (usedIds.has(id)) {
    id = `${base}-${counter++}`
  }

  usedIds.add(id)
  return id
}

export const CustomHeading = DefaultHeading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      id: {
        default: null,
        parseHTML: element => element.getAttribute('id'),
        renderHTML: attributes => ({
          id: attributes.id,
        }),
      },
    }
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setHeading:
        attrs =>
        ({ commands, editor }) => {
          const textContent = editor.state.selection.$from.parent.textContent || 'heading'
          const id = generateUniqueId(textContent)
          return commands.setNode(this.name, { ...attrs, id })
        },
    }
  },
})

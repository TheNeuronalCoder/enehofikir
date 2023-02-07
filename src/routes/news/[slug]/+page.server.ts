import { error } from '@sveltejs/kit'

export const load = async({ params }) => {
  const res = await fetch('http://localhost:1337/api/stories?populate=*')
  const json = await res.json()
  const story = json.data.filter(story => params.slug == story.attributes.title.toLowerCase().split(' ').join('-'))
  if (story.length)
    return story[0].attributes
  throw error(404, { message: 'Not found' })
}
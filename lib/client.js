import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient( {
    projectId: 'y0gx3dc1',
    dataset: 'production',
    apiVersion: '2022-03-10',
    useCdn: true,
    token: process.env.SANITY_TOKEN
});

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)
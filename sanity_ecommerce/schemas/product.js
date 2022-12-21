// schema of a product. It will be in js object format
export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [ 
        { // field 1: product image
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{type: 'image'}], // specify the type of the array
            options: {
                hotspot: true
            }
        },
        { // field 2: product name
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        { // field 3: unique string
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 90
            }
        },
        { // field 4: price
            name: 'price',
            title: 'Price',
            type: 'number'
        },
        { // field 5: details
            name: 'details',
            title: 'Details',
            type: 'string'
        },
        {
            name: 'completedescription',
            title: 'CompleteDescription',
            type: 'text'
        }
    ]
}
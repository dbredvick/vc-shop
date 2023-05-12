import slugify from 'slugify';

export const findProductBySlug = async (slug: string) => {
	const products = await fetch(
		`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?access_token=${process.env.CONTENTFUL_DELIVERY_TOKEN}&content_type=ecommerceProduct`,
		{ next: { revalidate: 60 } }
	).then((res) => res.json());

	return products.items.find(({ fields }) => {
		const sluggedName = slugify(fields.name, { lower: true });
		return sluggedName === slug;
	});
};

export const getProductReviews = async (slug: string, ms = 1500) => {
	await new Promise((resolve) => setTimeout(resolve, ms));
	return fetch(
		`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?access_token=${process.env.CONTENTFUL_DELIVERY_TOKEN}&content_type=ecommerceReview&fields.slug=${slug}`,
		{ next: { revalidate: 60 } }
	).then((res) => res.json());
};

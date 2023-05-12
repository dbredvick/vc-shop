export const getImage = async (id: string) => {
	return fetch(
		`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/assets/${id}?access_token=${process.env.CONTENTFUL_DELIVERY_TOKEN}`,
		// @ts-ignore
		{ next: { revalidate: 60 } }
	).then((res) => res.json());
};

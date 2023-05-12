export interface EcommerceProduct {
	name: string;
	price: number;
	description: string;
	summary: string;
	image: {
		sys: {
			id: string;
			type: string;
			linkType: string;
		};
	};
}

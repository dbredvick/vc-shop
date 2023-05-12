import slugify from 'slugify';
import { getProducts } from '@/lib/get-products';
import ProductReviews from '@/components/products/reviews';
import RecommendedProducts from '@/components/products/recommended-products';
import ProductDetails from '@/components/products/details';

export const dynamic = 'force-static';

export async function generateStaticParams() {
	const products = await getProducts(0);

	return products.items.map(({ fields }) => ({
		slug: slugify(fields.name, { lower: true }),
	}));
}

interface Props {
	params: { slug: string };
	searchParams: {
		recommendedProducts?: string;
		productReviews?: string;
	};
}

export default async function ProductPage({ params, searchParams }: Props) {
	return (
		<>
			{/* @ts-expect-error Server Component */}
			<ProductDetails slug={params.slug} />
			<div className='flex flex-col gap-3'>
				<RecommendedProducts
					slug={params.slug}
					key={searchParams.recommendedProducts}
					timeout={Number(searchParams.recommendedProducts) || undefined}
				/>
				<ProductReviews
					slug={params.slug}
					key={searchParams.productReviews}
					timeout={Number(searchParams.productReviews) || undefined}
				/>
			</div>
		</>
	);
}

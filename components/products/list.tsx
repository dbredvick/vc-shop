import { Suspense, use } from 'react';
import { ProductCard } from './card';
import { getProducts } from '@/lib/get-products';

interface Props {
	timeout?: number;
}

const Skeleton = () => {
	return (
		<>
			{[...Array(8)].map((_, i) => (
				<div key={i} className='flex animate-pulse flex-col gap-2'>
					<div className='min-h-40 min-w-40 flex aspect-square w-full items-center justify-center rounded-md bg-gray-100' />
					<div className='flex flex-col gap-1'>
						<div className='flex items-center justify-between gap-4'>
							<div className='h-5 w-full rounded-md bg-gray-300' />
							<div className='h-4 w-12 rounded-md bg-gray-300' />
						</div>
						<div className='h-4 w-3/4 rounded-md bg-gray-200' />
						<div className='flex items-center gap-1'>
							{[...Array(5)].map((_, i) => (
								<div key={i} className='h-3 w-3 rounded-full bg-gray-200' />
							))}
						</div>
					</div>
					<div className='grow' />
					<div className='h-[38px] w-[125px] rounded-full bg-gray-300' />
				</div>
			))}
		</>
	);
};

const ProductListUI = async ({ timeout }: Props) => {
	const products = await getProducts(timeout);

	return (
		<>
			{products.items.map((el) => (
				// @ts-expect-error Server Component
				<ProductCard key={el.sys.id} {...el.fields} />
			))}
		</>
	);
};

export default function ProductList(props: Props) {
	return (
		<Suspense fallback={<Skeleton />}>
			{/* @ts-ignore */}
			<ProductListUI {...props} />
		</Suspense>
	);
}

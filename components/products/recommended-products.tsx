import { Suspense } from 'react';
import { getProducts } from '../../lib/get-products';
import slugify from 'slugify';
import Image from 'next/image';
import Link from 'next/link';
import { getImage } from '@/lib/get-image';
import { EcommerceProduct } from '@/types/index';
import type { Asset } from 'contentful';

interface Props {
	slug: string;
	timeout?: number;
}

const Skeleton = () => {
	return (
		<>
			<h3 className='text-2xl font-medium text-typography-primary'>Recommended Products</h3>
			<div className='mb-8 grid w-full grid-cols-1 gap-6 md:grid-cols-3'>
				{[...Array(3)].map((_, i) => (
					<div
						key={i}
						className='flex items-center gap-6 rounded-lg border border-transparent p-1 transition-all hover:border-gray-100 hover:shadow-sm'>
						<div className='relative flex aspect-square h-[160px] w-[160px] items-center justify-center rounded-md bg-gray-100 p-6'>
							<div className='absolute bottom-2 right-2 h-5 w-12 animate-pulse rounded-full bg-gray-400' />
						</div>
						<div className='flex w-full flex-col'>
							<div className='h-6 w-full animate-pulse rounded-md bg-gray-300' />
							<div className='mt-2 h-4 w-full animate-pulse rounded-md bg-gray-200' />
							<div className='mt-1 h-4 w-2/3 animate-pulse rounded-md bg-gray-200' />
						</div>
					</div>
				))}
			</div>
		</>
	);
};

const getRecommendedProducts = async (slug: string, ms = 3000) => {
	const products = await getProducts(ms);
	const slugs = products.items.map(({ fields }) => slugify(fields.name, { lower: true }));

	const index = slugs.indexOf(slug);
	const set = new Set();

	while (set.size < 3) {
		const randomIndex = Math.floor(Math.random() * slugs.length);
		if (randomIndex !== index) {
			set.add(products.items[randomIndex]);
		}
	}
	return [...set];
};

const RecommendedProductsUI = async ({ slug, timeout }: Props) => {
	const data = await getRecommendedProducts(slug, timeout ?? 0);

	const products = await Promise.all(
		data.map(async (el: any) => ({
			...el,
			fields: {
				...el.fields,
				image: await getImage(el.fields.image.sys.id),
			},
		}))
	);

	return (
		<>
			<div className='flex w-full items-center justify-between'>
				<h3 className='text-2xl font-medium text-typography-primary'>Recommended Products</h3>
			</div>
			<div className='mb-8 grid w-full grid-cols-1 gap-6 md:grid-cols-3'>
				{products.map(({ sys, fields }: { sys: any; fields: EcommerceProduct }) => (
					<Link
						key={sys.id}
						href={`/p/${slugify(fields.name, { lower: true })}`}
						className='flex items-center gap-6 rounded-lg border border-transparent p-1 transition-all hover:border-gray-100 hover:shadow-sm'>
						<div className='relative flex aspect-square h-[160px] w-[160px] items-center justify-center rounded-md bg-gray-100 p-6'>
							<Image
								width={50}
								height={50}
								src={((fields.image as unknown as Asset).fields.file.url as string).replace(
									'//',
									'https://'
								)}
								alt={(fields.image as unknown as Asset).fields.title as string}
								className='h-auto w-auto rounded-md object-cover'
							/>
							<span className='absolute bottom-2 right-2 inline-flex items-center rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm'>
								${fields.price}
							</span>
						</div>
						<div>
							<p className='text-lg font-bold text-typography-primary '>{fields.name}</p>
							<p className='text-sm text-neutral-500'>{fields.description}</p>
						</div>
					</Link>
				))}
			</div>
		</>
	);
};

export default function RecommendedProducts(props: Props) {
	return (
		<Suspense fallback={<Skeleton />}>
			{/* @ts-ignore */}
			<RecommendedProductsUI {...props} />
		</Suspense>
	);
}

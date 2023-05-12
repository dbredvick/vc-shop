import { notFound } from 'next/navigation';
import { findProductBySlug } from '../../lib/find-product-by-slug';
import Image from 'next/image';
import { getImage } from '@/lib/get-image';
import type { Asset } from 'contentful';

interface Props {
	slug: string;
}

export default async function ProductDetails({ slug }: Props) {
	const product = await findProductBySlug(slug);
	if (!product) return notFound();

	const asset: Asset = await getImage(product.fields.image.sys.id);

	return (
		<div className='grid grid-cols-1 items-start gap-6 md:grid-cols-2'>
			<div className='flex aspect-square items-center justify-center rounded-xl bg-gray-100'>
				<Image
					width={100}
					height={100}
					src={(asset.fields.file.url as string).replace('//', 'https://')}
					alt={asset.fields.title as string}
					className='h-auto w-auto rounded-md object-cover transition-all group-hover:scale-75'
				/>
			</div>
			<div className='flex flex-col gap-8'>
				<div className='flex items-center justify-between gap-6'>
					<h2 className='text-5xl font-bold'>{product.fields.name}</h2>
					<p className='text-3xl font-bold text-neutral-700'>${product.fields.price}</p>
				</div>
				<p className='text-typography-primary'>
					<span className='text-lg font-medium text-neutral-600'>About this product</span>
					<br />
					<span className=''>{product.fields.summary}</span>
				</p>
			</div>
		</div>
	);
}

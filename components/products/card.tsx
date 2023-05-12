import { StarIcon } from '@heroicons/react/24/solid';
import type { Asset } from 'contentful';
import Image from 'next/image';
import Link from 'next/link';
import slugify from 'slugify';
import AddToCart from './add-to-cart';
import { getImage } from '@/lib/get-image';
import { EcommerceProduct } from '@/types/index';

export const ProductCard = async ({ description, name, price, image }: EcommerceProduct) => {
	const asset: Asset = await getImage(image.sys.id);

	return (
		<div className='relative'>
			<Link href={`/p/${slugify(name, { lower: true })}`} className='group flex h-full flex-col gap-2'>
				<div className='relative flex aspect-square min-h-[160px] w-full min-w-[160px] items-center justify-center rounded-md bg-gray-100 transition-all'>
					<Image
						width={100}
						height={100}
						src={(asset.fields.file.url as string).replace('//', 'https://')}
						alt={asset.fields.title as string}
						className='h-auto w-auto rounded-md object-cover transition-all group-hover:scale-75'
					/>
					<span className='absolute bottom-0 right-4 rounded-md bg-black/60 py-1 px-2 text-xs text-white opacity-0 transition-all group-hover:bottom-4 group-hover:opacity-100'>
						View Details
					</span>
				</div>
				<div className='flex flex-col gap-1'>
					<div className='flex items-center justify-between gap-4'>
						<h3 className='text-sm font-bold text-typography-primary'>{name}</h3>
						<h3 className='text-xs font-bold text-typography-primary'>${price}</h3>
					</div>
					<p className='text-xs text-neutral-500'>{description}</p>
					<div className='flex items-center'>
						{[...Array(5)].map((_, i) => (
							<StarIcon key={i} className='h-3 w-3 text-[#3C9F2C]' />
						))}
						<span className='ml-1 text-xs text-neutral-500'>(121)</span>
					</div>
				</div>
				<div className='grow' />
				<div className='h-[38px]' />
			</Link>
			<AddToCart />
		</div>
	);
};

import { Suspense } from 'react';

import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
// import AddReview from './add-review';
// import MakeMeSlow from './make-me-slow';
import { getProductReviews } from '@/lib/get-product-reviews';

interface Props {
	slug: string;
	timeout?: number;
}

const Skeleton = () => {
	return (
		<>
			<h3 className='text-2xl font-medium text-typography-primary '>Product Reviews</h3>
			<ul className='mb-8 flex w-full flex-col divide-y divide-gray-100'>
				{[...Array(4)].map((_, i) => (
					<li key={i} className='w-full py-3'>
						<div className='flex flex-col gap-2'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center justify-between gap-2'>
									<div className='h-6 w-20 animate-pulse rounded-md bg-gray-400' />
									<div className='flex items-center gap-1'>
										{[...Array(5)].map((_, i) => (
											<div key={i} className='h-3 w-3 rounded-full bg-gray-200' />
										))}
									</div>
								</div>
								<div className='h-4 w-24 animate-pulse rounded-md bg-gray-200' />
							</div>
							<div className='flex flex-col gap-1'>
								<div className='flex items-center gap-2'>
									<div className='h-4 w-1/3 animate-pulse rounded-md bg-gray-300' />
									<div className='h-4 w-1/5 animate-pulse rounded-md bg-gray-300' />
									<div className='h-4 w-1/4 animate-pulse rounded-md bg-gray-300' />
									<div className='h-4 w-1/4 animate-pulse rounded-md bg-gray-300' />
									<div className='h-4 w-1/5 animate-pulse rounded-md bg-gray-300' />
								</div>
								<div className='flex items-center gap-2'>
									<div className='h-4 w-1/4 animate-pulse rounded-md bg-gray-300' />
									<div className='h-4 w-1/3 animate-pulse rounded-md bg-gray-300' />
									<div className='h-4 w-1/5 animate-pulse rounded-md bg-gray-300' />
									<div className='h-4 w-1/5 animate-pulse rounded-md bg-gray-300' />
									<div className='h-4 w-1/4 animate-pulse rounded-md bg-gray-300' />
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>
		</>
	);
};

const getReviews = async (slug: string, ms = 1000) => {
	const reviews = await getProductReviews(slug, ms);
	return reviews.items;
};

const ProductReviewsUI = async ({ slug, timeout }: Props) => {
	const data = await getReviews(slug, timeout ?? 0);

	return (
		<>
			<div className='flex w-full items-center justify-between'>
				<h3 className='text-2xl font-medium text-typography-primary'>
					Product Reviews <span className='text-lg italic'>({data.length})</span>
				</h3>
				<div className='flex items-center gap-2'>
					{/* <AddReview />
					<MakeMeSlow type='productReviews' /> */}
				</div>
			</div>
			<ul className='mb-8 flex w-full flex-col divide-y divide-gray-100'>
				{data.map((el: any) => (
					<li key={el.sys.id} className='w-full py-3'>
						<div className='flex flex-col gap-1'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center justify-between gap-2'>
									<p className='font-medium text-typography-primary'>{el.fields.reviewer}</p>
									<div className='flex items-center'>
										{[...Array(el.fields.starCount)].map((_, i) => (
											<StarIcon key={i} className='h-3 w-3 text-[#3C9F2C]' />
										))}
										{el.fields.starCount < 5 &&
											[...Array(5 - el.fields.starCount)].map((_, i) => (
												<StarIconOutline key={i} className='h-3 w-3 text-gray-600' />
											))}
									</div>
								</div>
								<p className='text-xs text-neutral-600'>{el.fields.date}</p>
							</div>
							<p className='text-sm text-typography-primary'>{el.fields.comment}</p>
						</div>
					</li>
				))}
			</ul>
		</>
	);
};

export default function ProductReviews(props: Props) {
	return (
		<Suspense fallback={<Skeleton />}>
			{/* @ts-ignore */}
			<ProductReviewsUI {...props} />
		</Suspense>
	);
}

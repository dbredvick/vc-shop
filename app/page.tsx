import { FilterPill } from '@/components/filter-pill';
import ProductList from '@/components/products/list';

interface Props {
	searchParams: {
		timeout?: string;
	};
}

export default function Home({ searchParams }: Props) {
	return (
		<>
			<div className='mx-auto flex h-[350px] w-full max-w-6xl items-center justify-between rounded-lg bg-[#FAEEE1] py-6 px-6'>
				<div className='flex flex-col gap-6 px-24'>
					<p className='text-5xl font-bold text-[#133426]'>
						Grab up to 50% Off on <br /> Selected Headphone
					</p>
					<button className='w-max rounded-full bg-[#133426] py-3 px-12 font-medium text-white'>
						Buy Now
					</button>
				</div>
			</div>
			<div className='flex items-center justify-between gap-6 '>
				<div className='flex w-full items-center gap-4 overflow-x-auto '>
					<FilterPill label='Headphone Type' />
					<FilterPill label='Price' />
					<FilterPill label='Reviews' />
					<FilterPill label='Color' />
					<FilterPill label='Material' />
					<FilterPill label='Offer' />
					<FilterPill label='All Filters' icon='AdjustmentsHorizontalIcon' />
				</div>
				<FilterPill label='Sort By' variant='secondary' />
			</div>
			<h2 className='text-2xl font-bold'>Headphones For You!</h2>
			<div className='grid grid-cols-2 gap-8 pb-6 md:grid-cols-4'>
				<ProductList timeout={Number(searchParams.timeout) || undefined} />
			</div>
		</>
	);
}

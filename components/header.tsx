import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';

export const EcommerceHeader = () => {
	return (
		<div className='mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6 sm:px-0'>
			<ul className='flex items-center gap-4'>
				<li className='flex items-center gap-1 font-medium text-typography-primary md:px-6'>
					Categories
					<span>
						<ChevronDownIcon className='h-4 w-4' />
					</span>
				</li>
				<li className='hidden font-medium text-typography-primary md:block md:px-6'>Deals</li>
				<li className='hidden font-medium text-typography-primary md:block md:px-6'>What&apos;s New</li>
				<li className='font-medium text-typography-primary md:px-6'>Delivery</li>
			</ul>
			<div className='flex items-center gap-4'>
				<div className='relative rounded-full bg-gray-100 py-2 px-4 text-typography-primary md:w-[350px]'>
					<input
						placeholder='Search Product'
						className='w-full bg-transparent pr-5 text-sm outline-none placeholder:text-sm'
					/>
					<MagnifyingGlassIcon className='absolute top-3 right-4 h-4 w-4' />
				</div>
				<div className='flex items-center gap-2 text-sm'>
					<UserIcon className='h-4 w-4' />
					Account
				</div>
				<div className='flex items-center gap-2 text-sm'>
					<ShoppingCartIcon className='h-4 w-4' />
					Cart
				</div>
			</div>
		</div>
	);
};

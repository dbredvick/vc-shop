import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function ProductPageLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Link href='/'>
				<div className='flex items-center gap-2 text-gray-600'>
					<ArrowLeftIcon className='h-4 w-4' />
					<span className='text-sm'>Back to Products</span>
				</div>
			</Link>
			{children}
		</>
	);
}

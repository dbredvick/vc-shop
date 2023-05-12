'use client';

export default function AddToCart() {
	const handleClick = () => {
		alert('Added to cart!');
	};

	return (
		<button
			onClick={handleClick}
			className='absolute bottom-0 w-max rounded-full font-medium bg-white text-typography-primary border border-black hover:bg-black hover:text-white py-2 px-6 text-sm'>
			Add to Cart
		</button>
	);
}

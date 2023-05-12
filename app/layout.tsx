import { EcommerceHeader } from '@/components/header';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'RB Shop',
	description: 'Our products are the best in the market',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<div className='mx-auto flex max-w-6xl flex-col gap-8 px-4'>
					<EcommerceHeader />
					{children}
				</div>
			</body>
		</html>
	);
}

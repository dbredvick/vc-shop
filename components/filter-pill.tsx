import { classNames } from '@/lib/classnames';
import { AdjustmentsHorizontalIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

interface Props {
	icon?: keyof typeof icons;
	label: string;
	variant?: 'primary' | 'secondary';
}

export const FilterPill = ({ variant = 'primary', label, icon }: Props) => {
	const Icon = icon ? icons[icon] : ChevronDownIcon;
	const styles =
		variant === 'primary'
			? 'bg-gray-100 text-typography-primary'
			: 'border border-gray-200 text-typography-primary';

	return (
		<div className={classNames('flex min-w-max items-center gap-1 rounded-full py-2 px-3 text-xs', styles)}>
			{label}
			<Icon className='h-4 w-4' />
		</div>
	);
};

const icons = {
	AdjustmentsHorizontalIcon,
};

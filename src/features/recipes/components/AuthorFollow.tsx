import { ButtonUsage } from '@/features/common/components/ui/buttons/MainButton';
import { UserRoundMinus, UserRoundPlus } from 'lucide-react';
import { memo } from 'react';

type Props = {
	isFollowing: boolean;
	loading?: boolean;
	onToggle: () => void;
};

function AuthorFollow({ isFollowing, loading, onToggle }: Props) {
	return (
		<ButtonUsage
			disabled={loading}
			parentMethod={onToggle}
			extraSx={{ ml: 1, p: 0 }}
			icon={isFollowing ? UserRoundMinus : UserRoundPlus}
			iconSx={{ width: 20 }}
		/>
	);
}

export default memo(AuthorFollow);

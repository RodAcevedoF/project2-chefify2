import { type FC, useMemo } from 'react';
import { Avatar } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

type UserAvatarProps = {
	name?: string | null;
	imgUrl?: string | null;
	size?: number;
	sx?: SxProps<Theme>;
};

function nameToColor(name: string) {
	let h = 0;
	for (let i = 0; i < name.length; i++) {
		h = (h * 31 + name.charCodeAt(i)) % 360;
	}
	return `hsl(${h}, 60%, 40%)`;
}

function getInitial(name?: string | null, fallback = 'U') {
	const raw = (name ?? '').toString().trim();
	if (!raw) return fallback;
	const first = Array.from(raw)[0] ?? fallback;
	return first.toLocaleUpperCase();
}

const UserAvatar: FC<UserAvatarProps> = ({ name, imgUrl, size = 64, sx }) => {
	const bg = useMemo(() => nameToColor(name ?? 'U'), [name]);
	const initial = useMemo(() => getInitial(name), [name]);

	return (
		<Avatar
			src={imgUrl ?? undefined}
			sx={{
				width: size,
				height: size,
				mb: 1,
				bgcolor: bg,
				color: 'white',
				fontWeight: 700,
				fontSize: Math.floor(size * 0.4),
				...(sx ?? ({} as SxProps<Theme>)),
			}}>
			{initial}
		</Avatar>
	);
};

export default UserAvatar;

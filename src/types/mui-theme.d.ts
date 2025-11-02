import '@mui/material/styles';

declare module '@mui/material/styles' {
	interface TypeBackground {
		gradient: string;
		lightGradient: string;
	}

	interface PaletteBackground {
		gradient?: string;
		lightGradient?: string;
	}

	interface PaletteOptions {
		background?: Partial<TypeBackground> | Partial<PaletteBackground>;
	}
}

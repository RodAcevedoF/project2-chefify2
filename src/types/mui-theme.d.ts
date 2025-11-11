import '@mui/material/styles';

declare module '@mui/material/styles' {
	interface TypeBackground {
		gradient: string;
		lightGradient?: string;
		semitransparent?: string;
	}

	interface PaletteOptions {
		background?: Partial<TypeBackground>;
	}
	interface Palette {
		background: TypeBackground;
	}
}

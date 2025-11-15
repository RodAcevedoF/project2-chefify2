import '@mui/material/styles';

declare module '@mui/material/styles' {
	interface TypeBackground {
		gradient: string;
		lightGradient?: string;
		semitransparent?: string;
		chartLikes?: string;
	}

	interface Success {
		selected?: string;
	}

	interface PaletteOptions {
		background?: Partial<TypeBackground>;
		success?: Partial<Success>;
	}
	interface SimplePaletteColorOptions {
		selected?: string;
	}
	interface Palette {
		background: TypeBackground;
		success: Success;
	}
}

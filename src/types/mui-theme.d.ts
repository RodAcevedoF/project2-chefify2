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

	interface SimplePaletteColor {
		selected: string;
	}

	interface PaletteColor {
		selected: string;
	}

	interface PaletteColorOptions {
		glass?: string;
	}
	interface Palette {
		background: TypeBackground;
		success: Success;
		primary: PaletteColorOptions;
	}
}

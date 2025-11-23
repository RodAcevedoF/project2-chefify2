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
		brightBorder?: string;
	}

	interface PaletteOptions {
		background?: Partial<TypeBackground>;
		success?: Partial<Success>;
		boxColors?: BoxColors;
		borders?: Borders;
	}
	interface SimplePaletteColorOptions {
		selected?: string;
	}

	interface SimplePaletteColor {
		selected: string;
	}

	interface PaletteColor {
		selected: string;
		brightBorder: string;
	}

	interface PaletteColorOptions {
		glass?: string;
		brightBorder: string;
	}

	interface BoxColors {
		main: string;
		light?: string;
		dark?: string;
		primary?: string;
		secondary?: string;
		tertiary?: string;
	}

	interface Borders {
		bright: string;
		transparent: string;
	}
	interface Palette {
		background: TypeBackground;
		success: Success;
		primary: PaletteColorOptions;
		boxColors: BoxColors;
		borders: Borders;
	}
}

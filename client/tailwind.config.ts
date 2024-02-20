import type { Config } from "tailwindcss";

export default {
	content: ["./src/**/*.{html,ts}"],
	theme: {
		extend: {
			fontFamily: {
				cursive: ["Nanum Pen Script", "cursive"],
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
} satisfies Config;

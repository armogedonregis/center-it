import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        main_bg_with_noise: "linear-gradient(180deg, #050C26 0%, #171E37 100%), url('/assets/images/noise_bg.png')",
        header_bg: "linear-gradient(90deg, #050C26 0%, #02081F 100%)",
        main_bg: "linear-gradient(180deg, #050C26 0%, #171E37 100%)",
        footer_bg: "linear-gradient(90deg, #050C26 0%, #02081F 100%)",
        main_feature_bg:
          "linear-gradient(0deg, #F6F9FF, #F6F9FF), linear-gradient(180deg, #F6F9FF 0%, #C7CCE4 100%)",
        second_bg: "linear-gradient(180deg, #C7CCE4 0%, #F6F9FF 100%)", 
        main_card_bg: "linear-gradient(285.67deg, #181F38 0%, #242B47 100%)",
        main_card_bg_second: "linear-gradient(285.67deg, rgba(24, 31, 56, 0.8) 0%, rgba(36, 43, 71, 0.8) 100%)",
        button_red: "linear-gradient(225.2deg, #BE3021 0%, #F27D71 100%)",
        about_card_bg: "linear-gradient(285.67deg, #0F1630 0%, #45548F 100%), linear-gradient(285.67deg, #181F38 0%, #242B47 100%)",
        circle_bg: "linear-gradient(225.2deg, #BE3021 0%, #F27D71 100%)",
      },
      colors: {
        color_red: "#BE3021",
        color_red_second: "#F27D71",
        color_black: "#1B1C21",
        color_input: "#0C1328",
        color_gray: "#7C8196"
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)' },
          '100%': { transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
    container: {
      center: true,
      padding: "20px",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1100px",
      },
    },
  },
  plugins: [],
} satisfies Config;

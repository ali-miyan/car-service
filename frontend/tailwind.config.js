// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "bai-regular": ["bai regular"],
        "bai-medium": ["bai medium"],
        "bai-light": ["bai light"],
        "bai-extra-light": ["bai extra light"],
        "bai-semi-bold": ["bai semi bold"],
        "bai-bold": ["bai bold"],
      },
      animation: {
        "pulse-fast": "pulse-fast 1s infinite",
      },
      keyframes: {
        "pulse-fast": {
          "0%": { backgroundColor: "#b0bec5" }, // Lighter gray-blue
          "50%": { backgroundColor: "#78909c" }, // Darker gray-blue
          "100%": { backgroundColor: "#b0bec5" }, // Lighter gray-blue
        },
      },
    },
  },
  plugins: [],
});

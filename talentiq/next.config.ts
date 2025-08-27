import type { NextConfig } from "next";
import withPWA from "next-pwa";

const baseConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-select",
      "@radix-ui/react-toast",
      "@radix-ui/react-popover",
    ],
  },
};

const withPWAWrapped = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

export default withPWAWrapped(baseConfig);

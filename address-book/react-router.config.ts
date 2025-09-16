import { type Config } from "@react-router/dev/config";

export default {
  ssr: true,
  prerender: ["/about", "/edit-contact"],
} satisfies Config;

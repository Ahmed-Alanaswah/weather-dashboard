import { defineStore } from "pinia";

export type Theme = "light" | "dark";

export const useUiStore = defineStore("ui", {
  state: () => ({
    theme:
      ((typeof window !== "undefined" &&
        localStorage.getItem("theme")) as Theme | null) || ("dark" as Theme),
  }),
  actions: {
    toggleTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark";
      try {
        if (typeof window !== "undefined")
          localStorage.setItem("theme", this.theme);
      } catch (e) {
        // ignore
      }
    },
    setTheme(t: Theme) {
      this.theme = t;
      try {
        if (typeof window !== "undefined")
          localStorage.setItem("theme", this.theme);
      } catch (e) {
        // ignore
      }
    },
  },
});

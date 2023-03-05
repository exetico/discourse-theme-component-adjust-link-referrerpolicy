import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "link-referrerpolicy-init",
  initialize(container) {
    withPluginApi("0.8.41", (api) => {
      const ignoredDomains = /(amazon|amazn)/g;
      const isNoRefPolicyLink = (link) => {
        let href = link.getAttribute("href")
          ? link.getAttribute("href").toLowerCase()
          : false;

        if (href) {
          return ignoredDomains.test(href) ? true : false;
        } else {
          return false;
        }
      };

      api.decorateCookedElement(
        (post) => {
          post.querySelectorAll("a").forEach((i) => {
            if (isNoRefPolicyLink(i)) {
              return false;
            }
            i.setAttribute("referrerpolicy", "same-origin");
          });
        },
        { id: "link-referrerpolicy-adjust" }
      );
    });
  },
};

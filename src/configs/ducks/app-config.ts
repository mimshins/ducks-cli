import { SocialType, socialTitleMap } from "@/constants";
import type { Social } from "@/types";
import type { DucksConfig } from "@shared-types";
import appConfigJson from "./app.config.json";
import type { AppConfig } from "./types";

const createSocials = (socialUrlMap: Record<string, string> = {}) => {
  const socials: Social[] = [];

  if ("twitter" in socialUrlMap) {
    socials.push({
      title: socialTitleMap[SocialType.TWITTER],
      type: SocialType.TWITTER,
      url: socialUrlMap.twitter,
    });
  }

  if ("github" in socialUrlMap) {
    socials.push({
      title: socialTitleMap[SocialType.GITHUB],
      type: SocialType.GITHUB,
      url: socialUrlMap.github,
    });
  }

  return socials;
};

const { name, description, socials, sidebar } = appConfigJson as DucksConfig;

const appConfig: AppConfig = {
  name,
  description,
  sidebar,
  socials: createSocials(socials),
};

export default appConfig;

import { SocialType, socialTitleMap } from "@/constants";
import type { Social } from "@/types";
import appConfigJson from "./ducks.config.json";

type Config = {
  name: string;
  description: string;
  socials: Social[];
};

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

const config: Config = {
  name: appConfigJson.name,
  description: appConfigJson.description,
  socials: createSocials(appConfigJson.socials),
};

export default config;

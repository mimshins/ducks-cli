import { mdiGithub, mdiTwitter } from "@mdi/js";

export enum SocialType {
  TWITTER = "TWITTER",
  GITHUB = "GITHUB",
}

export const socialIconPathsMap: Record<SocialType, string> = {
  [SocialType.TWITTER]: mdiTwitter,
  [SocialType.GITHUB]: mdiGithub,
};

export const socialTitleMap: Record<SocialType, string> = {
  [SocialType.TWITTER]: "Twitter",
  [SocialType.GITHUB]: "GitHub",
};

import { ImageConstants } from "./imagesConstant";

/**
 * Below are the competition catagories that are used for payment status.
 */
const cp = "Competitive Programming";
const sd = "Software Development";
const ud = "UI/UX Design";

export const CompetitionCategoriesConstant = { cp, sd, ud };


export const CategoriesImage = {
    [CompetitionCategoriesConstant.cp]: ImageConstants.py3DLogo,
    [CompetitionCategoriesConstant.sd]: ImageConstants.js3DLogo,
    [CompetitionCategoriesConstant.ud]: ImageConstants.figma3DLogo,
  };
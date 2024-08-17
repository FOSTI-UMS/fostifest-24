/**
 * Below are the rul that are used in the apps.
 */
const storageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1`;
const paymentImageUrl = `${storageUrl}/object/public/`;

export const UrlConstant = { storageUrl, paymentImageUrl };

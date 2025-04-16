import dotenv from 'dotenv';
import getDomain from '../helper/getDomain';
dotenv.config();
export const generateContent = async (
  link: string,
  title: string,
  type: string,
  tags: string[]
) => {
  let titleData = title;
  let contentData = '';
  let contentTypeData = '';
  const linkPreview = await fetch(
    `https://api.linkpreview.net/?key=${process.env.LINK_PREVIEW_API_KEY}&q=${link}`
  );
  const linkPreviewData = await linkPreview.json();
  if (linkPreviewData.error) {
    contentData = link;
    contentTypeData = 'text';
  }
  if (type === 'videos' || type === 'tweets') {
    titleData = title || linkPreviewData?.title;
    contentData = linkPreviewData?.image || linkPreviewData?.description;
    contentTypeData = 'image';
  }

  return {
    link,
    title: titleData || getDomain(link),
    content: contentData,
    contentType: contentTypeData || 'empty',
    type,
    tags,
  };
};

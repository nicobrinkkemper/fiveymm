import { startDate } from "levelData";
import React from "react";
import Helmet from "react-helmet";
import { BASE_URL, DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "./constants";


const absoluteUrl = (path: string) => `${BASE_URL}${path}`;

type getMetaTagsProps = {
  title: string;
  description: string;
  url: string;
  contentType: string;
  published: string;
  updated: string;
  category: string;
  tags: string[];
  twitter: string;
  image: string;
};
const getMetaTags = ({
  title,
  description,
  url,
  contentType,
  published,
  updated,
  category,
  tags,
  twitter,
  image
}: getMetaTagsProps) => {
  const metaTags = [
    { itemprop: "name", content: title },
    { itemprop: "description", content: description },
    { name: "description", content: description },
    { name: "twitter:title", content: `${title} | ${BASE_URL}` },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: '@bbmariomaker2' },
    { name: "og:title", content: `${title} | ${BASE_URL}` },
    { name: "og:type", content: contentType },
    { name: "og:url", content: url },
    { name: "og:description", content: description },
    { name: "og:site_name", content: `${BASE_URL}` },
    { name: "og:locale", content: "en_EN" },
  ];

  if (published)
    metaTags.push({ name: "article:published_time", content: published });
  if (updated)
    metaTags.push({ name: "article:modified_time", content: updated });
  if (category) metaTags.push({ name: "article:section", content: category });
  if (tags) metaTags.push({ name: "article:tag", content: tags.join(",") });
  if (image) {
    metaTags.push({ itemprop: "image", content: absoluteUrl(image) });
    metaTags.push({ name: "twitter:image", content: absoluteUrl(image) });
    metaTags.push({ name: "og:image", content: absoluteUrl(image) });
    metaTags.push({ name: "twitter:card", content: twitter });
    metaTags.push({ name: "twitter:image:alt", content: title });
  } else {
    metaTags.push({ name: "twitter:card", content: twitter });
  }

  return metaTags;
};

type getHtmlAttributesProps = {
  schema?: string;
};
const getHtmlAttributes = ({ schema }: getHtmlAttributesProps) => {
  let result = {
    lang: "en"
  };
  if (schema) {
    return {
      ...result,
      itemscope: undefined,
      itemtype: `http://schema.org/${schema}`
    };
  }
  return result;
};

type SeoProps = {
  schema?: string;
  title?: string;
  description?: string;
  path?: string;
  contentType?: string;
  published?: string;
  updated?: string;
  category?: string;
  tags?: string[];
  twitter?: string;
  image?: string;
};
type getLinkTagsProps = {
  path: string
}
const getLinkTags = ({path}:getLinkTagsProps)=>[
  { name: "viewport", content: `width=device-width, initial-scale=1`},
  { rel: "canonical", href: absoluteUrl(path) },
  { rel: "icon", href: `${absoluteUrl(path)}favicon.ico`},
  { rel: "icon", sizes:"16x16", href: `${absoluteUrl(path)}favicon-16x16.png`},
  { rel: "icon", sizes:"32x32", href: `${absoluteUrl(path)}favicon-32x32.png`},
  { rel: "icon", sizes:"96x96", href: `${absoluteUrl(path)}favicon-96x96.png`},
  { rel: "msapplication-square70x70logo", content: `${absoluteUrl(path)}ms-icon-70x70.png` },
  { rel: "msapplication-square150x150logo", content: `${absoluteUrl(path)}ms-icon-150x150.png` },
  { rel: "msapplication-square310x310logo", content: `${absoluteUrl(path)}ms-icon-310x310.png` },
  { rel: "msapplication-TileColor", content: `#F6F7F8` },
  { rel: "theme-color", content: `#F6F7F8` },
]
const Seo = ({
  schema,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "",
  contentType = "image/png",
  published = startDate.toDateString(),
  updated = new Date(Date.now()).toDateString(),
  category = 'gaming',
  tags = [DEFAULT_TITLE,'MarioMaker2'],
  twitter = "summary",
  image = "android-chrome-512x512.png"
}: SeoProps) => (
  <Helmet
    htmlAttributes={getHtmlAttributes({
      schema
    })}
    title={title}
    link={getLinkTags({path})}
    meta={getMetaTags({
      title,
      description,
      contentType,
      url: absoluteUrl(path),
      published,
      updated,
      category,
      tags,
      twitter,
      image
    })}
  />
);

export { Seo };
export default Seo;

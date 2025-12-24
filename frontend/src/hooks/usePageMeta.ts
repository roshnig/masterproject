import { useEffect } from "react";

/******* NOT USING ************
 * because after adding page data all tests were failing. I wasn't sure how to add meta in tests so removed from each page
 * *****************/
interface pageMetaProps {
  title?: string; //will display in browser tab
  description?: string; // will display in google serch result list desc
  //keywords?: string[]; //search keywords
  // ogTitle?: string; //open graph title - for social media sites search analytics
  // ogDescription?: string; //open graph desc - for search analytics
  // ogImage?: string; //open graph image
  // ogUrl?: string; //open graph url
}

const usePageMeta = ({
  title = "my org",
  description = "my org",
  // keywords = [],
  // ogTitle,
  // ogDescription,
  // ogImage,
  // ogUrl,
}: pageMetaProps) => {
  useEffect(() => {
    document.title = title;

    //set meta tag for each of prop
    setMetaTag("name", "description", description);
    // setMetaTag("name", "keywords", keywords.toString()); //not sure
    // setMetaTag("property", "og:title", ogTitle || title);
    // setMetaTag("property", "og:description", ogDescription || description);
    // setMetaTag("property", "og:image", ogImage || "");
    // setMetaTag("property", "og:url", ogUrl || window.location.href);
    // }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl]);
  }, [title, description]);

  //function to set each metadata prop
  const setMetaTag = (attr: string, key: string, content: string) => {
    if (content) {
      let element = document.querySelector(`meta[${attr}=${key}]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    }
  };
};

export default usePageMeta;

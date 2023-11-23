/* eslint-disable @next/next/no-img-element */
// import Image, { ImageProps } from "next/image";
import { A, HrefType } from "../common";
import mapChildren from "@/utils/mapChildren";
import { isString } from "lodash";
import IconFont from "../common/IconFont";
import { ImgHTMLAttributes } from "react";

type RelationProps = {
  title: string;
  link: HrefType;
  tags: { icon: React.ReactNode; label: string }[];
  logo: ImgHTMLAttributes<HTMLImageElement>;
  content: React.ReactNode;
};

export function Relation(props: RelationProps) {
  const { logo, title, link, tags, content } = props;
  return (
    <div
      data-testid="Realtion"
      className="border border-[#ccc] rounded-lg px-2 pt-2 md:px-4 first:mt-0 mt-4"
    >
      <div className="block sm:flex sm:items-start">
        {/* <Image width={70} height={70} {...logo} alt={logo.alt || title} /> */}
        <img
          className="my-0 mr-4 float-left sm:float-none"
          width={70}
          height={70}
          {...logo}
          alt={logo.alt || title}
        />
        <div>
          <A href={link} className="underline hover:no-underline">
            <h5>{title}</h5>
          </A>

          {tags && tags.length ? (
            <div
              data-testid="tags"
              className="flex flex-wrap gap-1 w-full pt-2 sm:pt-0 sm:w-auto"
            >
              {mapChildren(tags, ({ item, key }) => (
                <span
                  key={key}
                  className="py-px px-1.5 text-12 rounded-xl inline-flex items-center text-[#bebebe] bg-[#24292e] shadow-[inset 0 0 0 1px #444d56]"
                >
                  {isString(item.icon) ? (
                    <IconFont className="mr-1" type={item.icon as any} />
                  ) : (
                    item.icon
                  )}
                  {item.label}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div data-testid="Relation-Content">{content}</div>
    </div>
  );
}

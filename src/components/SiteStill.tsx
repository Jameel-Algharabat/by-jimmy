type SiteStillProps = {
  src: string;
  alt: string;
  caption?: string;
  ratio?: "wide" | "page" | "mobile";
};

export function SiteStill({ src, alt, caption, ratio = "wide" }: SiteStillProps) {
  const frame =
    ratio === "mobile"
      ? "mx-auto max-w-[390px] overflow-hidden bg-ash"
      : ratio === "page"
        ? "overflow-hidden bg-ash"
        : "aspect-[16/9] overflow-hidden bg-ash";

  return (
    <figure>
      <div className={`${frame} group`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={
            ratio === "wide"
              ? "h-full w-full object-cover object-top transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
              : "block w-full"
          }
        />
      </div>
      {caption ? <figcaption className="type-meta mt-4 text-fog">{caption}</figcaption> : null}
    </figure>
  );
}

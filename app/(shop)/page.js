import Hero from "../(components)/home/hero/Hero";
import CollectionSection from "../(components)/home/collection-sec/CollectionSection";
import BannarSection from "../(components)/home/bannar-sec/BannarSection";
import BlogSection from "../(components)/home/blog-sec/BlogSection";
import FollowusSection from "../(components)/home/followus-sec/FollowusSection";
import { getProducts } from "@/services/products/getProducts";

export default function Home() {
  return (
    <section>
      <main>
        <Hero />
        <CollectionSection
          imgSrc={"/imgs/bannar1.webp"}
          title={"for women's collection"}
          text={
            "Contemporary, minimal and modern designs embody the Lavish Alice handwriting"
          }
        />
        <BannarSection />
        <CollectionSection
          imgSrc={"/imgs/banner3.webp"}
          title={"for men's collection"}
          text={
            "Contemporary, minimal and modern designs embody the Lavish Alice handwriting"
          }
          reverse={true}
        />
        <BlogSection />
        <FollowusSection />
      </main>
    </section>
  );
}

import Image from "next/image";
import SubHeader from "./(components)/sub-header/SubHeader";
import Header from "./(components)/header/Header";
import Hero from "./(components)/hero/Hero";
import CollectionSection from "./(components)/collection-sec/CollectionSection";

export default function Home() {
  return (
    <section>
      <main>
        <Hero />
        <CollectionSection imgSrc={"/imgs/bannar1.webp"} title={"for women's collection"} text={"Contemporary, minimal and modern designs embody the Lavish Alice handwriting"} />
      </main>
    </section>
  );
}

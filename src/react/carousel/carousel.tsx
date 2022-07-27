import React from "react";
import { LinkSection, SectionElem } from "../section/linkSection";
import "./carousel.scss";

export function Carousel({ objects }: { objects: SectionElem[] }) {
  return (
    <div className="carousel">
      <button
        className="main__page-button page-button-l"
        onClick={() => orderSwitchBlock("left", "carouselBody")}
      >
        ←
      </button>
      <section className="main__body-carousel body-carousel">
        <div id="carouselBody" className="body-carousel__wrapeer body-wrapper">
          {Array.from(objects, (object: SectionElem, index: number) => 
            <LinkSection params={object} order={index} />
          )}
        </div>
      </section>
      <button
        className="main__page-button page-button-r"
        onClick={() => orderSwitchBlock("right", "carouselBody")}
      >
        →
      </button>
    </div>
  );
}
// TODO: changed to carusel with transform
function orderSwitchBlock(side: "left" | "right", id: string) {
  const wrapper = document.getElementById(id) as HTMLElement;
  const elements = wrapper.children as HTMLCollectionOf<HTMLElement>;

  Array.from(elements).forEach((element) => {
    let newOrder = Number.parseInt(element.style.order);

    if (side === "left") {
      newOrder++;
      newOrder = newOrder === elements.length ? 0 : newOrder;
    } else {
      newOrder--;
      newOrder = newOrder === -1 ? elements.length - 1 : newOrder;
    }
    element.style.order = newOrder.toString();
  });
}

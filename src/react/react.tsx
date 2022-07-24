import React from "react";
import { createRoot } from "react-dom/client";
import { Carousel } from "./carousel/carousel";
import "../styles/local_styles.scss";
import data from "../assets/src-data.json";

function App({ title }: { title: string }) {
  return (
    <main className="main">
      <Carousel objects={data} />
    </main>
  );
}

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App title={"Hello React"} />);

import React from "react";
import s from "./index.module.css";
import defaultThumb from "./defaultThumb.jpg";

function Preview() {
  return (
    <div className={s.full}>
      <div className={s.pictureWrapperFull}>
        <img
          className={s.picture}
          src={defaultThumb}
          alt="img"
          id="previewImg"
        />
      </div>
      <div className={s.textBlock}>
        <div className={s.textBlockTitle}>
          <a href="article">title</a>
          <a href="article" className={s.comment}>
            25
          </a>
        </div>
        <a href="hgh" className={s.title}>
          Title
        </a>
        <p className={s.spoiler}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim autem id
          quos reprehenderit labore? Repellendus tempora quia, libero tenetur
          minima similique. Numquam dolorem harum vero laudantium sint
          reprehenderit quos obcaecati!
          <a>More...</a>
        </p>
      </div>
    </div>
  );
}

export default Preview;

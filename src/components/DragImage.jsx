import { forwardRef, useEffect } from "react";
import Image from "./layouts/Image";
import Overlay from "./layouts/Overlay";

const DragImage = forwardRef(( 
    { 
      src, 
      alt, 
      faded, 
      index, 
      style, 
      selected, 
      overlay, 
      selectColor, 
      onChangeImg, 
      isDragging, 
      ...props 
    }, 
    ref 
  ) => {

    useEffect(() => {
      const checkboxMouseDownHandler = (event) => event.stopPropagation();
      const checkbox = document.getElementById(`id${index}`);
      checkbox.addEventListener("mousedown", checkboxMouseDownHandler);
      checkbox.addEventListener("touchstart", checkboxMouseDownHandler);

      return () => {
        checkbox.removeEventListener("mousedown", checkboxMouseDownHandler);
        checkbox.removeEventListener("touchstart", checkboxMouseDownHandler);
      };
    }, [index]);

    return (
      <div
        ref={ref}
        {...props}
        style={{
          opacity: faded ? "0.2" : "1",
          transformOrigin: "0 0",
          ...style,
        }}
        className="relative overflow-hidden border border-gray-400 rounded-lg cursor-move group first:col-span-2 first:row-span-2 first:w-full first:h-full"
      >
        <Image 
          src={src} 
          alt={alt} 
          isDragging={isDragging} 
        />
        <Overlay
          index={index}
          overlay={overlay}
          selected={selected}
          isDragging={isDragging}
          selectColor={selectColor}
          onChangeImg={onChangeImg}
        />
      </div>
    );
  }
);

export default DragImage;
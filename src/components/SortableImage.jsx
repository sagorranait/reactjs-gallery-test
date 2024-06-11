import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragImage from "./DragImage";

const SortableImage = (props) => {
  const sortable = useSortable({ id: props?.url });
  const { attributes, listeners, isDragging, setNodeRef, transform, transition } = sortable;

  return (
    <DragImage
      {...props}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      src={props?.url}
      alt={props?.alt}
      isDragging={isDragging}
      selected={props?.selected}
      onChangeImg={props?.onChangeImg}
      selectColor={props?.selectColor}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    />
  );
};

export default SortableImage;
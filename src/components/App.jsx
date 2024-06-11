import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import data from '../data/index';

import DragImage from './DragImage';
import SortableImage from './SortableImage';
import UploadImage from './layouts/UploadImage';

const App = () => {
  const [images, setImages] = useState(data);
  const [imageId, setImageId] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectAllImages, setSelectAllImages] = useState(false);

  const selectImageHandler = (index) => {
    let selected = [...selectedImages];
    let unSelect = selected.indexOf(index);
    if (unSelect != -1) {
      selected.splice(unSelect, 1);
    } else {
      selected.push(index);
    }
    setSelectedImages(selected);
  };

  const ImageDeleteHandler = () => {
    const updateImages = items.filter((value) => !selectedImages.includes(value));
    setImages(updateImages);
    setSelectedImages([]);
  };

  const selectAllImagesHandler = () => {
    if (allSelect) {
      setSelectAllImages(false);
      setSelectedImages([]);
    } else {
      setSelectAllImages(true);
      setSelectedImages(items);
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );
  
  const DragEndHandler = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setImages((items) => {
        return arrayMove(items, items.indexOf(active.id), items.indexOf(over.id));
      });
    }

    setImageId(null);
  }

  const DragStartHandler = (event) => setImageId(event.active.id);
  const DragCancelHandle = () => setImageId(null);

  return (
    <div className="grid min-h-[100dvh] bg-sky-100 items-center py-8">
      <div className="container">
        <div className="w-full max-w-5xl m-auto pb-10 bg-white rounded-lg shadow">
          {/* Hearder Start */}
          <div className="flex items-center px-3 py-6 mb-3 capitalize border-b sm:px-10 ">
            <h2 className="flex items-center w-1/2 text-lg font-semibold sm:text-xl">Responsive Image Gallery</h2>          
            <span className="w-1/2 font-medium text-red-600 cursor-pointer text-end hover:underline">delete files</span>
          </div>
          {/* Hearder End */}
          <DndContext 
            sensors={sensors} 
            collisionDetection={closestCenter} 
            onDragStart={DragStartHandler} 
            onDragEnd={DragEndHandler} 
            onDragCancel={DragCancelHandle}
          >
            <SortableContext items={images} strategy={rectSortingStrategy}>
              <div className="grid w-full grid-cols-2 gap-4 px-3 sm:px-10 sm:grid-cols-4 xl:grid-cols-5">
                { images.map((url, index) => 
                  <SortableImage
                    key={url}
                    url={url}
                    alt={`image-${index}`}
                    index={index}
                    onChangeImg={() => selectImageHandler(url)}
                    selected={ selectedImages.includes(url) ? true : false }
                    selectColor={ selectedImages.includes(url) ? "bg-[#ffffff8f] visible opacity-100" : "bg-[#82828283] invisible opacity-0" }
                  />               
                )}
                <UploadImage fixHeight={images.length == 0 && true} />            
              </div>
            </SortableContext>
            <DragOverlay adjustScale={true}>
              { imageId ? <DragImage src={imageId} index={images.indexOf(imageId)} overlay={true} /> : null }
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
}

export default App;
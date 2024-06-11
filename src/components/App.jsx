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
import Header from './Header';

const App = () => {
  const [images, setImages] = useState(data);
  const [imageId, setImageId] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectAllImages, setSelectAllImages] = useState(false);

  // Handle the image selection and deselecting
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

  // Delete selected images by clicking on the delete button
  const ImageDeleteHandler = () => {
    const updateImages = images.filter((value) => !selectedImages.includes(value));
    setImages(updateImages);
    setSelectedImages([]);
  };

  // Select all images by clicking on header check input
  const selectAllImagesHandler = () => {
    if (selectAllImages) {
      setSelectAllImages(false);
      setSelectedImages([]);
    } else {
      setSelectAllImages(true);
      setSelectedImages(images);
    }
  };

  // Using mouse and touch sensor for drag and drop functionality
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );
  
  // Handle the drag end event
  const DragEndHandler = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setImages((items) => {
        return arrayMove(items, items.indexOf(active.id), items.indexOf(over.id));
      });
    }

    setImageId(null);
  }

  // Handle the drag start event
  const DragStartHandler = (event) => setImageId(event.active.id);
  // Handle the drag cancel event
  const DragCancelHandle = () => setImageId(null);

  return (
    <div className="grid min-h-[100dvh] bg-sky-100 items-center py-8">
      <div className="container">
        <div className="w-full max-w-5xl m-auto pb-10 bg-white rounded-lg shadow">
          <Header 
            length={selectedImages.length}
            ImageDeleteHandler={ImageDeleteHandler}
            selectAllImagesHandler={selectAllImagesHandler}
          />
          {/* Image Gallery Start */}
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
          {/* Image Gallery End */}
        </div>
        <p className='text-center pt-5 text-sm text-gray-600'>©2024 Sagor Rana. React JS Developer Test</p>
      </div>
    </div>
  );
}

export default App;
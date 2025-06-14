"use client";

import { ImageUpload } from "@/types/imageUpload";
import { Button } from "./ui/button";
import { useRef } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { MoveIcon, XIcon } from "lucide-react";
type Props = {
  images?: ImageUpload[];
  onImagesChange: (images: ImageUpload[]) => void;
  imageUrlFormatter?: (images: ImageUpload) => string;
};
const MultiImageUploader = ({
  images = [],
  onImagesChange,
  imageUrlFormatter,
}: Props) => {
  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file, index) => {
      return {
        id: `${Date.now()}-${index}-${file.name}`,
        url: URL.createObjectURL(file),
        file,
      };
    });

    onImagesChange([...images, ...newImages]);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = [...images];

    // Delete the gragged image from items, store that item in the reOrderedImage
    const [reOrderedImage] = items.splice(result.source.index, 1);

    // Insert the gragged item into items
    items.splice(result.destination.index, 0, reOrderedImage);

    onImagesChange(items);
  };

  const handleDelete = (id: string) => {
    const updatedImages = images.filter((img) => img.id !== id);
    onImagesChange(updatedImages);
  };
  return (
    <div className="w-full max-w-[900px] flex flex-col justify-center py-4 px-8 gap-4">
      <input
        type="file"
        multiple
        accept="image/*"
        ref={uploadInputRef}
        className="hidden"
        onChange={handleInputChange}
      />
      <Button
        className="w-full"
        variant="outline"
        type="button"
        onClick={() => {
          uploadInputRef?.current?.click();
        }}
      >
        Upload Images
      </Button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="property-images" direction="vertical">
          {(provided) => {
            return (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {images.map((image, i) => (
                  <Draggable key={image.id} draggableId={image.id} index={i}>
                    {(provided) => {
                      return (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="relative py-2 "
                        >
                          <div className="bg-gray-100 rounded-lg flex items-center overflow-hidden gap-2">
                            <div className="size-16 relative">
                              <Image
                                src={
                                  imageUrlFormatter
                                    ? imageUrlFormatter(image)
                                    : image.url
                                }
                                alt=""
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <p className="text-sm font-medium">
                                Image {i + 1}
                              </p>
                              {i === 0 && (
                                <Badge variant="success">Feature Image</Badge>
                              )}
                            </div>
                            <div className="flex items-center p-2">
                              <button
                                className="cursor-pointer text-red-500 p-2"
                                type="button"
                                onClick={() => {
                                  handleDelete(image.id);
                                }}
                              >
                                <XIcon />
                              </button>
                              <div className="text-gray-500">
                                <MoveIcon />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default MultiImageUploader;

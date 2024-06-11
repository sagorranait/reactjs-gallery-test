const UploadImage = ({ fixHeight }) => {
  return (
    <div className = {`min-h-[160px] min-w-[160px] border-4 border-dotted rounded-lg ${ fixHeight ? "sm:min-w-[160px] sm:min-h-[160px]" : "sm:min-w-[0px] sm:min-h-[0px]"} `}>
      <label
        htmlFor="drop-file"
        className="flex flex-col items-center justify-center w-full h-full font-semibold capitalize cursor-pointer gap-y-4 "
      >
        <p>Add Image</p>
        <input type="file" name="gallery-img" id="drop-file" hidden />
      </label>
    </div>
  );
};

export default UploadImage;

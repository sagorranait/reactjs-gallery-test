const Overlay = (props) => {
  const { selectColor, isDragging, index, onChangeImg, overlay, selected } = props;

  return (
    <label className={`group-hover:visible group-hover:opacity-100 absolute top-0 left-0 w-full h-full transition-all ${selectColor} ${isDragging ? "hidden" : "block"}`}>
      <input
        type="checkbox"
        value={index}
        onChange={onChangeImg}
        checked={selected}
        id={`id${index}`}
        className={`sm:w-6 sm:h-6 w-5 h-5 translate-x-4 translate-y-4 border-none rounded cursor-pointer outline-transparent ${ overlay ? "invisible" : "visible" } `}
      />
    </label>
  );
};

export default Overlay;
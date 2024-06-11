const Image = (props) => {
  const { isDragging, src, alt } = props;

  return (
    <picture>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`object-cover w-full h-full bg-white ${ isDragging ? "invisible" : "visible"}}`}
      />
    </picture>
  );
};

export default Image;
const Header = (props) => {
  const { length, selectAllImagesHandler, ImageDeleteHandler } = props;
  
  return (
    <div className="flex items-center px-3 py-6 mb-3 capitalize border-b sm:px-10 ">
    <h2 className="flex items-center w-1/2 text-lg font-semibold sm:text-xl">
      { length !== 0 && 
        <input
          type="checkbox"
          onChange={selectAllImagesHandler}
          className={`sm:w-6 sm:h-6 w-5 h-5 text-blue-600 border-none rounded cursor-pointer outline-transparent mr-4`}
        />
      }
      { 
        length ? 
          length === 1 ? 
          `${length} File Selected` : 
          `${length} Files Selected`: 
        "Gallery"
      }
    </h2>  
    { length != 0 && 
      <button
        onClick={ImageDeleteHandler}
        className="w-1/2 font-medium text-red-600 cursor-pointer text-end hover:underline"
      >
        { length === 1 ? 'Delete File' : 'Delete Files' }
      </button> 
    }
  </div>
  );
};

export default Header;

const ImageCard = ({ image, title, description }) => {
  return (
    <div className="relative">
      <div className="relative overflow-hidden bg-white rounded-sm h-full">
        <div className="p-0">
          <img src={image} alt="certificates" />
          <h3 className="mt-6 text-2xl font-bold text-blue-900 sm:mt-10 text-center">
            {title}
          </h3>
          <p className="mt-6 text-base text-gray-600 text-center my-3">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;

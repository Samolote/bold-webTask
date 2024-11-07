import React, { useState } from 'react';

const Image = ({
  src,
  alt,
  wrapperClassName,
  imageClassName,
  width = 'auto',
  height = 'auto',
  objectFit = 'cover',
  placeholderSrc = '',
  fallbackSrc = '',
  lazyLoad = true,
  srcSet,
  sizes,
  onLoad,
  onError,
  ...imageProps
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = ({ target: { src, alt } }) => {
    setHasError(true);

    src = fallbackSrc ? fallbackSrc : '';
    alt = alt ? alt : 'Image failed to load';

    onError && onError(e);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    onLoad && onLoad(e);
  };

  const displaySrc = isLoading && placeholderSrc ? placeholderSrc : src;

  const loadingAttribute = lazyLoad ? 'lazy' : 'eager';

  return (
    <div
      className={`image-wrapper ${wrapperClassName}`}
      style={{ '--width': width, '--height': height, '--object-fit': objectFit }}
    >
      {isLoading && placeholderSrc && (
        <img
          className="image"
          src={placeholderSrc}
          alt="Image is loading"
          loading={loadingAttribute}
        />
      )}
      <img
        src={hasError ? fallbackSrc : displaySrc}
        alt={alt}
        className={`image ${imageClassName}`}
        loading={loadingAttribute}
        sizes={sizes}
        onError={(e) => handleImageError(e)}
        onLoad={handleImageLoad}
        {...imageProps}
      />
    </div>
  );
};

export default Image;

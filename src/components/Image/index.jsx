function ImageList({ images }) {
  return (
    <div className="images">
      {images.map((image) => (
        <div key={image.asset.url}>
          <img src={image.asset.url} alt={image.alt} />
        </div>
      ))}
    </div>
  );
}

export default ImageList;

import "./styles.css";

function Category({ name, onCategoryChange }) {
  return (
    <div className="content-category">
      <input type="checkbox" onChange={() => onCategoryChange(name)} />
      <h5>{name}</h5>
    </div>
  );
}

export default Category;

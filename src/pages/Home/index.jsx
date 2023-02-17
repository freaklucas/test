import { useState, useCallback } from "react";
import Data from "../../products/data.json";

import Node from "../../components/Description";
import Category from "../../components/Category";
import ImageList from "../../components/Image";

import "./styles.css";
function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const { nodes } = Data.data;

  const filteredNodes = nodes.filter((node) => {
    const nameMatchesSearchTerm = node.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatchesSelectedCategories = selectedCategories.size
      ? selectedCategories.has(node.category.name)
      : true;
    return nameMatchesSearchTerm && categoryMatchesSelectedCategories;
  });

  const handleCategoryChange = useCallback((categoryName) => {
    setSelectedCategories((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(categoryName)) {
        newSelected.delete(categoryName);
      } else {
        newSelected.add(categoryName);
      }
      return newSelected;
    });
  }, []);

  const numItems = filteredNodes.length;

  const categoryNames = new Set(nodes.map((node) => node.category.name));

  return (
    <div className="content">
      <div className="category">
        <h4>Filtros</h4>
        <hr />
        {Array.from(categoryNames).map((categoryName) => (
          <Category
            key={categoryName}
            name={categoryName}
            onCategoryChange={handleCategoryChange}
          />
        ))}
      </div>

      <div className="lading">
        <h1>O que você está procurando?</h1>
        <div className="search">
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="BUSQUE AQUI"
          />
          <div className="display">
            <p>{numItems} resultados</p>
          </div>
        </div>
        <div className="components">
          {filteredNodes.map((node) => (
            <div key={node.id}>
              <Node {...node} />
              <ImageList images={node.images} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

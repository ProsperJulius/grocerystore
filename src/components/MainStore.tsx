import { MutableRefObject, useRef, useState } from "react";
import { DisplayProducts } from "./DisplayProducts";

export const MainStore = () => {
  const productElement = useRef() as MutableRefObject<HTMLInputElement>;
  const searchElement = useRef() as MutableRefObject<HTMLInputElement>;
  const [products, setProducts] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const addProduct = () => {
    const currentProductValue = productElement.current.value ?? "";
    if (!currentProductValue) return;
    setProducts([...products, currentProductValue]);
    productElement.current.value = "";
  };
  const changeSearchText = () => {
    const currentSearchTextValue = searchElement.current.value ?? "";
    setSearchText(currentSearchTextValue);
  };
  const startWith = (product: string, searchQuery: string) => {
    const productLowerCase = product.toLowerCase();
    return productLowerCase.startsWith(searchQuery);
  };
  const includes = (product: string, searchQuery: string) => {
    const productLowerCase = product.toLowerCase();
    return (
      !startWith(product, searchQuery) && productLowerCase.includes(searchQuery)
    );
  };
  const getFilteredProducts = (products: string[], searchQuery: string) => {
    if (!searchQuery) return products;

    return [
      ...products.filter((product) => startWith(product, searchQuery)),

      ...products.filter((product) => includes(product, searchQuery)),
    ];
  };
  return (
    <div>
      <div className="row">
        <div>
          <input
            type="text"
            placeholder="add products..."
            ref={productElement}
          />
          <input type="button" value={"add product"} onClick={addProduct} />
        </div>
        <div>
          <input
            type="text"
            onChange={changeSearchText}
            ref={searchElement}
            placeholder="enter product name..."
          />
        </div>
      </div>

      <div className="center-item">
        <DisplayProducts 
        products={getFilteredProducts(products,searchText.toLowerCase())} />
      </div>
    </div>
  );
};

interface DisplayProductsProps {
  products: string[];
}

export const DisplayProducts = (props: DisplayProductsProps) => {
  const productListElements = props.products.map((product) => {
    return <li key={product}>{product}</li>;
  });

  return (
    <div>
      <ul>{productListElements}</ul>
    </div>
  );
};

import "./App.css";
import { useState, useEffect } from "react";
import ProductsList from "./components/ProductsList";
import Cart from "./components/Cart";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filtered, isFiltered] = useState(false);
  const [inputText, setInputText] = useState("");
  const [currentSale, setCurrentSale] = useState([]);

  useEffect(() => {
    fetch("https://hamburgueria-kenzie-json-serve.herokuapp.com/products")
      .then((response) => response.json())
      .then((response) => {
        setProducts(response);
        setFilteredProducts(response);
      })
      .catch((err) => console.log(err));
  }, []);

  function showProducts() {
    if (inputText === "") {
      return setProducts(products);
    }
    const filtered = products.filter(
      (product) =>
        product.category
          .toLowerCase()
          .replace(new RegExp("[ÍÌÎ]", "gi"), "i")
          .normalize("NFD")
          .includes(
            inputText.toLowerCase().replace(new RegExp("[ÍÌÎ]", "gi"), "i")
          ) ||
        product.name
          .toLowerCase()
          .replace(new RegExp("[ÍÌÎ]", "gi"), "i")
          .normalize("NFD")
          .includes(
            inputText.toLowerCase().replace(new RegExp("[ÍÌÎ]", "gi"), "i")
          )
    );
    setFilteredProducts(filtered);
    isFiltered(true);
  }

  function handleClick(productId) {
    const currentProduct = products.find((product) => product.id === productId);
    setCurrentSale((oldProducts) => {
      if (
        !oldProducts.find((oldProduct) => oldProduct.id === currentProduct.id)
      ) {
        return [...oldProducts, currentProduct];
      } else {
        toast.warning("Você só pode adicionar um produto por vez");
        setCurrentSale(oldProducts);
      }
    });
  }

  function cleanFilter() {
    setInputText("");
    setFilteredProducts(products);
    isFiltered(false);
  }

  return (
    <div className="containerBody">
      <header className="App-header">
        <div className="headerContainer">
          <div className="divBurguerKenzie">
            <p className="headerBurguer">Burguer</p>
            <p className="headerKenzie">Kenzie</p>
          </div>
          <div className="divInput">
            <input
              className="inputSearch"
              type="text"
              placeholder="Digitar Pesquisa"
              onChange={(event) => setInputText(event.target.value)}
            ></input>
            <button className="searchButton" onClick={showProducts}>
              Pesquisar
            </button>
          </div>
        </div>
      </header>
      <main>
        <ToastContainer />
        {filtered ? (
          <>
            <div className="resultFilter">
              <div className="resultText">
                <p className="resultFilterText">Resultados para:</p>
                <p className="inputText">{inputText}</p>
              </div>
              <button className="cleanFilterButton" onClick={cleanFilter}>
                Limpar busca
              </button>
            </div>
            <div className="containerMain">
              <ProductsList
                products={filteredProducts}
                setProducts={setProducts}
                showProducts={showProducts}
                handleClick={handleClick}
              ></ProductsList>
              <Cart currentSale={currentSale} />
            </div>
          </>
        ) : (
          <div className="containerMain">
            <ProductsList
              products={filteredProducts}
              setProducts={setProducts}
              showProducts={showProducts}
              handleClick={handleClick}
            ></ProductsList>
            <Cart currentSale={currentSale} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

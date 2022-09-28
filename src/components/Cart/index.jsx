const Cart = ({ currentSale }) => {
  const result = currentSale.reduce((acc, current) => acc + current.price, 0);
  return (
    <div className="containerCart">
      <div className="divTitleCart">
        <p className="titleCart">Carrinho de Compras</p>
      </div>

      {currentSale.length ? (
        <>
          {currentSale.map((currentProduct) => (
            <div key={currentProduct.id} className="containerCurrentSale">
              <div className="containerProductCart">
                <img
                  className="imgCart"
                  src={currentProduct.img}
                  alt="imagem produto"
                />
                <div className="divProductCartInfos">
                  <h5>{currentProduct.name}</h5>
                  <span>{currentProduct.category}</span>
                </div>
              </div>
              <span>Remover</span>
            </div>
          ))}
          <div className="contentTotal">
            <div className="containerTotal">
              <p className="pTotal">Total</p>
              <p className="pValue">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(result)}
              </p>
            </div>
            <div className="divRemove">
              <button className="removeButton">Remover todos</button>
            </div>
          </div>
        </>
      ) : (
        <div className="contentCart">
          <p className="emptyCart">Sua Sacola está vazia</p>
          <span className="emptyCartSpan">Adicione itens</span>
        </div>
      )}
    </div>
  );
};

export default Cart;

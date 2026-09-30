import { createContext, useContext, useReducer, useState } from "react";
import "./App.css";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

const products = [
  {
    id: 1,
    name: "Arc Desk Lamp",
    category: "LIGHTING",
    price: 68,
    color: "Saffron",
    image: "photo-1507473885765-e6ed057f782c",
  },
  {
    id: 2,
    name: "Everyday Tote",
    category: "CARRY",
    price: 32,
    color: "Juniper",
    image: "photo-1544816155-12df9643f363",
  },
  {
    id: 3,
    name: "Stoneware Set",
    category: "TABLE",
    price: 54,
    color: "Cloud",
    image: "photo-1490312278390-ab64016e0aa9",
  },
  {
    id: 4,
    name: "Studio Notebook",
    category: "PAPER",
    price: 18,
    color: "Papaya",
    image: "photo-1531346878377-a5be20888e57",
  },
];
const CartContext = createContext(null);
function cartReducer(cart, action) {
  if (action.type === "add")
    return {
      ...cart,
      items: {
        ...cart.items,
        [action.product.id]: (cart.items[action.product.id] || 0) + 1,
      },
    };
  if (action.type === "remove") {
    const items = { ...cart.items };
    delete items[action.id];
    return { ...cart, items };
  }
  if (action.type === "quantity")
    return { ...cart, items: { ...cart.items, [action.id]: action.quantity } };
  if (action.type === "coupon") return { ...cart, coupon: action.code };
  return cart;
}
function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: {}, coupon: "" });
  const count = Object.values(cart.items).reduce(
    (sum, quantity) => sum + quantity,
    0,
  );
  return (
    <CartContext.Provider value={{ cart, dispatch, count }}>
      {children}
    </CartContext.Provider>
  );
}
function ProductList() {
  const { dispatch } = useContext(CartContext);
  return (
    <section className="product-grid">
      {products.map((product, index) => (
        <article className="product-card" key={product.id}>
          <div
            className={`product-image image-${index}`}
            style={{
              backgroundImage: `url(https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=750&q=80)`,
            }}
          >
            <span>0{index + 1} / OBJECTS</span>
            <button
              type="button"
              aria-label={`Add ${product.name} to cart`}
              title="Add to cart"
              onClick={() => dispatch({ type: "add", product })}
            >
              +
            </button>
          </div>
          <div className="product-details">
            <div>
              <p>
                {product.category} · {product.color}
              </p>
              <h2>{product.name}</h2>
            </div>
            <strong>{currencyFormatter.format(product.price)}</strong>
          </div>
          <button
            type="button"
            className="add-link"
            onClick={() => dispatch({ type: "add", product })}
          >
            Add to bag <span>↗</span>
          </button>
        </article>
      ))}
    </section>
  );
}
function CartPanel() {
  const { cart, dispatch, count } = useContext(CartContext);
  const [couponInput, setCouponInput] = useState("");
  const rows = products.filter((product) => cart.items[product.id]);
  const subtotal = rows.reduce(
    (sum, product) => sum + product.price * cart.items[product.id],
    0,
  );
  const discount = cart.coupon === "SAVE10" ? subtotal * 0.1 : 0;
  const gst = (subtotal - discount) * 0.18;
  const total = subtotal - discount + gst;
  function applyCoupon(event) {
    event.preventDefault();
    dispatch({
      type: "coupon",
      code: couponInput.trim().toUpperCase() === "SAVE10" ? "SAVE10" : "",
    });
  }
  return (
    <aside className="cart-panel">
      <div className="cart-heading">
        <div>
          <p className="eyebrow">YOUR SELECTION</p>
          <h2>
            Shopping bag <span>({count})</span>
          </h2>
        </div>
        <span className="cart-mark">BAG / 01</span>
      </div>
      {rows.length === 0 ? (
        <div className="empty-cart">
          <span>◯</span>
          <p>
            Your bag is waiting
            <br />
            for something lovely.
          </p>
        </div>
      ) : (
        <div className="cart-items">
          {rows.map((product) => (
            <article className="cart-row" key={product.id}>
              <div
                className="cart-thumb"
                style={{
                  backgroundImage: `url(https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=200&q=70)`,
                }}
              />
              <div className="cart-product">
                <strong>{product.name}</strong>
                <span>{currencyFormatter.format(product.price)} each</span>
                <div className="quantity">
                  <button
                    type="button"
                    aria-label={`Decrease ${product.name} quantity`}
                    onClick={() =>
                      cart.items[product.id] === 1
                        ? dispatch({ type: "remove", id: product.id })
                        : dispatch({
                            type: "quantity",
                            id: product.id,
                            quantity: cart.items[product.id] - 1,
                          })
                    }
                  >
                    −
                  </button>
                  <span>{cart.items[product.id]}</span>
                  <button
                    type="button"
                    aria-label={`Increase ${product.name} quantity`}
                    onClick={() =>
                      dispatch({
                        type: "quantity",
                        id: product.id,
                        quantity: cart.items[product.id] + 1,
                      })
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                type="button"
                className="remove-item"
                aria-label={`Remove ${product.name}`}
                onClick={() => dispatch({ type: "remove", id: product.id })}
              >
                ×
              </button>
            </article>
          ))}
        </div>
      )}
      <form className="coupon-form" onSubmit={applyCoupon}>
        <label htmlFor="coupon">PROMO CODE</label>
        <div>
          <input
            id="coupon"
            placeholder="Enter code"
            value={couponInput}
            onChange={(event) => setCouponInput(event.target.value)}
          />
          <button type="submit">Apply</button>
        </div>
        {cart.coupon && <small>Code SAVE10 applied · 10% off</small>}
      </form>
      <div className="totals">
        <div>
          <span>Subtotal</span>
          <strong>{currencyFormatter.format(subtotal)}</strong>
        </div>
        <div>
          <span>Discount</span>
          <strong>−{currencyFormatter.format(discount)}</strong>
        </div>
        <div>
          <span>GST · 18%</span>
          <strong>{currencyFormatter.format(gst)}</strong>
        </div>
        <div className="grand-total">
          <span>Total</span>
          <strong>{currencyFormatter.format(total)}</strong>
        </div>
      </div>
      <button type="button" className="checkout-button" disabled={count === 0}>
        Continue to checkout <span>↗</span>
      </button>
      <p className="secure-note">
        Shipping calculated at checkout · Demo store
      </p>
    </aside>
  );
}
function Store() {
  const { count } = useContext(CartContext);
  return (
    <main className="store-app">
      <header className="store-header">
        <a className="wordmark" href="#top">
          COMMON<span> /</span> FORM
        </a>
        <nav>
          <a href="#objects">Objects</a>
          <a href="#story">Our approach</a>
        </nav>
        <a className="bag-link" href="#bag">
          Your bag <span>{count}</span>
        </a>
      </header>
      <section className="store-intro" id="top">
        <div>
          <p className="eyebrow">SMALL THINGS, WELL MADE</p>
          <h1>
            Useful objects.
            <br />
            <em>Good company.</em>
          </h1>
        </div>
        <p>
          Considered everyday pieces from independent makers. Designed to be
          used, kept, and passed along.
        </p>
      </section>
      <div className="store-layout" id="objects">
        <ProductList />
        <div id="bag">
          <CartPanel />
        </div>
      </div>
      <footer className="store-footer" id="story">
        <span>COMMON FORM · GOODS FOR EVERYDAY</span>
        <span>Thoughtfully sourced, made to last.</span>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
export default function App() {
  return (
    <CartProvider>
      <Store />
    </CartProvider>
  );
}

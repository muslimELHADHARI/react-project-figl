import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Carousel,
  Card,
  Offcanvas,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Plus,
  Minus,
  X,
  Truck,
  RotateCcw,
  ShieldCheck,
  Heart,
  Check,
  Leaf,
} from "lucide-react";

const photo = (id, width = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const products = [
  {
    id: 1,
    name: "Fauteuil Alba",
    category: "Mobilier",
    detail: "Tissu capitonné & bois",
    price: 249,
    image: photo("photo-1567538096630-e0c55bd6374c", 700),
    badge: "Coup de cœur",
  },
  {
    id: 2,
    name: "Lampe Atelier",
    category: "Luminaires",
    detail: "Une lumière tout en douceur",
    price: 89,
    image: photo("photo-1507473885765-e6ed057f782c", 700),
    badge: "",
  },
  {
    id: 3,
    name: "Assiettes Terra",
    category: "Décoration",
    detail: "Céramique aux nuances bleutées",
    price: 39,
    image: photo("photo-1578749556568-bc2c40e68b61", 700),
    badge: "Nouveau",
  },
  {
    id: 4,
    name: "Chaise Sienna",
    category: "Mobilier",
    detail: "L’élégance des formes simples",
    price: 159,
    image: photo("photo-1598300042247-d088f8ab3a91", 700),
    badge: "",
  },
];
const slides = [
  {
    eyebrow: "LA COLLECTION AUTOMNE — HIVER",
    title: (
      <>
        Un peu de beau.
        <br />
        Beaucoup de vous.
      </>
    ),
    description:
      "Des objets choisis avec soin, pour un intérieur qui ne ressemble qu’à vous.",
    image: photo("photo-1600210492486-724fe5c67fb0", 1600),
    alt: "Salon lumineux aux matières naturelles, fauteuils et canapé chaleureux",
    label: "L’art de se sentir chez soi",
    caption: "Des matières naturelles, une évidence.",
  },
  {
    eyebrow: "LE SENS DU DÉTAIL",
    title: (
      <>
        Les petits riens
        <br />
        qui changent tout.
      </>
    ),
    description:
      "Une jolie forme, une texture, une lumière. Faites de chaque coin un endroit à vous.",
    image: photo("photo-1600607687920-4e2a09cf159d", 1600),
    alt: "Intérieur contemporain lumineux avec mobilier et objets décoratifs",
    label: "La beauté dans les détails",
    caption: "Des pièces qui trouvent leur place.",
  },
  {
    eyebrow: "VOTRE NOUVEAU REFUGE",
    title: (
      <>
        Ralentir.
        <br />
        Tout simplement.
      </>
    ),
    description:
      "Des lignes douces et des pièces intemporelles pour savourer le quotidien.",
    image: photo("photo-1616486338812-3dadae4b4ace", 1600),
    alt: "Espace de vie apaisant et élégant aux tons naturels",
    label: "Le confort a du style",
    caption: "Prenez le temps d’être bien.",
  },
];
const money = (value) =>
  new Intl.NumberFormat("fr-TN", {
    style: "currency",
    currency: "TND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  })
    .formatToParts(value)
    .map((part) => (part.type === "currency" ? "DT" : part.value))
    .join("");

function Brand({ light = false }) {
  return (
    <a
      href="#"
      className={`brand ${light ? "brand-light" : ""}`}
      aria-label="MoslemStore, accueil"
    >
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <path
          d="M13 14V10a7 7 0 0 1 14 0v4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <rect x="5" y="12" width="30" height="25" rx="5" fill="currentColor" />
        <path
          d="M13 30V20l7 6 7-6v10"
          fill="none"
          stroke={light ? "#283e34" : "#fffefa"}
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      MoslemStore<span className="brand-dot">.</span>
    </a>
  );
}

export default function App() {
  const [slide, setSlide] = useState(0);
  const [category, setCategory] = useState("Tout voir");
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState("");
  const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const total = products.reduce(
    (sum, item) => sum + item.price * (cart[item.id] || 0),
    0,
  );
  const visibleProducts = products.filter(
    (item) => category === "Tout voir" || item.category === category,
  );
  const updateCart = (id, delta) =>
    setCart((previous) => ({
      ...previous,
      [id]: Math.max(0, (previous[id] || 0) + delta),
    }));
  const addToCart = (product) => {
    updateCart(product.id, 1);
    setToast(`${product.name} ajouté au panier`);
  };

  return (
    <>
      <div className="announcement">
        <span>Un intérieur qui vous ressemble.</span>
        <span className="announcement-divider">|</span>
        <Truck size={14} /> Livraison offerte dès 100 DT
      </div>
      <Navbar expand="lg" className="store-navbar" collapseOnSelect>
        <Container className="page-container">
          <Brand />
          <Navbar.Toggle
            aria-controls="store-navigation"
            label="Ouvrir le menu"
          />
          <Navbar.Collapse id="store-navigation">
            <Nav className="mx-auto">
              <Nav.Link href="#collection" className="active">
                La collection
              </Nav.Link>
              <Nav.Link href="#univers">Notre univers</Nav.Link>
              <Nav.Link href="#engagements">Nos engagements</Nav.Link>
            </Nav>
            <Button
              variant="link"
              className="cart-button"
              onClick={() => setShowCart(true)}
              aria-label={`Ouvrir le panier, ${count} article${count !== 1 ? "s" : ""}`}
            >
              <ShoppingBag size={20} strokeWidth={1.6} />
              <span>Mon panier</span>
              <span className="cart-count">{count}</span>
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main>
        <section className="hero" aria-label="Nos collections">
          <Carousel
            activeIndex={slide}
            onSelect={setSlide}
            controls={false}
            indicators={false}
            interval={null}
            fade
          >
            {slides.map((item, index) => (
              <Carousel.Item key={index}>
                <div className="hero-grid">
                  <div className="hero-copy">
                    <p className="eyebrow">
                      <span />
                      {item.eyebrow}
                    </p>
                    <h1>{item.title}</h1>
                    <p className="hero-description">{item.description}</p>
                    <Button href="#collection" className="button-primary">
                      Découvrir la collection <ArrowUpRight size={19} />
                    </Button>
                    <div className="hero-note">
                      <span className="small-line" /> Le beau, pour tous les
                      jours.
                    </div>
                  </div>
                  <div className="hero-image-wrap">
                    <img
                      className="hero-image"
                      src={item.image}
                      alt={item.alt}
                      fetchPriority={index === 0 ? "high" : "auto"}
                    />
                    <div className="image-caption">
                      <span className="caption-icon">
                        <Leaf size={21} strokeWidth={1.4} />
                      </span>
                      <div>
                        <strong>{item.label}</strong>
                        <span>{item.caption}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="hero-pagination">
            <div className="slide-dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSlide(index)}
                  className={slide === index ? "selected" : ""}
                  aria-label={`Afficher la diapositive ${index + 1}`}
                  aria-current={slide === index ? "true" : undefined}
                />
              ))}
            </div>
            <span className="slide-number">
              0{slide + 1} <span>/ 03</span>
            </span>
            <div className="slide-arrows">
              <button
                onClick={() => setSlide((slide + 2) % 3)}
                aria-label="Diapositive précédente"
              >
                <ChevronLeft size={19} />
              </button>
              <button
                onClick={() => setSlide((slide + 1) % 3)}
                aria-label="Diapositive suivante"
              >
                <ChevronRight size={19} />
              </button>
            </div>
          </div>
        </section>

        <section
          className="benefits"
          id="engagements"
          aria-label="Nos engagements"
        >
          <Container className="page-container benefits-grid">
            <div>
              <Truck />
              <span>
                <strong>Livraison offerte</strong>
                <small>Dès 100 DT d’achat</small>
              </span>
            </div>
            <div>
              <RotateCcw />
              <span>
                <strong>Retours sous 30 jours</strong>
                <small>Prenez le temps de choisir</small>
              </span>
            </div>
            <div>
              <ShieldCheck />
              <span>
                <strong>Achats en toute confiance</strong>
                <small>Votre tranquillité compte</small>
              </span>
            </div>
            <div>
              <Heart />
              <span>
                <strong>Sélection avec soin</strong>
                <small>Des pièces faites pour durer</small>
              </span>
            </div>
          </Container>
        </section>

        <section className="collection-section" id="collection">
          <Container className="page-container">
            <div className="collection-heading">
              <div>
                <p className="eyebrow">BIEN CHEZ SOI, TOUT SIMPLEMENT</p>
                <h2>
                  Vos prochains coups de cœur<span>.</span>
                </h2>
              </div>
              <span className="collection-intro">
                De belles pièces. De belles histoires.
              </span>
            </div>
            <div className="collection-toolbar">
              <div
                className="category-tabs"
                role="group"
                aria-label="Filtrer les produits"
              >
                {["Tout voir", "Mobilier", "Luminaires", "Décoration"].map(
                  (item) => (
                    <button
                      key={item}
                      className={category === item ? "selected" : ""}
                      onClick={() => setCategory(item)}
                      aria-pressed={category === item}
                    >
                      {item}
                    </button>
                  ),
                )}
              </div>
              <span className="product-count" aria-live="polite">
                {visibleProducts.length} pièce
                {visibleProducts.length > 1 ? "s" : ""} à découvrir
              </span>
            </div>
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <Card key={product.id} className="product-card">
                  <div className="product-image-wrap">
                    <Card.Img
                      variant="top"
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                    />
                    {product.badge && (
                      <span
                        className={`product-badge ${product.badge === "Nouveau" ? "new" : ""}`}
                      >
                        {product.badge}
                      </span>
                    )}
                    <span className="product-image-category">
                      {product.category}
                    </span>
                  </div>
                  <Card.Body>
                    <div className="product-title-row">
                      <Card.Title as="h3">{product.name}</Card.Title>
                      <span className="product-price">
                        {money(product.price)}
                      </span>
                    </div>
                    <Card.Text>{product.detail}</Card.Text>
                    <Button
                      className="add-button"
                      variant="outline-dark"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart <Plus size={17} />
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        <section id="univers" className="universe-section">
          <Container className="page-container">
            <div className="universe-grid">
              <div className="universe-image">
                <img
                  src={photo("photo-1616486029423-aaa4789e8c9a", 1100)}
                  alt="Intérieur chaleureux aux matières naturelles et aux détails soignés"
                  loading="lazy"
                />
                <span>LA MAISON, AUTREMENT.</span>
              </div>
              <div className="universe-copy">
                <p className="eyebrow">L’ESPRIT MOSLEMSTORE</p>
                <h2>Moins, mais mieux.</h2>
                <p>
                  Nous aimons les objets qui ont une âme. Les matières que l’on
                  a envie de toucher. Les pièces qui traversent les saisons et
                  deviennent une partie de votre histoire.
                </p>
                <p>
                  Notre idée du beau ? Simple, chaleureux et fait pour vivre.
                </p>
                <a href="#collection" className="text-link">
                  Trouvez votre prochaine pièce <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <footer>
        <Container className="page-container">
          <div className="footer-top">
            <div>
              <Brand light />
              <p>Le beau au quotidien.</p>
            </div>
            <a href="#collection">
              La collection <ArrowUpRight size={16} />
            </a>
            <a href="#univers">
              Notre univers <ArrowUpRight size={16} />
            </a>
            <a href="#engagements">
              Nos engagements <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} MoslemStore. Tous droits réservés.
            </span>
            <span>Imaginé avec soin, pour votre chez-vous.</span>
          </div>
        </Container>
      </footer>

      <Offcanvas
        show={showCart}
        onHide={() => setShowCart(false)}
        placement="end"
        className="cart-panel"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            Mon panier <span className="cart-count">{count}</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {count === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} strokeWidth={1} />
              <h3>Une place pour vos envies.</h3>
              <p>Votre panier attend ses premiers coups de cœur.</p>
              <Button
                className="button-primary"
                onClick={() => {
                  setShowCart(false);
                  document
                    .getElementById("collection")
                    .scrollIntoView({ behavior: "smooth" });
                }}
              >
                Découvrir la collection <ArrowRight size={18} />
              </Button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {products
                  .filter((item) => cart[item.id] > 0)
                  .map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-content">
                        <div className="cart-item-title">
                          <h3>{item.name}</h3>
                          <button
                            className="icon-button"
                            aria-label={`Retirer ${item.name}`}
                            onClick={() =>
                              setCart((previous) => ({
                                ...previous,
                                [item.id]: 0,
                              }))
                            }
                          >
                            <X size={17} />
                          </button>
                        </div>
                        <p>{money(item.price)}</p>
                        <div className="quantity-control">
                          <button
                            onClick={() => updateCart(item.id, -1)}
                            aria-label={`Diminuer la quantité de ${item.name}`}
                          >
                            <Minus size={14} />
                          </button>
                          <span aria-label="Quantité">{cart[item.id]}</span>
                          <button
                            onClick={() => updateCart(item.id, 1)}
                            aria-label={`Augmenter la quantité de ${item.name}`}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="cart-summary">
                <div>
                  <span>Sous-total</span>
                  <strong>{money(total)}</strong>
                </div>
                <div>
                  <span>Livraison</span>
                  <span>
                    {total >= 100
                      ? "Offerte"
                      : "À calculer lors de la commande"}
                  </span>
                </div>
                {total < 100 && (
                  <p>Encore {money(100 - total)} pour la livraison offerte.</p>
                )}
                <div className="cart-total">
                  <strong>Total des articles</strong>
                  <strong>{money(total)}</strong>
                </div>
                <p className="demo-note">
                  Boutique de démonstration : aucun paiement ni commande réelle.
                </p>
                <Button
                  className="button-primary w-100"
                  onClick={() => setShowCart(false)}
                >
                  Continuer mes découvertes <ArrowRight size={18} />
                </Button>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
      <ToastContainer position="bottom-center" className="p-3">
        <Toast
          show={Boolean(toast)}
          onClose={() => setToast("")}
          delay={2600}
          autohide
          role="status"
          className="cart-toast"
        >
          <Toast.Body>
            <Check size={18} />
            <span>{toast}</span>
            <button
              onClick={() => {
                setShowCart(true);
                setToast("");
              }}
            >
              Voir le panier
            </button>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

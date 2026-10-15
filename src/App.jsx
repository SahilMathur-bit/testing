import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Instagram,
  Menu,
  Moon,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sun,
  X,
} from 'lucide-react';

const fallbackImage = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1100&q=85';

const products = [
  { id: 1, name: 'Air Motion 01', category: 'Streetwear', price: 145, tag: 'JUST DROPPED', color: 'Chalk / Signal', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1100&q=85', bestseller: true },
  { id: 2, name: 'Velocity Runner', category: 'Running', price: 128, tag: 'BESTSELLER', color: 'Volt / Graphite', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1100&q=85', bestseller: true },
  { id: 3, name: 'Court Vision High', category: 'Basketball', price: 165, tag: 'LIMITED', color: 'Cloud / Rust', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1100&q=85', bestseller: false },
  { id: 4, name: 'Everyday Form', category: 'Streetwear', price: 112, tag: 'NEW COLOR', color: 'Bone / Moss', image: 'https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=1100&q=85', bestseller: true },
  { id: 5, name: 'Pace System 2', category: 'Running', price: 138, tag: 'RUN CLUB PICK', color: 'Ash / Cobalt', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1100&q=85', bestseller: false },
  { id: 6, name: 'Baseline Pro', category: 'Basketball', price: 154, tag: 'COURT READY', color: 'White / Black', image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=1100&q=85', bestseller: false },
  { id: 7, name: 'Studio Low', category: 'Streetwear', price: 119, tag: 'NEW ARRIVAL', color: 'Sail / Gum', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1100&q=85', bestseller: false },
  { id: 8, name: 'Tempo Flow', category: 'Running', price: 142, tag: 'LIGHTWEIGHT', color: 'Cloud / Lime', image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1100&q=85', bestseller: false },
  { id: 9, name: 'All-Court 2', category: 'Basketball', price: 172, tag: 'COURT READY', color: 'Black / Volt', image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1100&q=85', bestseller: false },
];

const categories = ['All pairs', 'Running', 'Streetwear', 'Basketball'];
const money = (value) => `$${value.toFixed(2)}`;

function Counter({ value, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => `${latest.toLocaleString(undefined, { maximumFractionDigits: 1 })}${suffix}`);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 1.5, ease: 'easeOut' });
      return controls.stop;
    }
  }, [count, inView, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

function ProductCard({ product, onAdd, index = 0 }) {
  return (
    <motion.article
      className="product-card"
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.48, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -7, transition: { duration: 0.2 } }}
    >
      <div className="product-image-wrap">
        <img
          className="product-image"
          src={product.image}
          alt={`${product.name} sneaker in ${product.color}`}
          loading="lazy"
          onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackImage; }}
        />
        <span className="product-tag">{product.tag}</span>
        <button className="quick-add" type="button" onClick={() => onAdd(product)} aria-label={`Add ${product.name} to cart`}>
          <Plus size={19} strokeWidth={1.8} />
        </button>
      </div>
      <div className="product-info">
        <div>
          <h3>{product.name}</h3>
          <p>{product.color}</p>
        </div>
        <span className="product-price">{money(product.price)}</span>
      </div>
      <button className="product-add-text" type="button" onClick={() => onAdd(product)}>
        Add to bag <ArrowUpRight size={15} />
      </button>
    </motion.article>
  );
}

function CartDrawer({ cart, onClose, onChangeQuantity, onRemove }) {
  const items = Object.values(cart);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <MotionConfig reducedMotion="user">
      <motion.button
        className="drawer-scrim"
        aria-label="Close shopping bag"
        onClick={onClose}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      />
      <motion.aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 270 }}
      >
        <div className="drawer-head">
          <div><span className="eyebrow">YOUR SELECTION</span><h2 id="cart-title">The bag<span className="orange-dot">.</span></h2></div>
          <button className="icon-button close-drawer" type="button" onClick={onClose} aria-label="Close shopping bag"><X /></button>
        </div>
        {items.length === 0 ? (
          <div className="empty-bag">
            <ShoppingBag size={38} strokeWidth={1.2} />
            <h3>Nothing in here. Yet.</h3>
            <p>Your next favorite pair is one scroll away.</p>
            <button className="button button-dark" type="button" onClick={onClose}>Explore the collection <ArrowRight size={17} /></button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div className="cart-item" key={item.id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 25, height: 0 }}>
                    <img src={item.image} alt="" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackImage; }} />
                    <div className="cart-item-detail">
                      <div className="cart-item-top"><div><h3>{item.name}</h3><p>{item.color}</p></div><strong>{money(item.price * item.quantity)}</strong></div>
                      <div className="cart-item-bottom">
                        <div className="quantity-control" aria-label={`Quantity of ${item.name}`}>
                          <button type="button" onClick={() => onChangeQuantity(item.id, -1)} aria-label="Decrease quantity"><Minus size={13} /></button>
                          <motion.span key={item.quantity} initial={{ scale: 0.7 }} animate={{ scale: 1 }}>{item.quantity}</motion.span>
                          <button type="button" onClick={() => onChangeQuantity(item.id, 1)} aria-label="Increase quantity"><Plus size={13} /></button>
                        </div>
                        <button className="remove-item" type="button" onClick={() => onRemove(item.id)}>Remove</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="drawer-checkout">
              <div className="subtotal"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
              <p>Shipping and taxes calculated at checkout.</p>
              <button className="button button-orange checkout-button" type="button" onClick={() => window.alert('Checkout is a demo. Your bag is saved right here.')}>Continue to checkout <ArrowRight size={18} /></button>
              <button className="continue-shopping" type="button" onClick={onClose}>Keep looking</button>
            </div>
          </>
        )}
      </motion.aside>
    </MotionConfig>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(() => window.localStorage.getItem('stride-theme') === 'dark');
  const [intro, setIntro] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All pairs');
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState({});
  const [toast, setToast] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const toastTimer = useRef(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntro(false), 1050);
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { window.clearTimeout(timer); window.removeEventListener('scroll', handleScroll); window.clearTimeout(toastTimer.current); };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    window.localStorage.setItem('stride-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const cartCount = Object.values(cart).reduce((total, item) => total + item.quantity, 0);
  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'All pairs' || product.category === activeCategory;
    const matchesQuery = `${product.name} ${product.category} ${product.color}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesCategory && matchesQuery;
  });
  const bestsellers = products.filter((product) => product.bestseller && `${product.name} ${product.category} ${product.color}`.toLowerCase().includes(query.trim().toLowerCase()));

  const addToCart = (product) => {
    setCart((current) => ({
      ...current,
      [product.id]: current[product.id]
        ? { ...current[product.id], quantity: current[product.id].quantity + 1 }
        : { ...product, quantity: 1 },
    }));
    setToast(`${product.name} added to your bag`);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(''), 2600);
  };

  const changeQuantity = (id, delta) => {
    setCart((current) => {
      const item = current[id];
      if (!item) return current;
      const quantity = item.quantity + delta;
      if (quantity <= 0) {
        const next = { ...current };
        delete next[id];
        return next;
      }
      return { ...current, [id]: { ...item, quantity } };
    });
  };

  const removeFromCart = (id) => {
    setCart((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  };

  const onHeroMove = (event) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    setTilt({ x: y * -5, y: x * 7 });
  };

  const handleNewsletter = (event) => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get('email');
    setNewsletterStatus(`You're on the list. See you out there, ${email}.`);
    event.currentTarget.reset();
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const jumpToShop = () => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <AnimatePresence>
        {intro && (
          <motion.div className="intro-screen" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55, ease: 'easeInOut' }}>
            <motion.div className="intro-mark" initial={{ y: 18, opacity: 0, scale: 0.96 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <span>STRIDE</span><i />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <a className="wordmark" href="#top" aria-label="STRIDE home">STRIDE<span>.</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#shop">Shop all</a><a href="#shop" onClick={() => setActiveCategory('Running')}>Running</a><a href="#shop" onClick={() => setActiveCategory('Streetwear')}>Streetwear</a><a href="#story">Our stride</a>
        </nav>
        <div className="header-actions">
          <AnimatePresence initial={false}>
            {searchOpen && <motion.input className="search-input" type="search" placeholder="Find your pair" aria-label="Search sneakers" value={query} onChange={(event) => setQuery(event.target.value)} initial={{ width: 0, opacity: 0 }} animate={{ width: 180, opacity: 1 }} exit={{ width: 0, opacity: 0 }} />}
          </AnimatePresence>
          <button className={`icon-button search-toggle${searchOpen ? ' active' : ''}`} type="button" aria-label={searchOpen ? 'Close search' : 'Search'} onClick={() => { setSearchOpen((open) => !open); if (searchOpen) setQuery(''); }}>
            {searchOpen ? <X size={19} /> : <Search size={19} />}
          </button>
          <button className="icon-button theme-toggle" type="button" aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={darkMode} onClick={() => setDarkMode((enabled) => !enabled)}>
            {darkMode ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button className="bag-button" type="button" onClick={() => setCartOpen(true)} aria-label={`Open bag, ${cartCount} items`}>
            <ShoppingBag size={19} strokeWidth={1.7} /><span className="bag-label">Bag</span><motion.span className="bag-count" key={cartCount} initial={{ scale: 0.65 }} animate={{ scale: 1 }}>{cartCount}</motion.span>
          </button>
          <button className="icon-button menu-toggle" type="button" aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)}>{mobileMenuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav className="mobile-menu" aria-label="Mobile navigation" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
            <a href="#shop" onClick={closeMobileMenu}>Shop all <ArrowUpRight size={18} /></a>
            <a href="#shop" onClick={() => { setActiveCategory('Running'); closeMobileMenu(); }}>Running <ArrowUpRight size={18} /></a>
            <a href="#shop" onClick={() => { setActiveCategory('Streetwear'); closeMobileMenu(); }}>Streetwear <ArrowUpRight size={18} /></a>
            <a href="#story" onClick={closeMobileMenu}>Our stride <ArrowUpRight size={18} /></a>
          </motion.nav>
        )}
      </AnimatePresence>

      <main id="top">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-grain" />
          <div className="hero-copy">
            <motion.p className="hero-kicker" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.45 }}>Independent by nature <span /> Built to move</motion.p>
            <h1 id="hero-heading">
              <span className="headline-line"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 1, duration: 0.68, ease: [0.22, 1, 0.36, 1] }}>STEP INTO</motion.span></span>
              <span className="headline-line"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 1.12, duration: 0.68, ease: [0.22, 1, 0.36, 1] }}>YOUR <em>NEXT</em></motion.span></span>
              <span className="headline-line"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 1.24, duration: 0.68, ease: [0.22, 1, 0.36, 1] }}>ERA<span className="orange-dot">.</span></motion.span></span>
            </h1>
            <motion.div className="hero-bottom" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.55, duration: 0.55 }}>
              <p>Good shoes take you places.<br />Great ones make it your own.</p>
              <button className="button button-orange magnetic-button" type="button" onClick={jumpToShop}>Shop the collection <ArrowUpRight size={18} /></button>
            </motion.div>
          </div>
          <motion.div className="hero-visual" onMouseMove={onHeroMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })} initial={{ opacity: 0, scale: 0.94, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 1.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <div className="hero-visual-frame" style={{ '--tilt-x': `${tilt.x}deg`, '--tilt-y': `${tilt.y}deg` }}>
              <img src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1500&q=90" alt="Sculptural white and orange street sneaker" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackImage; }} />
              <div className="hero-photo-label"><span>01 / 06</span><span>THE EVERYDAY ICON</span></div>
            </div>
            <motion.div className="hero-sticker" animate={{ rotate: [8, 2, 8] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}><span>MADE TO</span><strong>MOVE</strong><ArrowDownRight size={20} /></motion.div>
          </motion.div>
          <div className="hero-index"><span>001</span><i /><span>NEW SEASON / 2025</span></div>
          <a className="scroll-cue" href="#shop" aria-label="Scroll to collection"><span>Scroll to explore</span><ArrowDownRight size={17} /></a>
        </section>

        <section className="ticker" aria-label="Brand statement"><div className="ticker-track"><span>MOVE DIFFERENT</span><i /> <span>FIND YOUR FORM</span><i /> <span>MOVE DIFFERENT</span><i /> <span>FIND YOUR FORM</span><i /> <span>MOVE DIFFERENT</span><i /> <span>FIND YOUR FORM</span><i /></div></section>

        <section className="shop-section section-wrap" id="shop">
          <div className="section-heading">
            <div><p className="eyebrow">THE ROTATION</p><h2>Find your <em>stride.</em></h2></div>
            <p className="section-aside">Considered design.<br />Unconsidered movement.</p>
          </div>
          <div className="shop-toolbar">
            <div className="category-tabs" role="group" aria-label="Filter by category">
              {categories.map((category) => <button type="button" key={category} className={activeCategory === category ? 'category-tab active' : 'category-tab'} onClick={() => setActiveCategory(category)}>{category}<span>{category === 'All pairs' ? products.length : products.filter((item) => item.category === category).length}</span></button>)}
            </div>
            <span className="results-count">{filteredProducts.length} pairs</span>
          </div>
          {filteredProducts.length > 0 ? (
            <motion.div className="product-grid" layout>
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => <ProductCard key={product.id} product={product} onAdd={addToCart} index={index} />)}
              </AnimatePresence>
            </motion.div>
          ) : <div className="no-results"><Search size={20} /><p>No pairs found for “{query}”. Try another search.</p></div>}
          <button className="button button-outline view-all" type="button" onClick={() => { setQuery(''); setActiveCategory('All pairs'); }}>View the whole collection <ArrowRight size={17} /></button>
        </section>

        <section className="promo-band" id="story">
          <div className="promo-topline"><span>GOOD THINGS, FIRST.</span><span>STRIDE MEMBERS / 001</span></div>
          <div className="promo-content">
            <div className="promo-title"><p className="eyebrow">A LITTLE HEAD START</p><h2>YOUR FIRST<br /><em>STEP</em> IS ON US.</h2></div>
            <div className="promo-detail"><p>Join the list. Take 20% off your first pair. No noise, just good shoes and the occasional good thing.</p><button className="button button-light" type="button" onClick={() => document.getElementById('newsletter-email')?.focus()}>Get 20% off <ArrowUpRight size={18} /></button></div>
          </div>
          <div className="promo-watermark" aria-hidden="true">20%</div>
          <div className="promo-foot"><span>THE FIRST PAIR FEELS DIFFERENT.</span><span>01 — 20% OFF / YOUR FIRST ORDER</span></div>
        </section>

        <section className="bestsellers-section section-wrap">
          <div className="section-heading bestseller-heading">
            <div><p className="eyebrow">THE CROWD KNOWS</p><h2>In heavy <em>rotation.</em></h2></div>
            <a className="text-link" href="#shop" onClick={() => { setActiveCategory('All pairs'); setQuery(''); }}>Shop all bestsellers <ArrowUpRight size={17} /></a>
          </div>
          <div className="product-grid bestseller-grid">
            {bestsellers.length ? bestsellers.map((product, index) => <ProductCard key={product.id} product={product} onAdd={addToCart} index={index} />) : <p className="empty-bestsellers">No bestsellers match that search.</p>}
          </div>
        </section>

        <section className="numbers-band" aria-label="STRIDE in numbers">
          <div className="number-intro"><p className="eyebrow">A FEW THINGS THAT MATTER</p><h2>Less noise.<br /><em>More miles.</em></h2></div>
          <div className="stat-item"><strong><Counter value={32} suffix="k" /></strong><span>feet finding their way</span></div>
          <div className="stat-item"><strong><Counter value={4.9} suffix="/5" /></strong><span>from people who wear them</span></div>
          <div className="stat-item"><strong><Counter value={2} suffix=" yr" /></strong><span>wear-tested. no shortcuts.</span></div>
        </section>

        <section className="newsletter-section">
          <div className="newsletter-left"><p className="eyebrow">GOOD MAIL, ON PURPOSE</p><h2>Make room<br />for <em>good things.</em></h2></div>
          <div className="newsletter-right">
            <p>New drops, considered notes, and the occasional reason to leave the house. Only when it’s worth it.</p>
            <form className="newsletter-form" onSubmit={handleNewsletter}>
              <label className="visually-hidden" htmlFor="newsletter-email">Email address</label>
              <input id="newsletter-email" type="email" name="email" placeholder="Your email address" autoComplete="email" required />
              <button type="submit" aria-label="Subscribe to newsletter"><ArrowRight size={20} /></button>
            </form>
            <p className={`newsletter-note${newsletterStatus ? ' success' : ''}`} aria-live="polite">{newsletterStatus || 'No spam. Unsubscribe whenever.'}</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top"><a className="footer-logo" href="#top">STRIDE<span>.</span></a><p>Made for the way<br />you move through it.</p><a className="back-top" href="#top">Back to top <ArrowUpRight size={16} /></a></div>
        <div className="footer-bottom"><span>© 2025 STRIDE STUDIO. ALL GOOD.</span><div className="footer-links"><a href="#shop">Shop</a><a href="#story">Our story</a><a href="mailto:hello@stride.studio">Contact</a><a href="https://www.instagram.com/" aria-label="STRIDE on Instagram" target="_blank" rel="noreferrer"><Instagram size={17} /></a></div><span>WALK YOUR OWN WAY.</span></div>
      </footer>

      <AnimatePresence>{cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onChangeQuantity={changeQuantity} onRemove={removeFromCart} />}</AnimatePresence>
      <AnimatePresence>
        {toast && <motion.div className="toast" role="status" initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} transition={{ duration: 0.22 }}><span className="toast-check"><Check size={15} /></span><span>{toast}</span><button type="button" onClick={() => setCartOpen(true)}>View bag <ArrowUpRight size={14} /></button></motion.div>}
      </AnimatePresence>
    </>
  );
}

export default App;

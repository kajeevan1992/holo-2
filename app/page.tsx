import Link from 'next/link';

const products = [
  {
    title: 'Business Cards',
    description: 'Premium cards with multiple stocks, finishes and turnaround options.',
    price: 'From £19.99',
    mark: 'BC',
  },
  {
    title: 'Flyers & Leaflets',
    description: 'Promote your business with sharp, professional full-colour printing.',
    price: 'From £24.99',
    mark: 'FL',
  },
  {
    title: 'Posters',
    description: 'Indoor and outdoor posters in popular sizes with custom options.',
    price: 'From £8.99',
    mark: 'PO',
  },
  {
    title: 'Roller Banners',
    description: 'Portable display graphics supplied complete and ready to use.',
    price: 'From £69.00',
    mark: 'RB',
  },
  {
    title: 'Stickers & Labels',
    description: 'Custom shapes, sizes and materials for products, packaging and promotions.',
    price: 'From £18.00',
    mark: 'SL',
  },
  {
    title: 'Signs & Boards',
    description: 'Foamex, Correx, acrylic and composite signage made to your specification.',
    price: 'Get an instant price',
    mark: 'SB',
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Design · Print · Sign · Web</p>
            <h1>Professional printing made simple.</h1>
            <p className="hero-copy">
              Configure your product, see the price, upload your artwork and order online. Choose
              delivery or collection from HOLO Print.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/products">
                Browse all products
              </Link>
              <Link className="button" href="/quote">
                Request a custom quote
              </Link>
            </div>
          </div>

          <aside className="hero-panel" aria-label="How online ordering works">
            <p className="eyebrow">How it works</p>
            <h2>From order to delivery</h2>
            <div className="steps">
              <div className="step">
                <span className="step-number">1</span>
                <div>
                  <strong>Choose and configure</strong>
                  <p>Select size, quantity, material, finishing and turnaround.</p>
                </div>
              </div>
              <div className="step">
                <span className="step-number">2</span>
                <div>
                  <strong>Upload and pay</strong>
                  <p>Upload artwork and pay securely by card or bank transfer.</p>
                </div>
              </div>
              <div className="step">
                <span className="step-number">3</span>
                <div>
                  <strong>We produce and deliver</strong>
                  <p>Track the order while we print, check and arrange delivery.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Popular products</p>
              <h2>Start your order</h2>
            </div>
            <Link className="button" href="/products">
              View all products
            </Link>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <Link
                className="product-card"
                href={`/products/${product.title.toLowerCase().replaceAll(' & ', '-').replaceAll(' ', '-')}`}
                key={product.title}
              >
                <div className="product-visual" aria-hidden="true">
                  {product.mark}
                </div>
                <div className="product-content">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <span className="product-price">{product.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

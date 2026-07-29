import Link from 'next/link';

const modules = [
  ['Orders', 'Manage payment, artwork, production and delivery status.'],
  ['Products', 'Configure products, options, pricing, VAT and turnaround.'],
  ['Customers', 'View accounts, addresses, order history and communication.'],
  ['Artwork', 'Check uploads, issue proofs and record customer approval.'],
  ['Production', 'Move paid and approved jobs through production stages.'],
  ['Dispatch', 'Prepare collection, delivery, labels and tracking.'],
  ['Quotes', 'Create, send and convert custom print quotations.'],
  ['Settings', 'Manage HOLO Print details, payments, email and fulfilment.'],
] as const;

export default function AdminHomePage() {
  return (
    <main className="section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Single-store administration</p>
            <h2>HOLO Print dashboard</h2>
          </div>
          <Link className="button" href="/">
            View storefront
          </Link>
        </div>

        <div className="product-grid">
          {modules.map(([title, description]) => (
            <Link
              className="product-card"
              href={`/admin/${title.toLowerCase()}`}
              key={title}
            >
              <div className="product-content">
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="product-price">Open module</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function PartnersSection() {
  const partners = [
    { name: "Catalog", image: "/placeholder.svg" },
    { name: "Calendly", image: "/placeholder.svg" },
    { name: "Monday", image: "/placeholder.svg" },
    { name: "GitHub", image: "/placeholder.svg" },
    { name: "Quotient", image: "/placeholder.svg" },
  ];

  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-4">
            <div
              className="bg-info rounded-circle"
              style={{ width: "8px", height: "8px" }}
            ></div>
            <span className="text-info">OUR TOP PARTNER</span>
            <div
              className="bg-info rounded-circle"
              style={{ width: "8px", height: "8px" }}
            ></div>
          </div>
        </div>
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center">
          {partners.map((partner, index) => (
            <div key={index} className="col">
              <div className="p-4 h-100 d-flex align-items-center justify-content-center">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="img-fluid opacity-50 hover-opacity-100 transition-opacity"
                  style={{ maxHeight: "40px" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

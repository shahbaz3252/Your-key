import "./CovetedLocations.css";

const locations = [
  {
    id: "01",
    name: "Dubai",
    subtitle: "World-Class Living",
    category: "UAE · Community",
    cta: "Discover Area",
    image: "/images/dubai-skyline.png",
    className: "location-card-dubai",
  },
  {
    id: "02",
    name: "Abu Dhabi",
    subtitle: "Capital Living",
    category: "UAE · Community",
    cta: "Discover Area",
    image: "/images/abudhabi-skyline.png",
    className: "location-card-abudhabi",
  },
];

export default function CovetedLocations() {
  return (
    <section className="coveted-locations-section">
      <div className="coveted-locations-container">

        {/* ================================================
            HEADER
        ================================================ */}

        <div className="coveted-locations-header">

          <div className="coveted-locations-heading-wrap">

            <div className="coveted-locations-eyebrow">
              <span className="eyebrow-number">
                07
              </span>

              <span className="eyebrow-line" />

              <span className="eyebrow-text">
                Signature Communities
              </span>
            </div>

            <h2 className="coveted-locations-heading">
              <span className="heading-line heading-white">
                Places with
              </span>

              <span className="heading-line heading-gold">
                character.
              </span>
            </h2>

          </div>


          <div className="coveted-locations-intro-wrap">

            <p className="coveted-locations-intro">
              Explore two of the UAE&apos;s most
              distinctive destinations, each shaped
              by world-class architecture, lifestyle
              and investment opportunity.
            </p>

            <a
              href="/communities"
              className="coveted-locations-link"
            >
              Explore Communities

              <span className="coveted-locations-link-arrow">
                ↗
              </span>
            </a>

          </div>

        </div>


        {/* ================================================
            LOCATION GRID
        ================================================ */}

        <div className="coveted-locations-grid">

          {locations.map((location) => (

            <article
              key={location.id}
              className={`
                location-card
                ${location.className}
              `}
            >

              <div className="location-card-image-wrap">

                <img
                  src={location.image}
                  alt={location.name}
                  className="location-card-image"
                />

                <div className="location-card-overlay" />

              </div>


              <div className="location-card-top">

                <span className="location-card-id">
                  {location.id}
                </span>

                <span className="location-card-subtitle">
                  {location.subtitle}
                </span>

              </div>


              <div className="location-card-content">

                <span className="location-card-category">
                  {location.category}
                </span>

                <h3 className="location-card-title">
                  {location.name}
                </h3>

                <span className="location-card-cta">
                  {location.cta}
                </span>

              </div>

            </article>

          ))}

        </div>

      </div>
    </section>
  );
}
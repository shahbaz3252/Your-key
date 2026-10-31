"use client";

import Link from "next/link";

import "./PropertyValuation.css";


export default function PropertyValuation() {
  return (
    <section className="valuation-luxury-section">

      <div className="valuation-luxury-orb valuation-luxury-orb-one" />
      <div className="valuation-luxury-orb valuation-luxury-orb-two" />

      <div className="valuation-luxury-container">

        <div className="valuation-luxury-panel">

          <div className="valuation-luxury-copy">

            <div className="valuation-luxury-kicker">

              <span>
                11
              </span>

              <i />

              <small>
                PROPERTY VALUATION
              </small>

            </div>


            <h2>
              Know what your
              <span>
                property is worth.
              </span>
            </h2>


            <p className="valuation-luxury-description">
              Understand your property’s position in the current UAE market
              with considered valuation guidance, local insight and a clearer
              view of your next move.
            </p>


            <div className="valuation-luxury-actions">

              <Link
                href="/contact"
                className="valuation-luxury-primary"
              >
                REQUEST A VALUATION

                <span>
                  ↗
                </span>
              </Link>


              <Link
                href="/contact"
                className="valuation-luxury-secondary"
              >
                SPEAK WITH AN ADVISOR

                <span>
                  →
                </span>
              </Link>

            </div>

          </div>


          <div className="valuation-luxury-card">

            <div className="valuation-luxury-card-head">

              <small>
                PRIVATE CLIENT VALUATION
              </small>

              <span>
                UAE · RESIDENTIAL
              </span>

            </div>


            <div className="valuation-luxury-card-title">

              <strong>
                A clearer view
              </strong>

              <span>
                before your next move.
              </span>

            </div>


            <div className="valuation-luxury-metrics">

              <div className="valuation-luxury-metric">

                <span>
                  01
                </span>

                <strong>
                  Local
                </strong>

                <small>
                  Area-based market insight
                </small>

              </div>


              <div className="valuation-luxury-metric">

                <span>
                  02
                </span>

                <strong>
                  Clear
                </strong>

                <small>
                  Comparable-led guidance
                </small>

              </div>


              <div className="valuation-luxury-metric">

                <span>
                  03
                </span>

                <strong>
                  Personal
                </strong>

                <small>
                  One-to-one advisory support
                </small>

              </div>

            </div>


            <div className="valuation-luxury-card-footer">

              <span>
                YOURKEY
              </span>

              <i />

              <small>
                CONSIDERED PROPERTY GUIDANCE
              </small>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
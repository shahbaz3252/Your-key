import "./Agents.css";


const agents = [
  {
    id: "01",

    name:
      "Sohail Ahmed",

    role:
      "REAL ESTATE BROKER",

    image:
      "/images/agents/sohail-ahmed.png",

    description:
      "Sohail is a young, energetic and charismatic person that strives on delivering the best to his clients. Customer service is a top priority for Sohail and he firmly believes that hard work, trust and strong interpersonal skills is the formula for success.",

    phone:
      "#",

    email:
      "#",
  },

  {
    id: "02",

    name:
      "Sultan Umar",

    role:
      "REAL ESTATE AGENT",

    image:
      "/images/agents/sultan-umar.png",

    description:
      "Specialising in waterfront and prime Dubai investments.",

    phone:
      "#",

    email:
      "#",
  },

  {
    id: "03",

    name:
      "Aanis Khalil",

    role:
      "PROPERTY PORTFOLIO MANAGER",

    image:
      "/images/agents/aanis-khalil.png",

    description:
      "Represented property owners and investors in the sale and leasing of residential and commercial properties while ensuring a seamless client experience.",

    phone:
      "#",

    email:
      "#",
  },

  {
    id: "04",

    name:
      "Sameet Kumar",

    role:
      "REAL ESTATE ADVISER",

    image:
      "/images/agents/sameet-kumar.png",

    description:
      "Real Estate Advisor | Rentals • Sales • Property Management | Abu Dhabi",

    phone:
      "#",

    email:
      "#",
  },
];


export default function AgentsPage() {
  return (
    <main className="agents-page">

      {/* ==================================================
          HERO
      ================================================== */}

      <section className="agents-hero">

        <div className="agents-grid-bg" />

        <div className="agents-hero-orbit agents-hero-orbit-one" />

        <div className="agents-hero-orbit agents-hero-orbit-two" />


        <div className="agents-container">

          <div className="agents-hero-content">

            <div className="agents-kicker">

              <i />

              <span>
                THE EXPERTS
              </span>

            </div>


            <h1>

              Meet The

              <span>
                Team
              </span>

            </h1>


            <p>
              A dedicated team of specialists guiding you
              through every step of buying, selling,
              renting, and investing across Dubai &amp;
              Abu Dhabi.
            </p>

          </div>

        </div>

      </section>


      {/* ==================================================
          TEAM SECTION
      ================================================== */}

      <section className="agents-team-section">

        <div className="agents-container">

          <div className="agents-section-top">

            <div>

              <div className="agents-section-label">
                OUR PEOPLE
              </div>


              <h2>

                Expertise behind

                <span>
                  every move.
                </span>

              </h2>

            </div>


            <p>
              Local market knowledge, personal guidance
              and long-term relationships are at the
              centre of how we work.
            </p>

          </div>


          {/* TEAM GRID */}

          <div className="agents-team-grid">

            {agents.map(
              agent => (

                <article
                  key={
                    agent.id
                  }
                  className="agent-card"
                >

                  <div className="agent-card-number">
                    {agent.id}
                  </div>


                  {/* ======================================
                      AGENT IMAGE
                  ====================================== */}

                  <div className="agent-image-area">

                    <div className="agent-image-ring">

                      <img
                        src={
                          agent.image
                        }
                        alt={
                          agent.name
                        }
                        loading="lazy"
                      />

                    </div>

                  </div>


                  {/* ======================================
                      CONTENT
                  ====================================== */}

                  <div className="agent-card-content">

                    <h3>
                      {agent.name}
                    </h3>


                    <div className="agent-role">
                      {agent.role}
                    </div>


                    <p>
                      {agent.description}
                    </p>

                  </div>


                  {/* ======================================
                      BOTTOM
                  ====================================== */}

                  <div className="agent-card-bottom">

                    <span className="agent-card-rule" />


                    <div className="agent-actions">

                      <a
                        href={
                          agent.phone
                        }
                        aria-label={
                          `Call ${agent.name}`
                        }
                        className="agent-action"
                      >
                        <PhoneIcon />
                      </a>


                      <a
                        href={
                          agent.email
                        }
                        aria-label={
                          `Email ${agent.name}`
                        }
                        className="agent-action"
                      >
                        <EmailIcon />
                      </a>

                    </div>

                  </div>


                  <div className="agent-card-orbit" />

                </article>

              )
            )}

          </div>

        </div>

      </section>

    </main>
  );
}


/* ==========================================================
   PHONE ICON
========================================================== */

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.6 10.8c1.5 3 3.8 5.3 6.8 6.8l2.3-2.3c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.1 21 3 12.9 3 3.4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


/* ==========================================================
   EMAIL ICON
========================================================== */

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M4.5 7L12 13L19.5 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
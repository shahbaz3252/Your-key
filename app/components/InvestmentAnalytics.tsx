"use client";

import {
  useMemo,
  useState,
} from "react";

import "./InvestmentAnalytics.css";


type ToolTab =
  | "mortgage"
  | "amortization"
  | "refinancing"
  | "rent-vs-buy"
  | "affordability";


const AED = new Intl.NumberFormat(
  "en-US",
  {
    maximumFractionDigits: 0,
  }
);


function money(value: number) {
  if (!Number.isFinite(value)) {
    return "AED 0";
  }

  return `AED ${AED.format(
    Math.max(0, value)
  )}`;
}


function mortgagePayment(
  principal: number,
  annualRate: number,
  years: number
) {
  if (
    principal <= 0 ||
    years <= 0
  ) {
    return 0;
  }

  const months =
    years * 12;

  const monthlyRate =
    annualRate / 100 / 12;


  if (monthlyRate === 0) {
    return principal / months;
  }


  return (
    principal *
    (
      monthlyRate *
      Math.pow(
        1 + monthlyRate,
        months
      )
    )
    /
    (
      Math.pow(
        1 + monthlyRate,
        months
      ) - 1
    )
  );
}


function presentValue(
  monthlyPayment: number,
  annualRate: number,
  years: number
) {
  const monthlyRate =
    annualRate / 100 / 12;

  const months =
    years * 12;


  if (monthlyRate === 0) {
    return monthlyPayment * months;
  }


  return (
    monthlyPayment *
    (
      1 -
      Math.pow(
        1 + monthlyRate,
        -months
      )
    )
    /
    monthlyRate
  );
}


function RangeRow({
  label,
  value,
  min,
  max,
  step,
  displayValue,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  displayValue: string;
  onChange: (
    value: number
  ) => void;
}) {

  const progress =
    ((value - min) /
      (max - min)) *
    100;


  return (
    <div className="mortgage-field">

      <div className="mortgage-field-head">

        <label>
          {label}
        </label>

        <span>
          {displayValue}
        </span>

      </div>


      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) =>
          onChange(
            Number(
              event.target.value
            )
          )
        }
        className="mortgage-range"
        style={
          {
            "--range-progress":
              `${progress}%`,
          } as React.CSSProperties
        }
      />

    </div>
  );
}


function ResultBox({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="mortgage-result-box">

      <small>
        {label}
      </small>

      <strong
        className={
          accent
            ? "mortgage-result-accent"
            : ""
        }
      >
        {value}
      </strong>

    </div>
  );
}


/* ==========================================================
   SIMPLE LINE GRAPH
========================================================== */

function LineChart({
  first,
  second,
  years,
  firstLabel,
  secondLabel,
}: {
  first: number[];
  second: number[];
  years: number;
  firstLabel: string;
  secondLabel: string;
}) {

  const width = 1000;
  const height = 320;

  const paddingX = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const values = [
    ...first,
    ...second,
  ];

  const maxValue =
    Math.max(
      ...values,
      1
    );

  const minValue =
    Math.min(
      ...values,
      0
    );

  const range =
    Math.max(
      maxValue - minValue,
      1
    );


  const getX = (
    index: number,
    total: number
  ) => {

    if (total <= 1) {
      return paddingX;
    }

    return (
      paddingX +
      (
        index /
        (total - 1)
      ) *
      (
        width -
        paddingX * 2
      )
    );
  };


  const getY = (
    value: number
  ) => {
    return (
      paddingTop +
      (
        (
          maxValue - value
        )
        /
        range
      ) *
      (
        height -
        paddingTop -
        paddingBottom
      )
    );
  };


  const makePath = (
    valuesArray: number[]
  ) => {
    return valuesArray
      .map(
        (
          value,
          index
        ) => {
          const x =
            getX(
              index,
              valuesArray.length
            );

          const y =
            getY(value);

          return `${
            index === 0
              ? "M"
              : "L"
          } ${x} ${y}`;
        }
      )
      .join(" ");
  };


  const labels = Array.from(
    {
      length:
        years + 1,
    },
    (_, index) =>
      index
  );


  return (
    <div className="mortgage-line-chart">

      <div className="mortgage-chart-title">
        {firstLabel}
      </div>


      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >

        {[0, 1, 2, 3, 4].map(
          (line) => {

            const y =
              30 +
              line * 62;

            return (
              <line
                key={line}
                x1="0"
                y1={y}
                x2={width}
                y2={y}
                className="mortgage-chart-grid"
              />
            );
          }
        )}


        <path
          d={makePath(first)}
          className="mortgage-chart-line mortgage-chart-line-one"
        />


        <path
          d={makePath(second)}
          className="mortgage-chart-line mortgage-chart-line-two"
        />

      </svg>


      <div className="mortgage-year-axis">

        {labels.map(
          (
            year,
            index
          ) => {

            if (
              years > 15 &&
              index % 2 !== 0 &&
              index !== years
            ) {
              return null;
            }

            return (
              <span key={year}>
                Y{year || 1}
              </span>
            );
          }
        )}

      </div>


      <div className="mortgage-chart-legend">

        <span>
          <i className="mortgage-dot mortgage-dot-one" />
          {firstLabel}
        </span>

        <span>
          <i className="mortgage-dot mortgage-dot-two" />
          {secondLabel}
        </span>

      </div>

    </div>
  );
}


/* ==========================================================
   MAIN COMPONENT
========================================================== */

export default function InvestmentAnalytics() {

  const [
    activeTab,
    setActiveTab,
  ] =
    useState<ToolTab>(
      "mortgage"
    );


  /* ========================================================
     MORTGAGE
  ======================================================== */

  const [
    propertyPrice,
    setPropertyPrice,
  ] =
    useState(1500000);

  const [
    downPayment,
    setDownPayment,
  ] =
    useState(25);

  const [
    interestRate,
    setInterestRate,
  ] =
    useState(4.5);

  const [
    loanPeriod,
    setLoanPeriod,
  ] =
    useState(25);


  const mortgage =
    useMemo(() => {

      const downAmount =
        propertyPrice *
        (
          downPayment /
          100
        );

      const loanAmount =
        propertyPrice -
        downAmount;

      const monthly =
        mortgagePayment(
          loanAmount,
          interestRate,
          loanPeriod
        );

      const totalRepayment =
        monthly *
        loanPeriod *
        12;

      const totalInterest =
        totalRepayment -
        loanAmount;


      return {
        downAmount,
        loanAmount,
        monthly,
        totalRepayment,
        totalInterest,
      };

    }, [
      propertyPrice,
      downPayment,
      interestRate,
      loanPeriod,
    ]);


  /* ========================================================
     AMORTIZATION
  ======================================================== */

  const amortizationData =
    useMemo(() => {

      const balance:
        number[] = [];

      const equity:
        number[] = [];

      const principal =
        mortgage.loanAmount;

      let remaining =
        principal;

      const monthlyRate =
        interestRate /
        100 /
        12;


      for (
        let year = 0;
        year <= loanPeriod;
        year++
      ) {

        balance.push(
          Math.max(
            remaining,
            0
          )
        );

        equity.push(
          Math.max(
            principal -
            remaining,
            0
          )
        );


        for (
          let month = 0;
          month < 12 &&
          remaining > 0;
          month++
        ) {

          const interest =
            remaining *
            monthlyRate;

          const principalPaid =
            mortgage.monthly -
            interest;

          remaining -=
            principalPaid;
        }
      }


      return {
        balance,
        equity,
      };

    }, [
      mortgage.loanAmount,
      mortgage.monthly,
      interestRate,
      loanPeriod,
    ]);


  /* ========================================================
     REFINANCING
  ======================================================== */

  const [
    refinanceBalance,
    setRefinanceBalance,
  ] =
    useState(1000000);

  const [
    currentRate,
    setCurrentRate,
  ] =
    useState(5.5);

  const [
    newRate,
    setNewRate,
  ] =
    useState(4);

  const [
    remainingPeriod,
    setRemainingPeriod,
  ] =
    useState(20);


  const refinance =
    useMemo(() => {

      const currentMonthly =
        mortgagePayment(
          refinanceBalance,
          currentRate,
          remainingPeriod
        );

      const newMonthly =
        mortgagePayment(
          refinanceBalance,
          newRate,
          remainingPeriod
        );

      const monthlySaving =
        Math.max(
          currentMonthly -
          newMonthly,
          0
        );

      const lifetimeSaving =
        monthlySaving *
        remainingPeriod *
        12;


      return {
        currentMonthly,
        newMonthly,
        monthlySaving,
        lifetimeSaving,
      };

    }, [
      refinanceBalance,
      currentRate,
      newRate,
      remainingPeriod,
    ]);


  /* ========================================================
     RENT VS BUY
  ======================================================== */

  const [
    rentPropertyPrice,
    setRentPropertyPrice,
  ] =
    useState(1500000);

  const [
    annualRent,
    setAnnualRent,
  ] =
    useState(90000);

  const [
    appreciation,
    setAppreciation,
  ] =
    useState(5);

  const [
    horizon,
    setHorizon,
  ] =
    useState(10);


  const rentVsBuy =
    useMemo(() => {

      const buyCosts:
        number[] = [];

      const rentCosts:
        number[] = [];


      const down =
        rentPropertyPrice *
        0.25;

      const principal =
        rentPropertyPrice -
        down;

      const monthly =
        mortgagePayment(
          principal,
          4.5,
          25
        );


      for (
        let year = 0;
        year <= horizon;
        year++
      ) {

        const propertyValue =
          rentPropertyPrice *
          Math.pow(
            1 +
            appreciation /
            100,
            year
          );

        const paymentsMade =
          monthly *
          12 *
          year;

        const equityGain =
          propertyValue -
          rentPropertyPrice;

        const buyingNetCost =
          down +
          paymentsMade -
          equityGain;


        const rentCost =
          annualRent *
          (
            (
              Math.pow(
                1.03,
                year
              ) - 1
            )
            /
            0.03
          );


        buyCosts.push(
          buyingNetCost
        );

        rentCosts.push(
          rentCost
        );
      }


      const finalBuy =
        buyCosts[
          buyCosts.length - 1
        ];

      const finalRent =
        rentCosts[
          rentCosts.length - 1
        ];


      return {
        buyCosts,
        rentCosts,

        verdict:
          finalBuy < finalRent
            ? "Buying wins long-term"
            : "Renting wins long-term",
      };

    }, [
      rentPropertyPrice,
      annualRent,
      appreciation,
      horizon,
    ]);


  /* ========================================================
     AFFORDABILITY
  ======================================================== */

  const [
    monthlyIncome,
    setMonthlyIncome,
  ] =
    useState(40000);

  const [
    monthlyDebts,
    setMonthlyDebts,
  ] =
    useState(3000);

  const [
    savings,
    setSavings,
  ] =
    useState(500000);

  const [
    affordabilityRate,
    setAffordabilityRate,
  ] =
    useState(4.5);


  const affordability =
    useMemo(() => {

      const maxMonthly =
        Math.max(
          monthlyIncome *
          0.5 -
          monthlyDebts,
          0
        );

      const maxLoan =
        presentValue(
          maxMonthly,
          affordabilityRate,
          25
        );

      const maxProperty =
        maxLoan +
        savings;


      return {
        maxMonthly,
        maxLoan,
        maxProperty,
      };

    }, [
      monthlyIncome,
      monthlyDebts,
      savings,
      affordabilityRate,
    ]);


  const tabs:
    {
      id: ToolTab;
      label: string;
    }[] =
    [
      {
        id: "mortgage",
        label:
          "MORTGAGE CALCULATOR",
      },
      {
        id: "amortization",
        label:
          "AMORTIZATION",
      },
      {
        id: "refinancing",
        label:
          "REFINANCING",
      },
      {
        id: "rent-vs-buy",
        label:
          "RENT VS BUY",
      },
      {
        id: "affordability",
        label:
          "HOUSE AFFORDABILITY",
      },
    ];


  return (
    <section className="investment-section">

      <div className="investment-container">


        {/* ==================================================
            TOP CONTENT
        ================================================== */}

        <div className="investment-top">

          <div className="investment-heading">

            <div className="investment-eyebrow">
              <span>06</span>

              <i />

              INVESTMENT INTELLIGENCE
            </div>


            <h2>
              Decisions backed
              <span>
                by perspective.
              </span>
            </h2>

          </div>


          <div className="investment-copy">

            <p>
              Explore market signals,
              property performance and
              opportunities designed to
              support more informed
              real-estate decisions.
            </p>


            <div className="investment-market-meta">

              <span>
                UAE MARKET
              </span>

              <i />

              <span>
                LIVE INSIGHT
              </span>

            </div>

          </div>

        </div>


        {/* ==================================================
            STATS
        ================================================== */}

        <div className="investment-stats">

          <div className="investment-stat">

            <small>
              01
            </small>

            <strong>
              15+
            </strong>

            <span>
              Prime Communities
            </span>

          </div>


          <div className="investment-stat">

            <small>
              02
            </small>

            <strong>
              4,500+
            </strong>

            <span>
              Selected Residences
            </span>

          </div>


          <div className="investment-stat">

            <small>
              03
            </small>

            <strong>
              12k+
            </strong>

            <span>
              Market Opportunities
            </span>

          </div>


          <div className="investment-stat">

            <small>
              04
            </small>

            <strong>
              2.8B+
            </strong>

            <span>
              AED Property Value
            </span>

          </div>

        </div>


        {/* ==================================================
            MORTGAGE TOOLS
        ================================================== */}

        <div className="mortgage-tools">

          <div className="mortgage-tools-heading">

            <h3>
              Mortgage Tools
            </h3>

            <p>
              Plan every financial angle
              of your purchase.
            </p>

          </div>


          <div className="mortgage-tools-divider" />


          {/* ================================================
              TABS
          ================================================= */}

          <div className="mortgage-tabs">

            {tabs.map(
              (tab) => (

                <button
                  key={tab.id}
                  type="button"
                  className={
                    activeTab ===
                    tab.id
                      ? "mortgage-tab active"
                      : "mortgage-tab"
                  }
                  onClick={() =>
                    setActiveTab(
                      tab.id
                    )
                  }
                >
                  {tab.label}
                </button>

              )
            )}

          </div>


          {/* ================================================
              MORTGAGE CALCULATOR
          ================================================= */}

          {activeTab ===
            "mortgage" && (

            <div className="mortgage-layout mortgage-layout-calculator">


              <div className="mortgage-controls">

                <RangeRow
                  label="PROPERTY PRICE"
                  value={
                    propertyPrice
                  }
                  min={500000}
                  max={10000000}
                  step={50000}
                  displayValue={
                    money(
                      propertyPrice
                    )
                  }
                  onChange={
                    setPropertyPrice
                  }
                />


                <RangeRow
                  label="DOWN PAYMENT"
                  value={
                    downPayment
                  }
                  min={5}
                  max={80}
                  step={1}
                  displayValue={
                    `${downPayment} %`
                  }
                  onChange={
                    setDownPayment
                  }
                />


                <RangeRow
                  label="INTEREST RATE"
                  value={
                    interestRate
                  }
                  min={1}
                  max={12}
                  step={0.05}
                  displayValue={
                    `${interestRate.toFixed(
                      2
                    )} %`
                  }
                  onChange={
                    setInterestRate
                  }
                />


                <RangeRow
                  label="LOAN PERIOD"
                  value={
                    loanPeriod
                  }
                  min={5}
                  max={30}
                  step={1}
                  displayValue={
                    `${loanPeriod} yrs`
                  }
                  onChange={
                    setLoanPeriod
                  }
                />


                <div className="mortgage-result-grid">

                  <ResultBox
                    label="DOWN PAYMENT"
                    value={
                      money(
                        mortgage.downAmount
                      )
                    }
                  />


                  <ResultBox
                    label="TOTAL INTEREST"
                    value={
                      money(
                        mortgage.totalInterest
                      )
                    }
                    accent
                  />

                </div>

              </div>


              <div className="mortgage-primary-result">

                <div className="mortgage-donut">

                  <div
                    className="mortgage-donut-circle"
                    style={
                      {
                        "--down-angle":
                          `${
                            downPayment *
                            3.6
                          }deg`,
                      } as React.CSSProperties
                    }
                  >
                    <div className="mortgage-donut-hole" />
                  </div>


                  <div className="mortgage-donut-legend">

                    <span>
                      <i className="legend-down" />
                      DOWN PAYMENT
                    </span>

                    <span>
                      <i className="legend-loan" />
                      LOAN
                    </span>

                  </div>

                </div>


                <div className="mortgage-monthly">

                  <strong>
                    {money(
                      mortgage.monthly
                    )}
                  </strong>

                  <span>
                    MONTHLY PAYMENT
                  </span>

                </div>


                <div className="mortgage-total">

                  <small>
                    TOTAL LOAN AMOUNT
                  </small>

                  <strong>
                    {money(
                      mortgage.loanAmount
                    )}
                  </strong>


                  <div className="mortgage-total-actions">

                    <button type="button">
                      VIEW UNITS
                    </button>

                    <button type="button">
                      GET PRE-APPROVAL
                    </button>

                  </div>

                </div>

              </div>

            </div>

          )}


          {/* ================================================
              AMORTIZATION
          ================================================= */}

          {activeTab ===
            "amortization" && (

            <div className="mortgage-layout">


              <div className="mortgage-controls">

                <RangeRow
                  label="LOAN AMOUNT"
                  value={
                    mortgage.loanAmount
                  }
                  min={250000}
                  max={8000000}
                  step={25000}
                  displayValue={
                    money(
                      mortgage.loanAmount
                    )
                  }
                  onChange={(
                    value
                  ) => {

                    const newPrice =
                      value /
                      (
                        1 -
                        downPayment /
                        100
                      );

                    setPropertyPrice(
                      Math.round(
                        newPrice
                      )
                    );
                  }}
                />


                <RangeRow
                  label="INTEREST RATE"
                  value={
                    interestRate
                  }
                  min={1}
                  max={12}
                  step={0.05}
                  displayValue={
                    `${interestRate.toFixed(
                      2
                    )} %`
                  }
                  onChange={
                    setInterestRate
                  }
                />


                <RangeRow
                  label="LOAN PERIOD"
                  value={
                    loanPeriod
                  }
                  min={5}
                  max={30}
                  step={1}
                  displayValue={
                    `${loanPeriod} yrs`
                  }
                  onChange={
                    setLoanPeriod
                  }
                />


                <ResultBox
                  label="TOTAL INTEREST PAID"
                  value={
                    money(
                      mortgage.totalInterest
                    )
                  }
                  accent
                />


                <ResultBox
                  label="TOTAL REPAYMENT"
                  value={
                    money(
                      mortgage.totalRepayment
                    )
                  }
                />

              </div>


              <LineChart
                first={
                  amortizationData.balance
                }
                second={
                  amortizationData.equity
                }
                years={
                  loanPeriod
                }
                firstLabel="BALANCE"
                secondLabel="EQUITY"
              />

            </div>

          )}


          {/* ================================================
              REFINANCING
          ================================================= */}

          {activeTab ===
            "refinancing" && (

            <div className="mortgage-layout">


              <div className="mortgage-controls">

                <RangeRow
                  label="OUTSTANDING BALANCE"
                  value={
                    refinanceBalance
                  }
                  min={100000}
                  max={5000000}
                  step={25000}
                  displayValue={
                    money(
                      refinanceBalance
                    )
                  }
                  onChange={
                    setRefinanceBalance
                  }
                />


                <RangeRow
                  label="CURRENT RATE"
                  value={
                    currentRate
                  }
                  min={1}
                  max={12}
                  step={0.05}
                  displayValue={
                    `${currentRate.toFixed(
                      2
                    )} %`
                  }
                  onChange={
                    setCurrentRate
                  }
                />


                <RangeRow
                  label="NEW RATE"
                  value={
                    newRate
                  }
                  min={1}
                  max={12}
                  step={0.05}
                  displayValue={
                    `${newRate.toFixed(
                      2
                    )} %`
                  }
                  onChange={
                    setNewRate
                  }
                />


                <RangeRow
                  label="REMAINING PERIOD"
                  value={
                    remainingPeriod
                  }
                  min={5}
                  max={30}
                  step={1}
                  displayValue={
                    `${remainingPeriod} yrs`
                  }
                  onChange={
                    setRemainingPeriod
                  }
                />

              </div>


              <div className="refinance-results">

                <div className="refinance-top-results">

                  <ResultBox
                    label="CURRENT MONTHLY"
                    value={
                      money(
                        refinance.currentMonthly
                      )
                    }
                  />


                  <ResultBox
                    label="NEW MONTHLY"
                    value={
                      money(
                        refinance.newMonthly
                      )
                    }
                    accent
                  />

                </div>


                <div className="refinance-saving">

                  <small>
                    ESTIMATED LIFETIME SAVING
                  </small>

                  <strong>
                    {money(
                      refinance.lifetimeSaving
                    )}
                  </strong>

                  <span>
                    {money(
                      refinance.monthlySaving
                    )}{" "}
                    saved every month
                  </span>

                </div>

              </div>

            </div>

          )}


          {/* ================================================
              RENT VS BUY
          ================================================= */}

          {activeTab ===
            "rent-vs-buy" && (

            <div className="mortgage-layout">


              <div className="mortgage-controls">

                <RangeRow
                  label="PROPERTY PRICE"
                  value={
                    rentPropertyPrice
                  }
                  min={500000}
                  max={8000000}
                  step={50000}
                  displayValue={
                    money(
                      rentPropertyPrice
                    )
                  }
                  onChange={
                    setRentPropertyPrice
                  }
                />


                <RangeRow
                  label="ANNUAL RENT"
                  value={
                    annualRent
                  }
                  min={30000}
                  max={500000}
                  step={5000}
                  displayValue={
                    money(
                      annualRent
                    )
                  }
                  onChange={
                    setAnnualRent
                  }
                />


                <RangeRow
                  label="APPRECIATION"
                  value={
                    appreciation
                  }
                  min={0}
                  max={12}
                  step={0.5}
                  displayValue={
                    `${appreciation.toFixed(
                      1
                    )} %`
                  }
                  onChange={
                    setAppreciation
                  }
                />


                <RangeRow
                  label="HORIZON"
                  value={
                    horizon
                  }
                  min={2}
                  max={25}
                  step={1}
                  displayValue={
                    `${horizon} yrs`
                  }
                  onChange={
                    setHorizon
                  }
                />


                <div className="rent-buy-verdict">

                  <small>
                    VERDICT
                  </small>

                  <strong>
                    {
                      rentVsBuy.verdict
                    }
                  </strong>

                </div>

              </div>


              <LineChart
                first={
                  rentVsBuy.buyCosts
                }
                second={
                  rentVsBuy.rentCosts
                }
                years={
                  horizon
                }
                firstLabel="BUYING"
                secondLabel="RENTING"
              />

            </div>

          )}


          {/* ================================================
              HOUSE AFFORDABILITY
          ================================================= */}

          {activeTab ===
            "affordability" && (

            <div className="mortgage-layout">


              <div className="mortgage-controls">

                <RangeRow
                  label="MONTHLY INCOME"
                  value={
                    monthlyIncome
                  }
                  min={5000}
                  max={150000}
                  step={1000}
                  displayValue={
                    money(
                      monthlyIncome
                    )
                  }
                  onChange={
                    setMonthlyIncome
                  }
                />


                <RangeRow
                  label="MONTHLY DEBTS"
                  value={
                    monthlyDebts
                  }
                  min={0}
                  max={50000}
                  step={500}
                  displayValue={
                    money(
                      monthlyDebts
                    )
                  }
                  onChange={
                    setMonthlyDebts
                  }
                />


                <RangeRow
                  label="SAVINGS FOR DOWN PAYMENT"
                  value={
                    savings
                  }
                  min={50000}
                  max={3000000}
                  step={25000}
                  displayValue={
                    money(
                      savings
                    )
                  }
                  onChange={
                    setSavings
                  }
                />


                <RangeRow
                  label="INTEREST RATE"
                  value={
                    affordabilityRate
                  }
                  min={1}
                  max={12}
                  step={0.05}
                  displayValue={
                    `${affordabilityRate.toFixed(
                      2
                    )} %`
                  }
                  onChange={
                    setAffordabilityRate
                  }
                />

              </div>


              <div className="affordability-results">

                <div className="affordability-main">

                  <small>
                    YOU CAN AFFORD UP TO
                  </small>

                  <strong>
                    {money(
                      affordability.maxProperty
                    )}
                  </strong>

                </div>


                <div className="affordability-result-grid">

                  <ResultBox
                    label="MAX LOAN"
                    value={
                      money(
                        affordability.maxLoan
                      )
                    }
                  />


                  <ResultBox
                    label="MAX MONTHLY"
                    value={
                      money(
                        affordability.maxMonthly
                      )
                    }
                  />

                </div>


                <div className="affordability-bars">

                  <div className="affordability-bar-row">

                    <span>
                      Down Payment
                    </span>

                    <i
                      className="affordability-down-bar"
                      style={{
                        width:
                          `${Math.max(
                            (
                              savings /
                              affordability.maxProperty
                            ) *
                              100,
                            8
                          )}%`,
                      }}
                    />

                  </div>


                  <div className="affordability-bar-row">

                    <span>
                      Financed
                    </span>

                    <i
                      className="affordability-financed-bar"
                      style={{
                        width:
                          `${Math.max(
                            (
                              affordability.maxLoan /
                              affordability.maxProperty
                            ) *
                              100,
                            8
                          )}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </section>
  );
}
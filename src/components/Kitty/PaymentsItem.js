import React from "react";
import { compose, graphql } from "react-apollo";
import { getPayInKittyStatementsByMonth } from "./graphql/kittyStatements";
import { getPaymentsDueFromHousematesForMonth } from "./graphql/housemates";
import PaymentOwnerDropdown from "./PaymentOwnerDropdown";

const PaymentsItem = props => {
  const {
    month,
    getPaymentsDueFromHousematesForMonth: {
      getPaymentsDueFromHousematesForMonth: paymentsDue
    },
    getPayInKittyStatementsByMonth: {
      getPayInKittyStatementsByMonth: paymentsMade
    }
  } = props;

  if (!paymentsMade || !paymentsDue) <div>Loading...</div>;
  return (
    <div className="p-2 container">
      <h4>{month}</h4>
      <div className="columns">
        <div className="coumn col-5">
          <h5 className="m-2">Payments due from:</h5>

          {paymentsDue &&
            paymentsDue.map((payment, i) => {
              if (payment) {
                console.log("payment.monthsPaid", payment.monthsPaid);
                console.log("month", month);
                const { firstName, lastName } = payment;
                return (
                  <div
                    className="striped d-flex flex-center flex-between p-2 height-lg"
                    key={i}
                  >
                    <h5>{`${firstName} ${lastName}`}</h5>
                    <div>
                      <button className="btn btn-secondary btn-lg">
                        {payment.monthsPaid &&
                        payment.monthsPaid.includes(month)
                          ? "Paid"
                          : "Not Paid"}
                      </button>
                    </div>
                  </div>
                );
              }
            })}
        </div>
        <div className="coumn col-7">
          <h5 className="m-2">Payments recieved:</h5>

          {paymentsMade &&
            paymentsMade.map((payment, i) => {
              if (payment) {
                const { housemate, reference, amount } = payment;
                return (
                  <div
                    className="striped p-2 d-flex flex-end flex-between"
                    key={i}
                  >
                    <div>
                      <div>
                        <b>Housemate:</b>
                        {housemate ? (
                          <span>{` ${housemate.firstName} ${
                            housemate.lastName
                          }`}</span>
                        ) : (
                          <span> -</span>
                        )}
                      </div>
                      <div>
                        <b>Reference:</b>
                        {reference ? (
                          <span>{` ${reference}`}</span>
                        ) : (
                          <span> -</span>
                        )}
                      </div>
                      <div>
                        <b>Amount:</b>
                        {amount ? (
                          <span>{` £${amount}`}</span>
                        ) : (
                          <span> -</span>
                        )}
                      </div>
                    </div>
                    <PaymentOwnerDropdown month={month} />
                  </div>
                );
              }
            })}
        </div>
      </div>
      <div className="divider" />
    </div>
  );
};

export default compose(
  graphql(getPaymentsDueFromHousematesForMonth, {
    name: "getPaymentsDueFromHousematesForMonth",
    options: props => ({ variables: { month: props.month } })
  }),
  graphql(getPayInKittyStatementsByMonth, {
    name: "getPayInKittyStatementsByMonth",
    options: props => ({ variables: { month: props.month } })
  })
)(PaymentsItem);

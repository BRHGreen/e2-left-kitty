import React from "react";
import { compose, graphql } from "react-apollo";
import { getPayInKittyStatementsByMonth } from "./graphql/kittyStatements";
import { getPaymentsDueFromHousematesForMonth } from "./graphql/housemates";
import PaymentOwnerDropdown from "./PaymentOwnerDropdown";

const PaymentsDueItem = props => {
  // if (!paymentsMade || !paymentsDue) <div>Loading...</div>;
  return (
    <div className="p-2 container">
      {console.log(">>>", props)}
      {/* <h4>{month}</h4>
      <div className="columns">
        <div className="coumn col-5">
          {paymentsDue &&
            paymentsDue.map((payment, i) => {
              if (payment) {
                const hasPaid =
                  payment.monthsPaid && payment.monthsPaid.includes(month);

                const { firstName, lastName } = payment;
                return (
                  <div
                    className="striped d-flex flex-center flex-between p-2 height-lg"
                    key={i}
                  >
                    <h5>{`${firstName} ${lastName}`}</h5>
                    <div>
                      <span
                        className={`label label-${
                          hasPaid ? "primary" : "secondary"
                        }`}
                      >
                        {hasPaid ? "Paid" : "Not Paid"}
                      </span>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </div> */}
      Payment due item
    </div>
  );
};

export default compose(
  graphql(getPaymentsDueFromHousematesForMonth, {
    name: "getPaymentsDueFromHousematesForMonth",
    options: props => ({ variables: { month: props.month } })
  })
)(PaymentsDueItem);

import React from "react";
import { compose, graphql } from "react-apollo";
import { getPaymentsDueFromHousematesForMonth } from "./graphql/kittyStatements";

const PaymentsItem = props => {
  const {
    month,
    getPaymentsDueFromHousematesForMonth,
    getPaymentsDueFromHousematesForMonth: {
      getPaymentsDueFromHousematesForMonth: paymentsDue
    }
  } = props;
  if (getPaymentsDueFromHousematesForMonth.loading) <div>Loading...</div>;
  console.log(">>>", paymentsDue);
  return (
    <div className="p-2">
      <h4>{month}</h4>
      <b>Payments due from:</b>
      {paymentsDue &&
        paymentsDue.map(payment => {
          if (payment) {
            const { firstName, lastName } = payment;
            return (
              <div>
                <span>{`${firstName} ${lastName}`}</span>
              </div>
            );
          }
        })}
    </div>
  );
};

export default compose(
  graphql(getPaymentsDueFromHousematesForMonth, {
    name: "getPaymentsDueFromHousematesForMonth",
    options: props => ({ variables: { month: props.month } })
  })
)(PaymentsItem);

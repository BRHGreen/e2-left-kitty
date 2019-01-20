import React from "react";
import { compose, graphql } from "react-apollo";
import { getKittyMonths } from "./graphql/kittyStatements";
import PaymentsItem from "./PaymentsItem";

const PaymentRecords = ({ getKittyMonths }) => {
  // const months = [];
  // const kittyMonths =
  //   !getKittyMonths.loading &&
  //   getKittyMonths.getAllKittyStatements.forEach(({ month }) => {
  //     if (!months.includes(month)) {
  //       months.push(month);
  //     }
  //   });
  const months = ["07/2018", "06/2018", "05/2018", "04/2018", "03/2018"];
  console.log("months>>>", months);
  return (
    months.length > 0 &&
    months.map((month, i) => {
      return <PaymentsItem key={i} month={month} />;
    })
  );
};

export default compose(graphql(getKittyMonths, { name: "getKittyMonths" }))(
  PaymentRecords
);

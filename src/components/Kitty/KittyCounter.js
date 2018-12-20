import React from "react";
import {
  getPayInKittyStatementsByOwnerId,
  getAllKittyStatements,
  getKittyMonths
} from "./graphql/kittyStatements";
import { compose, graphql } from "react-apollo";
import moment from "moment";

const KittyCounter = ({
  getPayInKittyStatementsByOwnerId: {
    loading,
    error,
    getPayInKittyStatementsByOwnerId: statement
  },
  months
}) => {
  console.log(months);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Loading...</div>;
  return (
    <div>
      {statement.map(({ date, counterParty }) => (
        <div>
          {date}
          {counterParty[0]}
        </div>
      ))}
    </div>
  );
};

export default compose(
  graphql(getPayInKittyStatementsByOwnerId, {
    name: "getPayInKittyStatementsByOwnerId",
    options: props => ({ variables: { owner: props.housemate } })
  })
)(KittyCounter);

import React from "react";
import { compose, graphql } from "react-apollo";
import moment from "moment";
import gql from "graphql-tag";
import KittyCounter from "./Kitty/KittyCounter";

const Housemates = ({
  getHousemates: { allHousemates, loading, error },
  getKittyMonths
}) => {
  const formatDate = date => {
    if (date === null) {
      return "-";
    }
    return moment(parseInt(date)).format("MM/YYYY");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div className="p-2">
      <div>
        {allHousemates.map(
          (
            {
              id,
              firstName,
              lastName,
              isCurrentHousemate,
              contributingFrom,
              contributingTo
            },
            i
          ) => (
            <div key={i} className="striped">
              <div className="d-flex flex-baseline flex-between">
                {/* {console.log(housemate)} */}
                <h2>{`${firstName} ${lastName}`}</h2>
                <div>{`From: ${formatDate(contributingFrom)} To: ${formatDate(
                  contributingTo
                )}`}</div>
              </div>
              <KittyCounter housemate={id} months={months} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default compose(
  graphql(
    gql`
      {
        allHousemates {
          id
          firstName
          lastName
          isCurrentHousemate
          contributingFrom
          contributingTo
        }
      }
    `,
    { name: "getHousemates" }
  )
)(Housemates);

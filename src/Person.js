import React from "react";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";

const Person = ({ getHousemates: { allHousemates, loading, error } }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      {allHousemates.map((housemate, i) => (
        <p key={i}>{`Username: ${housemate.username}`}</p>
      ))}
    </div>
  );
};

export default compose(
  graphql(
    gql`
      {
        allHousemates {
          username
        }
      }
    `,
    { name: "getHousemates" }
  )
)(Person);

import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export default () => (
  <Query
    query={gql`
      {
        allHousemates {
          username
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return (
        <div>
          {console.log('data', data)}
          {
            data.allHousemates.map((housemate, i) => (
              <p key={i}>{`Username: ${housemate.username}`}</p>
          ))
          }
        </div>
      );
    }}
  </Query>
);
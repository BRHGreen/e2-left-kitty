import React from "react";
import { compose, graphql } from "react-apollo";
import moment from "moment";
import gql from "graphql-tag";

const Housemates = ({ getHousemates: { allHousemates, loading, error } }) => {
  const columnNames =
    !loading &&
    Object.keys(allHousemates[0]).filter(key => !key.includes("__"));

  const formatDate = date => {
    if (date === null) {
      return "-";
    }
    return moment(parseInt(date)).format("MM/YYYY");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {columnNames &&
              columnNames.map((heading, i) => <th key={i}>{heading}</th>)}
          </tr>
        </thead>
        <tbody>
          {allHousemates.map(
            (row, i) =>
              columnNames && (
                <tr key={i}>
                  {columnNames.map((columnName, i) => {
                    if (
                      columnName === "contributingFrom" ||
                      columnName === "contributingTo"
                    ) {
                      return <td key={i}>{formatDate(row[columnName])}</td>;
                    }
                    if (typeof row[columnName] !== "string") {
                      return <td key={i}>{row[columnName].toString()}</td>;
                    }
                    return <td key={i}>{row[columnName]}</td>;
                  })}
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default compose(
  graphql(
    gql`
      {
        allHousemates {
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

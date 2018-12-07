import React from "react";
import moment from "moment";
import { compose, graphql } from "react-apollo";
import getAllKittyStatements from "./graphql/getAllKittyStatements";
import getKittyStatementsByMonth from "./graphql/getKittyStatementsByMonth";
import allHousemates from "./graphql/allHousemates";

import Dropdown from "../Common/Dropdown";

class KittyStatements extends React.Component {
  state = {
    monthSelected: null,
    housemate: null,
    isOpen: false
  };

  getDropdownItems = {
    dates: () => {
      const { getAllKittyStatements } = this.props;
      const availableMonths = [];
      if (!getAllKittyStatements.loading) {
        getAllKittyStatements.getAllKittyStatements.map(statement => {
          if (!availableMonths.includes(statement.month)) {
            availableMonths.push(statement.month);
          }
          return null;
        });
        return availableMonths;
      }
      return null;
    },
    housemates: () => {
      const { allHousemates } = this.props;
      if (!allHousemates.loading) {
        return allHousemates.allHousemates.map(housemate => housemate);
      }
      return null;
    }
  };

  filterState = monthSelected => {
    this.setState({ monthSelected });
    this.props.getKittyStatementsByMonth.refetch({
      month: monthSelected
    });
  };
  assignHousemate = housemate => {
    this.setState({ housemate });
    console.log(">>>>", housemate);
    // console.log("housemate", housemate);
    // this.props.getKittyStatementsByMonth({
    //   housemate
    // });
  };

  render() {
    const {
      getKittyStatementsByMonth,
      allHousemates,
      loading,
      error
    } = this.props;

    const columnNames =
      !getKittyStatementsByMonth.loading &&
      getKittyStatementsByMonth.getKittyStatementsByMonth.length > 0 &&
      Object.keys(
        getKittyStatementsByMonth.getKittyStatementsByMonth[0]
      ).filter(key => !key.includes("__"));

    if (loading || getKittyStatementsByMonth.loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
      <div className="page-content">
        <Dropdown
          menuItems={this.getDropdownItems.dates()}
          onClick={monthSelected => this.filterState(monthSelected)}
          header="Select Month"
        />
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              {columnNames &&
                columnNames.map((heading, i) => <th key={i}>{heading}</th>)}
            </tr>
          </thead>
          <tbody>
            {!getKittyStatementsByMonth.loading &&
              getKittyStatementsByMonth.getKittyStatementsByMonth.map(
                (row, i) =>
                  columnNames && (
                    <tr key={i}>
                      {columnNames.map((_, i) => {
                        if (columnNames[i] === "date") {
                          return (
                            <td key={i}>
                              {moment(parseInt(row[columnNames[i]])).format(
                                "DD/MM/YY"
                              )}
                            </td>
                          );
                        }
                        if (columnNames[i] === "owner") {
                          return (
                            <td>
                              <Dropdown
                                menuItems={this.getDropdownItems.housemates()}
                                displayValue={"firstName"}
                                onClick={housemate =>
                                  this.assignHousemate(housemate)
                                }
                                header="Select Housemate"
                              />
                            </td>
                          );
                        }
                        return <td key={i}>{row[columnNames[i]]}</td>;
                      })}
                    </tr>
                  )
              )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default compose(
  graphql(getAllKittyStatements, {
    name: "getAllKittyStatements"
  }),
  graphql(getKittyStatementsByMonth, {
    name: "getKittyStatementsByMonth",
    options: { variables: { month: "02/2018" } }
  }),
  graphql(allHousemates, {
    name: "allHousemates"
    // options: { variables: { month: "02/2018" } }
  })
)(KittyStatements);

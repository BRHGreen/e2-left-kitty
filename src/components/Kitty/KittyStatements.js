import React from "react";
import moment from "moment";
import { compose, graphql } from "react-apollo";
import getAllKittyStatements from "./graphql/getAllKittyStatements";
import getKittyStatementsByMonth from "./graphql/getKittyStatementsByMonth";

import Dropdown from "../Common/Dropdown";

class KittyStatements extends React.Component {
  state = {
    monthSelected: null,
    isOpen: false
  };
  getDropdownItems = () => {
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
  };

  filterState = monthSelected => {
    this.setState({ monthSelected });
    this.props.getKittyStatementsByMonth.refetch({
      month: monthSelected
    });
  };

  render() {
    const {
      getAllKittyStatements,
      getKittyStatementsByMonth,
      loading
    } = this.props;

    const keys =
      !getKittyStatementsByMonth.loading &&
      getKittyStatementsByMonth.getKittyStatementsByMonth.length > 0 &&
      Object.keys(
        getKittyStatementsByMonth.getKittyStatementsByMonth[0]
      ).filter(key => !key.includes("__"));

    return loading || getKittyStatementsByMonth.loading ? null : (
      <div className="page-content">
        <Dropdown
          menuItems={this.getDropdownItems()}
          onClick={monthSelected => this.filterState(monthSelected)}
          header="Select Month"
        />
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              {keys && keys.map((heading, i) => <th key={i}>{heading}</th>)}
            </tr>
          </thead>
          <tbody>
            {!getKittyStatementsByMonth.loading &&
              getKittyStatementsByMonth.getKittyStatementsByMonth.map(
                (row, i) =>
                  keys && (
                    <tr key={i}>
                      {keys.map((_, i) => (
                        <td key={i}>
                          {keys[i] === "date"
                            ? moment(parseInt(row[keys[i]])).format("DD/MM/YY")
                            : row[keys[i]]}
                        </td>
                      ))}
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
  })
)(KittyStatements);

import React from "react";
import moment from "moment";
import { compose, graphql } from "react-apollo";
import {
  getKittyStatementsByMonth,
  getAllKittyStatements
} from "./graphql/kittyStatements";
import {
  allHousemates,
  assignHousemateToStatement
} from "./graphql/housemates";
import KittyOwnerDropdown from "./KittyOwnerDropdown";
import Dropdown from "../common/Dropdown";

class KittyStatements extends React.Component {
  state = {
    monthSelected: null,
    housemate: null,
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

    const monthCurrentlyDisplayed =
      !getKittyStatementsByMonth.loading &&
      moment(
        parseInt(getKittyStatementsByMonth.getKittyStatementsByMonth[0].date)
      ).format("MMMM YYYY");

    if (loading || getKittyStatementsByMonth.loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
      <div>
        <div className="p-2">
          <h1>{monthCurrentlyDisplayed}</h1>
          <Dropdown
            menuItems={this.getDropdownItems()}
            onClick={monthSelected => this.filterState(monthSelected)}
            header="Change month..."
            className="mb-2"
          />
        </div>

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
                            <td key={i}>
                              <KittyOwnerDropdown row={row} />
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
    name: "getKittyStatementsByMonth"
  }),
  graphql(allHousemates, {
    name: "allHousemates"
  })
)(KittyStatements);

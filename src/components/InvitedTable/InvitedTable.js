// IMPORT DEPENDENCIES
import React from "react";
// MATERIAL UI
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "material-ui/Table";
// IMPORT ICONS
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/fontawesome-free-solid";

// COMPONENT
const InvitedTable = ({
    invitedList = [],
    participantType = "team",
    rowClick,
    revokeInvite,
    showControls = false
}) => {
    let TableHeaders;
    let TableContent;
    if (showControls === true) {
        TableHeaders = (
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                selectable={false}
            >
                <TableRow
                    style={{
                        backgroundColor: "#222222"
                    }}
                >
                    <TableHeaderColumn colSpan="7">
                        {participantType === "player"
                            ? "PLAYER ALIAS"
                            : "TEAM NAME"}
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        colSpan="2"
                        style={{
                            textAlign: "center"
                        }}
                    >
                        UNINVITE
                    </TableHeaderColumn>
                </TableRow>
            </TableHeader>
        );
        TableContent = (
            <TableBody
                displayRowCheckbox={false}
                showRowHover={true}
                stripedRows={false}
            >
                {invitedList.map((invitee, index) => (
                    <TableRow
                        key={index}
                        selectable={false}
                        style={{
                            backgroundColor: "#3a3a3a"
                        }}
                        // onClick={e =>
                        //     this.handleRowClick(
                        //         invitee.id
                        //     )
                        // }
                    >
                        <TableRowColumn colSpan="7">
                            {
                                // invitee.name
                                "Name Here"
                            }
                        </TableRowColumn>
                        <TableRowColumn
                            colSpan="2"
                            style={{
                                textAlign: "center"
                            }}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </TableRowColumn>
                    </TableRow>
                ))}
            </TableBody>
        );
    } else {
        TableHeaders = (
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                selectable={false}
            >
                <TableRow
                    style={{
                        backgroundColor: "#222222"
                    }}
                >
                    <TableHeaderColumn>
                        {participantType === "player"
                            ? "PLAYER ALIAS"
                            : "TEAM NAME"}
                    </TableHeaderColumn>
                </TableRow>
            </TableHeader>
        );
        TableContent = (
            <TableBody
                displayRowCheckbox={false}
                showRowHover={true}
                stripedRows={false}
            >
                {invitedList.map((invitee, index) => (
                    <TableRow
                        key={index}
                        selectable={false}
                        style={{
                            backgroundColor: "#3a3a3a"
                        }}
                        // onClick={e =>
                        //     this.handleRowClick(
                        //         invitee.id
                        //     )
                        // }
                    >
                        <TableRowColumn>
                            {
                                // invitee.name
                                "Name Here"
                            }
                        </TableRowColumn>
                    </TableRow>
                ))}
            </TableBody>
        );
    }
    return (
        <div>
            <Table height="100%" fixedHeader={true}>
                {TableHeaders}
                {TableContent}
            </Table>
        </div>
    );
};

// EXPORT COMPONENT
export default InvitedTable;

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
const ParticipantTable = ({
    participantList = [],
    participantType = "player",
    rowClick = () => null,
    kickParticipant = () => null,
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
                    <TableHeaderColumn
                        colSpan="1"
                        style={{
                            textAlign: "center"
                        }}
                    >
                        SEED
                    </TableHeaderColumn>
                    <TableHeaderColumn colSpan="6">
                        {participantType === "player"
                            ? "PLAYER ALIAS"
                            : "TEAM NAME"}
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        colSpan="1"
                        style={{
                            textAlign: "center"
                        }}
                    >
                        REMOVE
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
                {participantList.map((participant, index) => (
                    <TableRow
                        key={index}
                        selectable={false}
                        style={{
                            backgroundColor: "#3a3a3a"
                        }}
                        // onClick={e =>
                        //     this.handleRowClick(
                        //         participant.id
                        //     )
                        // }
                    >
                        <TableRowColumn
                            colSpan="1"
                            style={{
                                textAlign: "center"
                            }}
                        >
                            {index + 1}
                        </TableRowColumn>
                        <TableRowColumn colSpan="6">
                            {participant.name}
                        </TableRowColumn>
                        <TableRowColumn
                            colSpan="1"
                            style={{
                                textAlign: "center"
                            }}
                        >
                            <FontAwesomeIcon
                                onClick={() =>
                                    kickParticipant(
                                        participant.bracket_id,
                                        participant.id
                                    )
                                }
                                style={{ color: "#d32f2f" }}
                                icon={faTimes}
                            />
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
                    <TableHeaderColumn
                        colSpan="1"
                        style={{
                            textAlign: "center"
                        }}
                    >
                        SEED
                    </TableHeaderColumn>
                    <TableHeaderColumn colSpan="6">
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
                {participantList.map((participant, index) => (
                    <TableRow
                        key={index}
                        selectable={false}
                        style={{
                            backgroundColor: "#3a3a3a"
                        }}
                        // onClick={e =>
                        //     this.handleRowClick(
                        //         participant.id
                        //     )
                        // }
                    >
                        <TableRowColumn
                            colSpan="1"
                            style={{
                                textAlign: "center"
                            }}
                        >
                            {index + 1}
                        </TableRowColumn>
                        <TableRowColumn colSpan="6">
                            {participant.name}
                        </TableRowColumn>
                    </TableRow>
                ))}
            </TableBody>
        );
    }
    return (
        <div className="ui-table-container">
            <Table height="100%" fixedHeader={true}>
                {TableHeaders}
                {TableContent}
            </Table>
        </div>
    );
};

export default ParticipantTable;

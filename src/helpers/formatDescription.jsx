import { createElement } from "react";

function formatDescription(desc) {
    const lines = desc.split('\n');
    let isTable = false;
    let tableRows = [];
    let tableHeader = null;
    const result = [];

    lines.forEach((line, index) => {
        // Replace bold text markers
        let formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Replace italic text markers
        formattedLine = formattedLine.replace(/_(.*?)_/g, '<em>$1</em>');

        // Handle headings (#)
        if (formattedLine.startsWith('#')) {
            const headingLevel = formattedLine.match(/^#+/)[0].length;
            const headingText = formattedLine.substring(headingLevel).trim();
            result.push(createElement(`h${headingLevel}`, { key: index }, headingText));
            return;
        }

        // Handle list items
        if (formattedLine.startsWith('*')) {
            result.push(<li key={index}>{formattedLine.substring(1).trim()}</li>);
            return;
        }

        // Identify and handle the table divider row
        if (formattedLine.startsWith('|---')) {
            isTable = true;
            return;
        }

        // Identify and format table headers
        if (formattedLine.startsWith('|') && !tableHeader) {
            const headers = formattedLine.split('|').filter(Boolean).map(header => header.trim());
            const columns = headers.map((header, i) => <th key={i} dangerouslySetInnerHTML={{ __html: header }} />);
            tableHeader = <thead key={`thead-${index}`}><tr>{columns}</tr></thead>;
            return;
        }

        // Identify and format table rows
        if (isTable && formattedLine.startsWith('|')) {
            const cells = formattedLine.split('|').filter(Boolean).map(cell => cell.trim());
            const cleanedCells = cells.map(cell => cell.replace(/&emsp;&emsp;/g, ''));
            const columns = cleanedCells.map((cell, i) => <td key={i} dangerouslySetInnerHTML={{ __html: cell }} />);
            tableRows.push(<tr key={`tr-${index}`}>{columns}</tr>);
            return;
        }

        // If we encounter a non-table line and we're in a table, close the current table
        if (isTable && (!formattedLine.startsWith('|') || formattedLine.startsWith('|---'))) {
            isTable = false;
            if (tableRows.length > 0) {
                result.push(
                    <table key={`table-${index}`}>
                        {tableHeader}
                        <tbody>{tableRows}</tbody>
                    </table>
                );
                tableRows = [];
                tableHeader = null;
            }
        }

        // Return as paragraph for non-table content
        result.push(<p key={index} dangerouslySetInnerHTML={{ __html: formattedLine }} />);
    });

    // If there is any remaining table content that wasn't closed
    if (tableRows.length > 0) {
        result.push(
            <table key={`table-final`}>
                {tableHeader}
                <tbody>{tableRows}</tbody>
            </table>
        );
    }

    return result;
}

export default formatDescription;





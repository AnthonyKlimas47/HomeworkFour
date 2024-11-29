
/*
Author: Anthony Klimas
Contact: anthony_klimas@student.uml.edu
Date: 2024-11-27
Description: JavaScript file for generating a dynamic multiplication table using the jQuery Validation Plugin.
*/

$(document).ready(function () {
    $.validator.addMethod("greaterThan", function (value, element, param) {
        return parseInt(value) > parseInt($(param).val());
    }, "This value must be greater than the corresponding minimum value.");

    $("#tableForm").validate({
        rules: {
            minCol: {
                required: true,
                min: -50,
                max: 50
            },
            maxCol: {
                required: true,
                min: -50,
                max: 50,
                greaterThan: "#minCol" 
            },
            minRow: {
                required: true,
                min: -50,
                max: 50
            },
            maxRow: {
                required: true,
                min: -50,
                max: 50,
                greaterThan: "#minRow" 
            }
        },
        messages: {
            minCol: {
                required: "Please enter the minimum column value.",
                min: "Minimum column value must be at least -50.",
                max: "Minimum column value must not exceed 50."
            },
            maxCol: {
                required: "Please enter the maximum column value.",
                min: "Maximum column value must be at least -50.",
                max: "Maximum column value must not exceed 50.",
                greaterThan: "Maximum column value must be greater than the minimum column value."
            },
            minRow: {
                required: "Please enter the minimum row value.",
                min: "Minimum row value must be at least -50.",
                max: "Minimum row value must not exceed 50."
            },
            maxRow: {
                required: "Please enter the maximum row value.",
                min: "Maximum row value must be at least -50.",
                max: "Maximum row value must not exceed 50.",
                greaterThan: "Maximum row value must be greater than the minimum row value."
            }
        },
        submitHandler: function (form) {
            const minCol = parseInt($("#minCol").val());
            const maxCol = parseInt($("#maxCol").val());
            const minRow = parseInt($("#minRow").val());
            const maxRow = parseInt($("#maxRow").val());

            
            console.log("Form submitted. Generating table...");

            
            generateTable(minCol, maxCol, minRow, maxRow);
        }
    });

    
    function generateTable(minCol, maxCol, minRow, maxRow) {
        
        const tableContainer = $("#tableContainer");
        tableContainer.empty(); 

        
        const table = $("<table>").addClass("multiplication-table");

        
        const headerRow = $("<tr>");
        headerRow.append($("<th>")); 
        for (let col = minCol; col <= maxCol; col++) {
            headerRow.append($("<th>").text(col));
        }
        table.append(headerRow);

        
        for (let row = minRow; row <= maxRow; row++) {
            const tableRow = $("<tr>");
            tableRow.append($("<th>").text(row)); 
            for (let col = minCol; col <= maxCol; col++) {
                tableRow.append($("<td>").text(row * col));
            }
            table.append(tableRow);
        }

        
        tableContainer.append(table);
    }
});


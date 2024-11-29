/* script.js */
/*
Author: Anthony Klimas
Contact: anthony_klimas@student.uml.edu
Date: 2024-11-27
Description: JavaScript file for generating a dynamic multiplication table using the jQuery Validation Plugin.
*/

$(function () {
    
    $("#tabs").tabs();

    
    function createSlider(inputId, sliderId, minValue, maxValue) {
        $(`#${sliderId}`).slider({
            min: minValue,
            max: maxValue,
            slide: function (event, ui) {
                $(`#${inputId}`).val(ui.value);
                updateDynamicTable();  
                validateInputs();  
            }
        });
        $(`#${inputId}`).val($(`#${sliderId}`).slider("value"));
    }

   
    createSlider("minCol", "minCol-slider", -50, 50);
    createSlider("maxCol", "maxCol-slider", -50, 50);
    createSlider("minRow", "minRow-slider", -50, 50);
    createSlider("maxRow", "maxRow-slider", -50, 50);

    
    function updateDynamicTable() {
        const minCol = parseInt($("#minCol").val());
        const maxCol = parseInt($("#maxCol").val());
        const minRow = parseInt($("#minRow").val());
        const maxRow = parseInt($("#maxRow").val());

        
        let tableHtml = "<table class='multiplication-table'><tr><th></th>";
        for (let col = minCol; col <= maxCol; col++) {
            tableHtml += `<th>${col}</th>`;
        }
        tableHtml += "</tr>";

        for (let row = minRow; row <= maxRow; row++) {
            tableHtml += `<tr><th>${row}</th>`;
            for (let col = minCol; col <= maxCol; col++) {
                tableHtml += `<td>${row * col}</td>`;
            }
            tableHtml += "</tr>";
        }
        tableHtml += "</table>";

        
        $("#dynamicTable").html(tableHtml);
    }

    
    function validateInputs() {
        const minCol = parseInt($("#minCol").val());
        const maxCol = parseInt($("#maxCol").val());
        const minRow = parseInt($("#minRow").val());
        const maxRow = parseInt($("#maxRow").val());

        if (minCol > maxCol || minRow > maxRow) {
            
            $("#error-message").show();
            $("#tableForm button[type='submit']").prop("disabled", true);
            $("#dynamicTable").hide();  
        } else {
            
            $("#error-message").hide();
            $("#tableForm button[type='submit']").prop("disabled", false);
            $("#dynamicTable").show();  
        }
    }

    
    updateDynamicTable();
    validateInputs();  

    
    $("#tableForm").on("submit", function (event) {
        event.preventDefault();

        const minCol = parseInt($("#minCol").val());
        const maxCol = parseInt($("#maxCol").val());
        const minRow = parseInt($("#minRow").val());
        const maxRow = parseInt($("#maxRow").val());

        
        if (minCol > maxCol || minRow > maxRow) {
            $("#error-message").show();
            return;
        }

        $("#error-message").hide();

        
        const tabCount = $("#tabs ul li").length + 1;
        const tabId = `tab-${tabCount}`;

        
        $("#tabs ul").append(`<li><a href="#${tabId}">Table ${tabCount}</a> <span class="delete-tab" data-tab-id="${tabId}">X</span></li>`);

        
        $("#tabs").append(`<div id="${tabId}"></div>`);

        
        let tableHtml = "<table class='multiplication-table'><tr><th></th>";
        for (let col = minCol; col <= maxCol; col++) {
            tableHtml += `<th>${col}</th>`;
        }
        tableHtml += "</tr>";

        for (let row = minRow; row <= maxRow; row++) {
            tableHtml += `<tr><th>${row}</th>`;
            for (let col = minCol; col <= maxCol; col++) {
                tableHtml += `<td>${row * col}</td>`;
            }
            tableHtml += "</tr>";
        }
        tableHtml += "</table>";

       
        $(`#${tabId}`).html(tableHtml);

        
        $("#tabs").tabs("refresh");

        
        $("#tabs").tabs("option", "active", tabCount - 1);
    });

    
    $("#clearTabs").on("click", function () {
        
        $("#tabs ul li:not(:first)").remove();
        $("#tabs div:not(:first)").remove();
        $("#tabs").tabs("refresh");
    });

   
    $(document).on("click", ".delete-tab", function () {
        const tabId = $(this).data("tab-id");
        $(`#${tabId}`).remove();
        $(this).parent().remove();
        $("#tabs").tabs("refresh");
    });
});


$(document).ready(function()
{
	if ($("#alertSuccess").text().trim() == "")
	{
		$("#alertSuccess").hide();
	}
	$("#alertError").hide();
});
// SAVE ============================================
$(document).on("click", "#btnSave", function(event)
{
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	// Form validation-------------------
	var status = validateCustomerForm();
	if (status != true)
	{
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	// If valid------------------------
	var type = ($("#hidCustomerIDSave").val() == "") ? "POST" : "PUT";
	
	$.ajax(
			{ 
				url : "CustomerAPI", 
				type : type, 
				data : $("#formCustomer").serialize(), 
				dataType : "text", 
				complete : function(response, status) 
				{ 
					onCustomerSaveComplete(response.responseText, status); 
				} 
			});
	
});

function onCustomerSaveComplete(response, status)
{ 
	if (status == "success") 
	{ 
		var resultSet = JSON.parse(response);
		
		if (resultSet.status.trim() == "success") 
		{ 
			$("#alertSuccess").text("Successfully saved."); 
			$("#alertSuccess").show(); 
			$("#divItemsGrid").html(resultSet.data); 
		} else if (resultSet.status.trim() == "error") 
		{ 
			$("#alertError").text(resultSet.data); 
			$("#alertError").show(); 
		}
		
	} else if (status == "error") 
	{ 
		$("#alertError").text("Error while saving."); 
		$("#alertError").show(); 
	} else
	{ 
		$("#alertError").text("Unknown error while saving.."); 
		$("#alertError").show(); 
	} 
	$("#hidCustomerIDSave").val(""); 
	$("#formCustomer")[0].reset(); 
}


// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
{
	$("#hidCustomerIDSave").val($(this).closest("tr").find('#hidCustomerIDUpdate').val());
	$("#customerid").val($(this).closest("tr").find('td:eq(0)').text());
	$("#Name").val($(this).closest("tr").find('td:eq(1)').text());
	$("#Email").val($(this).closest("tr").find('td:eq(2)').text());
	$("#Phone_number").val($(this).closest("tr").find('td:eq(3)').text());
	$("#Project_name").val($(this).closest("tr").find('td:eq(4)').text());
});

//REMOVE======

$(document).on("click", ".btnRemove", function(event)
{ 
	$.ajax( 
	{ 
		url : "CustomerAPI", 
		type : "DELETE", 
		data : "customerid=" + $(this).data("cusid"),
		dataType : "text", 
		complete : function(response, status) 
		{ 
			onCustomerDeleteComplete(response.responseText, status); 
		} 
	}); 
});

function onCustomerDeleteComplete(response, status)
{ 
	if (status == "success") 
	{ 
		var resultSet = JSON.parse(response);
		
		if (resultSet.status.trim() == "success") 
		{ 
			$("#alertSuccess").text("Successfully deleted."); 
			$("#alertSuccess").show(); 
			$("#divItemsGrid").html(resultSet.data); 
		} else if (resultSet.status.trim() == "error") 
		{ 
			$("#alertError").text(resultSet.data); 
			$("#alertError").show(); 
		} 
	} else if (status == "error") 
	{ 
		$("#alertError").text("Error while deleting."); 
		$("#alertError").show(); 
	} else
	{ 
		$("#alertError").text("Unknown error while deleting.."); 
		$("#alertError").show(); 
	} 
}

// CLIENT-MODEL================================================================
function validateCustomerForm()
{
	// Name
	if ($("#Name").val().trim() == "")
	{
		return "Insert Name.";
	}
	// Email
	if ($("#Email").val().trim() == "")
	{
		return "Insert Email.";
	} 

	//Phone_number
	if ($("#Phone_number").val().trim() == "")
	{
		return "Insert Phone_number.";
	}
	
	// Project_name 
	if ($("#Project_name").val().trim() == "")
	{
		return "Insert Project_name.";
	}
	
	
	return true;
}
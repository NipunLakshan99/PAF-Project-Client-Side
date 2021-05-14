<%@ page import="model.Customer"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Payment Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/customer.js"></script>
</head>
<body>
 
<div class="container"><div class="row"><div class="col-6">
 
	<h1>CUSTOMER PAGE</h1>
	<form id="formCustomer" name="formCustomer">
		<br>Customer ID : 
 		<input id="customerid" name="customerid" type="text" class="form-control form-control-sm" readonly>
		<br>Name: 
 		<input id="Name" name="Name" type="text" class="form-control form-control-sm">
 		<br>Email: 
 		<input id="Email" name="Email" type="text" class="form-control form-control-sm">
 		<br> Phone Number: 
 		<input id="Phone_number" name="Phone_number" type="text" class="form-control form-control-sm">
 		<br> Project Name: 
 		<input id="Project_name" name="Project_name" type="text" class="form-control form-control-sm">
 		<br>
 		
 		<input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary">
 		<input type="hidden" id="hidCustomerIDSave" name="hidCustomerIDSave" value="">
	</form>
	<br>
	<div id="alertSuccess" class="alert alert-success"></div>
	<div id="alertError" class="alert alert-danger"></div>
	<br>
	<div id="divItemsGrid">
	 	<%
 			Customer customerObj = new Customer(); 
 			out.print(customerObj.readItems()); 
 		%>
	</div>
</div> </div> </div> 
</body>
</html>
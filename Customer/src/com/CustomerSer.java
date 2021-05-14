package com;

import model.Customer;

//For REST Service
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

//For JSON
import com.google.gson.*;

//For XML
import org.jsoup.*;
import org.jsoup.parser.*;
import org.jsoup.nodes.Document;

@Path("/Customer")
public class CustomerSer {
	
	Customer Cusobj = new Customer();
	
	@GET
	@Path("/")
	@Produces(MediaType.TEXT_HTML)
	
	public String readcustomer()
	{
		return Cusobj.readItems();
	}
	
	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.TEXT_PLAIN)
		public String insertItem(@FormParam("Name") String Name,
	@FormParam("Email") String Email,
	@FormParam("Phone_number") String Phone_number,
	@FormParam("Project_name") String Project_name)	
	{
	String output = Cusobj.insertcustomer(Name, Email, Phone_number,Project_name);
	return output;
	}
	
	@PUT
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String updateItem(String itemData)
	{
	//Convert the input string to a JSON object
	JsonObject itemObject = new JsonParser().parse(itemData).getAsJsonObject();
	//Read the values from the JSON object
	String customerid = itemObject.get("customerid").getAsString();
	String Name = itemObject.get("Name").getAsString();
	String Email = itemObject.get("Email").getAsString();
	String Phone_number = itemObject.get("Phone_number").getAsString();
	String Project_name = itemObject.get("Project_name").getAsString();
	String output = Cusobj.updatecustomer(customerid, Name, Email, Phone_number,Project_name);
	return output;
	}
	
	@DELETE
	@Path("/")
	@Consumes(MediaType.APPLICATION_XML)
	@Produces(MediaType.TEXT_PLAIN)
	public String deleteItem(String itemData)
	{
	//Convert the input string to an XML document
	Document doc = Jsoup.parse(itemData, "", Parser.xmlParser());
	//Read the value from the element <customerid>
	String customerid = doc.select("customerid").text();
	String output = Cusobj.deleteCustomer(customerid);
	return output;
	}

}

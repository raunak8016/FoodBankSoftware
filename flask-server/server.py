from flask import Flask,request,jsonify

from connections import app

import getUserData
import postUserData

import getAdminData
import postAdminData

import getItemData
import postItemData

import getSupplierData

import getRequestData
import postRequestData

import getOrderData
import postOrderData

#--------------------------------------------------------------------

@app.route("/Admin")
def Admin():
    adminData = getAdminData.getAdminDatas()
    aData = adminData.getAlldata()
    response = jsonify({"Admin":aData})
    return response

@app.route("/Admin_fname")
def Admin_fname():
    adminData = getAdminData.getAdminDatas()
    aData = adminData.getAllAdminFnames()
    response = jsonify({"User_fname":aData}) #dont put spaces on the in the key name hence the  "_"
    return response

#gets a row of an admin
@app.route("/Admin_Info", methods=["POST"])
def Admin_Info():
    data = request.get_json()
    a_email = data.get('a_email')
    adminData = getAdminData.getAdminDatas()
    aData = adminData.getAnAdminInfo(a_email)
    response = jsonify({"Info":aData}) #dont put spaces on the in the key name hence the  "_"
    return response


#--------------------------------------------------------------------

@app.route("/User")
def User():
    userData = getUserData.getUserDatas()
    uData = userData.getAlldata()
    response = jsonify({"User":uData})
    return response

@app.route("/User_fname")
def User_fname():
    userData = getUserData.getUserDatas()
    uData = userData.getAllUserFnames()
    response = jsonify({"User_fname":uData}) #dont put spaces on the in the key name hence the  "_"
    return response


#gets the row of a user
@app.route("/User_Info", methods=["POST"])
def User_Info():
    data = request.get_json()
    u_email = data.get('u_email')
    userData = getUserData.getUserDatas()
    uData = userData.getAUserInfo(u_email)
    response = jsonify({"Info":uData}) #dont put spaces on the in the key name hence the  "_"
    return response

#--------------------------------------------------------------------

@app.route("/Request")
def Request():
    requestData = getRequestData.getRequestDatas()
    rData = requestData.getAlldata()
    response = jsonify({"Request":rData}) #dont put spaces on the in the key name hence the  "_"
    return response


#gets the row of a request
@app.route("/Request_Info", methods=["POST"])
def Request_Info():
    data = request.get_json()
    request_id = data.get('request_id')
    requestData = getRequestData.getRequestDatas()
    rData = requestData.getASingleRequest(request_id)
    response = jsonify({"Info":rData}) #dont put spaces on the in the key name hence the  "_"
    return response

#--------------------------------------------------------------------


@app.route("/Supplier")
def Supplier():
    supplierData = getSupplierData.getSupplierDatas()
    sData = supplierData.getAlldata()
    response = jsonify({"Supplier":sData})
    return response

#--------------------------------------------------------------------


@app.route("/Item")
def Item():
    itemData = getItemData.getItemDatas()
    iData = itemData.getAlldata()
    response = jsonify({"Item":iData})
    return response

@app.route("/Item_Quantities")
def Item_Quantities():
    itemData = getItemData.getItemDatas()
    iData = itemData.getItemQuantities()
    response = jsonify({"Item_Quantities":iData})
    return response

#--------------------------------------------------------------------

@app.route("/Order")
def Order():
    orderData = getOrderData.getOrderDatas()
    aData = orderData.getAlldata()
    response = jsonify({"Order":aData})
    return response

#--------------------------------------Post Routes------------------------------
@app.route("/login", methods = ['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email') #get either a_email or u_email
        userType = data.get('userType')
        

        personData = []

        if userType == "Admin": #query if the person is an admin
            #get data from user table
            adminData = getAdminData.getAdminDatas()
            personData = adminData.getAnAdmin_a_email(email)
        elif userType == "User": #query if the person is a user
            #get data from user table
            userData = getUserData.getUserDatas()
            personData = userData.getAUser_u_email(email)

        if len(personData) == 1:        
            return jsonify({"status":"true"}) #if the user exists return true
        else:
            return jsonify({"status":"false"}) #if the user exists return false
        

    except Exception as e:
        print('Error during login:', str(e))
        return jsonify({'error': 'An unexpected error occurred.'})
            


@app.route("/signUp", methods = ['POST'])
def signUp():
    try:
        data = request.get_json()
        email = data.get('email') #get  u_email
        firstName = data.get('firstName')
        lastName = data.get('lastName')
        userType = data.get('userType')
        address = data.get('address')

        postUser = postUserData.postUserDatas()
     
        if userType == "client":
            client_flag = 1
            donor_flag = 0

            post = postUser.addNewClient(email, firstName, lastName, client_flag, donor_flag, address) #add a client
        elif userType == "donor":
            client_flag = 0
            donor_flag = 1

            post = postUser.addNewDonor(email, firstName, lastName, client_flag, donor_flag) #add a donor

        if post == "Done!!": #if the entry was added successfully
            return jsonify({"status":"true"}) #if the user exists return true   
        else: #the email is either a duplacate entry or some other error
            return jsonify({"status":"false","reason":"might be a duplicate entry"}) #if the user exists return false
        
        

    except Exception as e:
        print('Error during login:', str(e))
        return jsonify({'error': 'An unexpected error occurred.'})
    

@app.route("/admin_signUp", methods = ['POST'])
def admin_signUp():
    try:
        #admins are volunteers by default
        data = request.get_json()
        email = data.get('email') #get either a_email or u_email
        firstName = data.get('firstName')
        lastName = data.get('lastName')
        adminType = data.get('adminType')#volunteer or coordinator
        shift = data.get("shift")
        
        volunteer_flag = 0
        coordinator_flag = 0

        postAdmin = postAdminData.postAdminDatas()
        
        volunteer_flag = 0
        coordinator_flag = 0

        if adminType == "volunteer":
            volunteer_flag = 1
            coordinator_flag = 0
              
        elif adminType == "coordinator":
            volunteer_flag = 0
            coordinator_flag = 1

        post = postAdmin.addNewAdmin(email, firstName, lastName, shift, volunteer_flag, coordinator_flag ) #add a donor

        if post == "Done!!": #if the entry was added successfully
            return jsonify({"status":"true"}) #if the user exists return true          
        else: #the email is either a duplacate entry or some other error
            return jsonify({"status":"false","reason":"might be a duplicate entry"}) #if the user exists return false
        
    except Exception as e:
        print('Error during login:', str(e))
        return jsonify({'error': 'An unexpected error occurred.'})


@app.route("/addItem", methods = ['POST'])
def addItem():
    try:
        #admins are volunteers by default
        data = request.get_json()
        item_name = data.get('item_name') #get either a_email or u_email
        quantity = data.get('quantity')
        storage_type = data.get('storageType')
        brand = data.get('brand')
        itemType = data.get('itemType')

        if itemType == "food":
            food_flag = 0
            toiletry_flag = 1
        elif itemType == "toiletry":
            food_flag = 1
            toiletry_flag = 0
        
        postItem = postItemData.postItemDatas()
        
        post = postItem.updateItemQuantity(item_name, quantity, storage_type, brand, food_flag, toiletry_flag) #add a donor

        if post == "Done!!": #if the entry was added successfully 
            return jsonify({"status":"true"}) #if the Item exists return true
        else: #the Item is either a duplacate entry or some other error
            return jsonify({"status":"false","reason":f"{item_name} might be a duplicate"}) #if the user exists return false
        
    except Exception as e:
        print('Error during login:', str(e))
        return jsonify({'error': 'An unexpected error occurred.'})


@app.route("/updateItemQuantity", methods = ['POST'])
def updateItemQuantity():
    try:
        data = request.get_json()
        item_name = data.get('item_name') 
        quantity = data.get('quantity')
        
        postItem = postItemData.postItemDatas()
        
        post = postItem.updateItemQuantity(item_name, quantity) #add a donor

        if post == "Done!!": #if the entry was added successfully 
            return jsonify({"status":"true"}) #if the Item was updated  return true
        else: #something went wrong with the update
            return jsonify({"status":"false","reason":f"an error occured with updating {item_name}"}) #if the user exists return false
        
    except Exception as e:
        print('Error during login:', str(e))
        return jsonify({'error': 'An unexpected error occurred.'})


@app.route("/addRequest", methods = ['POST'])
def addRequest():
    try:
        #admins are volunteers by default
        data = request.get_json()
        request_id = data.get('request_id') 
        request_admin = data.get('request_admin')
        request_user = data.get('request_user')
        pickup_date = data.get('pickup_date') 
        request_date = data.get('request_date')
        
        postRequest = postRequestData.postRequestDatas()
        
        post = postRequest.addNewRequest(request_id, request_admin, request_user, pickup_date, request_date) 

        if post == "Done!!": #if the entry was added successfully 
            return jsonify({"status":"true"}) #if the Item exists return true
        else: #the request_id is either a duplicate entry or some other error
            return jsonify({"status":"false","reason":f"{request_id} might be a duplicate, or ether the user or admin does not exist"}) 
        
    except Exception as e:
        print('Error during login:', str(e))
        return jsonify({'error': 'An unexpected error occurred.'})

@app.route("/addOrder", methods = ['POST'])
def addOrder():
    try:
        #admins are volunteers by default
        data = request.get_json()
        order_no = data.get("order_no")
        delivery_date = data.get('delivery_date') 
        admin_email = data.get('admin_email')
        supplier_id = data.get('supplier_id')
       
        
        postOrder = postOrderData.postOrderDatas()
        
        post = postOrder.addNewOrder(order_no, delivery_date, admin_email, supplier_id) 

        if post == "Done!!": #if the entry was added successfully 
            return jsonify({"status":"true"}) #if the Item exists return true
        else: #the request_id is either a duplicate entry or some other error
            return jsonify({"status":"false","reason":f"{request_id} might be a duplicate, or ether the user or admin does not exist"}) 
        
    except Exception as e:
        print('Error during login:', str(e))
        return jsonify({'error': 'An unexpected error occurred.'})


if __name__ == "__main__":
    app.run(debug=True)
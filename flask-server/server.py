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

import getOrderContainsData

import getRequestContainsData
import postRequestContainsData

import postDonationData
import getDonationData

import uuid
from datetime import datetime
#---------------------------------ADMIN-----------------------------------

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

#-------------------------------------USER-------------------------------

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

#----------------------------------REQUEST----------------------------------

@app.route("/Request", methods=["POST"])
def Request():
    requestData = getRequestData.getRequestDatas()
    rData = requestData.getAlldata()
    response = jsonify({"Request":rData}) #dont put spaces on the in the key name hence the  "_"
    return response

@app.route("/Request_Info", methods=["POST"])
def Request_Info():
    data = request.get_json()
    user_email = data.get('user_email')
    requestData = getRequestData.getRequestDatas()
    rData = requestData.getASingleRequest(user_email)
    response = jsonify({"Info":rData}) #dont put spaces on the in the key name hence the  "_"
    return response

@app.route("/generate_request_id", methods=["GET"])
def generate_request_id():
    request_id = str(uuid.uuid4().hex)[:10]

    return jsonify({"request_id": request_id})
#---------------------------------REQUEST CONTAINS-----------------------------------

@app.route("/RequestContains", methods =["POST"])
def RequestContains():

    data = request.get_json()
    request_id = data.get('request_id') 
    print(request_id)
    requestData = getRequestContainsData.getRequestContainsDatas()
    rData = requestData.getAllItemsByRequestId(request_id)
    print(rData)

    response = jsonify({f"Request: {request_id}":rData})
    return response

#-----------------------------------SUPPLIER---------------------------------

@app.route("/Supplier", methods=["POST"])
def Supplier():
    supplierData = getSupplierData.getSupplierDatas()
    sData = supplierData.getAlldata()
    print(sData)
    response = jsonify({"Supplier":sData})
    return response

#----------------------------------ITEM----------------------------------
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

#---------------------------------ORDER-----------------------------------

@app.route("/Order")
def Order():
    orderData = getOrderData.getOrderDatas()
    aData = orderData.getAlldata()
    response = jsonify({"Order":aData})
    return response


#------------------------------ORDER CONTAINS--------------------------------------
@app.route("/OrderContains", methods =["POST"])
def OrderContains():

    data = request.get_json()
    order_no = data.get('order_id') 

    requestData = getOrderContainsData.getOrderContainsDatas()
    oData = requestData.getAllItemsByOrderNo(order_no)
    response = jsonify({f"Order: {order_no}":oData})
    return response

#------------------------------DONATION--------------------------------------
@app.route("/getDonation", methods =["POST"])
def getDonation():

    data = request.get_json()
    donor_email = data.get('donor_email') 

    donationdData = getDonationData.getDonationDatas()
    dData = donationdData.getItemsAndDateByDonorEmail(donor_email)
    response = jsonify({f"Donations By: {donor_email}":dData})
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
        print('Error during signUp:', str(e))
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
        managerEmail = data.get("managerEmail")
        
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

        post = postAdmin.addNewAdmin(email, firstName, lastName, shift, volunteer_flag, coordinator_flag, managerEmail ) #add a donor

        if post == "Done!!": #if the entry was added successfully
            return jsonify({"status":"true"}) #if the user exists return true          
        else: #the email is either a duplacate entry or some other error
            return jsonify({"status":"false","reason":"might be a duplicate entry or manager email does not exist"}) #if the user exists return false
        
    except Exception as e:
        print('Error during login:', str(e))
        return jsonify({'error': 'An unexpected error occurred.'})

@app.route("/updateVerifyAdmin", methods = ['POST'])
def updateVerifyAdmin():
    try:
        data = request.get_json()
        user_email = data.get('user_email')
        admin_email = data.get('admin_email') 
        print(user_email, admin_email)

        
        userData = getUserData.getUserDatas()
        uData = userData.getAUserInfo(user_email)
        if (uData[0][6]==None or uData[0][6]==''):
            postRequest = postUserData.postUserDatas()
            post = postRequest.updateUserVerifyAdmin(admin_email, user_email)
            print(post)
            if post == "Done!!": #if the verify email was updated successfully 
                return jsonify({"status":"true"}) #if the verify email was updated return true
            else: #something went wrong with the update
                return jsonify({"status":"false","reason":f"an error occured with updating the verify admin for {user_email}"})
        else:
            return jsonify({"status":"already"})
        
    except Exception as e:
        print('Error during updateRequest:', str(e))
        return jsonify({'error': 'An unexpected error occurred.'})




@app.route("/addItem", methods = ['POST'])
def addItem():
    try:
        data = request.get_json()
        print(data)
        item_name = data.get('item_name') #get either a_email or u_email
        quantity = data.get('quantity')
        storage_type = data.get('storageType')
        brand = data.get('brand')
        itemType = data.get('itemType')
        
        food_flag = 0
        toiletry_flag = 0
        if itemType == "food":
            food_flag = 1
            toiletry_flag = 0
        elif itemType == "toiletry":
            food_flag = 0
            toiletry_flag = 1
        
        postItem = postItemData.postItemDatas()
        
        post = postItem.addNewItem(item_name, quantity, storage_type, brand, food_flag, toiletry_flag) #add a donor

        if post == "Done!!": #if the entry was added successfully 
            return jsonify({"status":"true"}) #if the Item exists return true
        else: #the Item is either a duplacate entry or some other error
            return jsonify({"status":"false","reason":f"{item_name} might be a duplicate"}) #if the user exists return false
        
    except Exception as e:
        print('Error during addItem:', str(e))
        return jsonify({'error': 'An unexpected error occurred.'})


@app.route("/updateItemQuantity", methods = ['POST'])
def updateItemQuantity():
    try:
        data = request.get_json()
        item_name = data.get('item_name') 
        quantity = data.get('quantity')
        print(item_name, quantity)
        postItem = postItemData.postItemDatas()
        
        post = postItem.updateItemQuantity(item_name, quantity) 

        if post == "Done!!": #if the entry was added successfully 
            return jsonify({"status":"true"}) #if the Item was updated  return true
        else: #something went wrong with the update
            return jsonify({"status":"false","reason":f"an error occured with updating {item_name}"}) #if the user exists return false
        
    except Exception as e:
        print('Error during updateItemQuantity:', str(e))
        return jsonify({'error': 'An unexpected error occurred.'})


@app.route("/deleteItem", methods = ['POST'])
def deleteItem():
    try:
        data = request.get_json()
        item_name = data.get('item_name') 
        
        postItem = postItemData.postItemDatas()
        
        post = postItem.deleteItem(item_name)

        if post == "Done!!": #if the item was deleted successfully 
            return jsonify({"status":"true"}) #if the Item was updated  return true
        else: #something went wrong with the update
            return jsonify({"status":"false","reason":f"an error occured with deleting {item_name}"}) #if the user exists return false
        
    except Exception as e:
        print('Error during deleteItem:', str(e))
        return jsonify({'error': 'An unexpected error occurred.'})


@app.route("/addRequest", methods = ['POST'])
def addRequest():
    try:
        data = request.get_json()
        request_id = data.get('request_id') 
        request_admin = data.get('request_admin')
        request_user = data.get('request_user')
        pickup_date = data.get('pickup_date') 
        request_date = datetime.now().strftime('%Y-%m-%d')
        print(request_id, request_admin, request_user, pickup_date, request_date)
        postRequest = postRequestData.postRequestDatas()
        
        post = postRequest.addNewRequest(request_id, request_admin, request_user, pickup_date, request_date) 

        if post == "Done!!": #if the entry was added successfully 
            return jsonify({"status":"true"}) #if the request was added return true
        else: #the request_id is either a duplicate entry or some other error
            return jsonify({"status":"false","reason":f"{request_id} might be a duplicate, or ether the user or admin does not exist"}) 
        
    except Exception as e:
        print('Error during addRequest:', str(e))
        return jsonify({'error': 'An unexpected error occurred.'})


@app.route("/deleteRequest", methods = ['POST'])
def deleteRequest():
    try:
        data = request.get_json()
        request_id = data.get('request_id') 
        
        
        postRequest = postRequestData.postRequestDatas()
        
        post = postRequest.deleteRequest(request_id)

        if post == "Done!!": #if the item was deleted successfully 
            return jsonify({"status":"true"}) #if the request was updated return true
        else: #something went wrong with the update
            return jsonify({"status":"false","reason":f"an error occured with deleting request {request_id}"}) 
        
    except Exception as e:
        print('Error during deleteRequest:', str(e))
        return jsonify({'error': 'An unexpected error occurred.'})


@app.route("/updateRequest", methods = ['POST'])
def updateRequest():
    try:
        data = request.get_json()
        request_id = data.get('request_id')
        admin_email = data.get('admin_email') 
        currrent_date = datetime.now().strftime('%Y-%m-%d')  
        
        postRequest = postRequestData.postRequestDatas()
        
        post = postRequest.updateRequest(request_id, admin_email, currrent_date)
        print(post)
        if post == "Done!!": #if the request was updated successfully 
            return jsonify({"status":"true"}) #if the request was updated return true
        else: #something went wrong with the update
            return jsonify({"status":"false","reason":f"an error occured with updating request {request_id}"}) 
        
    except Exception as e:
        print('Error during updateRequest:', str(e))
        return jsonify({'error': 'An unexpected error occurred.'})
    

@app.route("/addOrder", methods = ['POST'])
def addOrder():
    try:
        data = request.get_json()
        order_no = str(uuid.uuid4().hex)[:10]
        delivery_date = data.get('delivery_date') 
        admin_email = data.get('admin_email')
        supplier_id = data.get('supplier_id')
        print(order_no, delivery_date, admin_email, supplier_id)
        postOrder = postOrderData.postOrderDatas()
        
        post = postOrder.addNewOrder(order_no, delivery_date, admin_email, supplier_id) 

        if post == "Done!!": #if the entry was added successfully 
            return jsonify({"status":"true"}) #if the Item exists return true
        else: #the request_id is either a duplicate entry or some other error
            return jsonify({"status":"false","reason":f"{order_no} might be a duplicate, or ether the user or admin does not exist"}) 
        
    except Exception as e:
        print('Error during addOrder:', str(e))
        return jsonify({'error': 'An unexpected error occurred.'})


@app.route("/addDonation", methods = ['POST'])
def addDonation():
    try: 
        data = request.get_json()
        donor_email = data.get("donor_email")
        donation_date = data.get('donation_date') 
        item_name = data.get('item_name')
       
        postDonation = postDonationData.postDonationDatas()
        
        post = postDonation.addNewDonation(donor_email, item_name, donation_date) 

        if post == "Done!!": #if the entry was added successfully 
            return jsonify({"status":"true"}) #if the Item exists return true
        else: #the request_id is either a duplicate entry or some other error
            return jsonify({"status":"false","reason":f"{donor_email} might not exist as a user"}) 
        
    except Exception as e:
        print('Error during addDonation:', str(e))
        return jsonify({'error': 'An unexpected error occurred.'})



@app.route("/addRequestContains", methods = ['POST'])
def addRequestContains():
    try:
        data = request.get_json()
        id_request = data.get("id_request")
        request_items = data.get('request_item') 
        print(request_items)
        
        postRequestContains = postRequestContainsData.postRequestContainsDatas()
        
        for i in request_items:
            post = postRequestContains.addNewRequestItem(id_request, i) 

        if post == "Done!!": #if the entry was added successfully 
            return jsonify({"status":"true"}) #if the request item was added return true
        else: #the the item or request id to be added doesnt exist
            return jsonify({"status":"false","reason":f"{request_items} or {id_request} might not exist"}) 
        
    except Exception as e:
        print('Error during addRequestContains', str(e))
        return jsonify({'error': 'An unexpected error occurred.'})


if __name__ == "__main__":
    app.run(debug=True)
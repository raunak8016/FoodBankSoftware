from flask import Flask,request,jsonify

from connections import app

import getUserData
import postUserData

import getAdminData
import postAdminData

import getItemData
import postItemData

import getSupplierData

# Example API Route

@app.route("/members")
def members():
    return {"members": ["Member 1", "Member 2"]}

@app.route("/items")
def items():
    return {"items": {
        "apple":[45,'fridge','jan 1'],
        "orange":[3,'fridge','dec 20']
    }}


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

# @app.route("/addAdmin", methods=["POST"], strict_slashes=False)
# def add_User():
#     a_email = request.json['a_email']
#     admin_fname = request.json['fname']
#     admin_lname = request.json['lname']
    
 
#     postAdmin = postAdminData.postAdminDatas()
#     post = postAdmin.addNewAdmin(a_email, admin_fname, admin_lname)

#     response = jsonify({a_email:[admin_fname, admin_lname], "status":post})
#     return  response



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

        post = postAdmin.addNewAdmin(email, firstName, lastName, volunteer_flag, coordinator_flag ) #add a donor

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






if __name__ == "__main__":
    app.run(debug=True)
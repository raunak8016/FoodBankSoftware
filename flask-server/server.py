from flask import Flask,request,jsonify

from connections import app
import getUserData
import getAdminData
import postAdminData

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

@app.route("/Admin_fname")
def Admin_fname():
    adminData = getAdminData.getAdminDatas()
    aData = adminData.getAllAdminFnames()
    response = jsonify({"User_fname":aData}) #dont put spaces on the in the key name hence the  "_"
    return response

@app.route("/addAdmin", methods=["POST"], strict_slashes=False)
def add_User():
    a_email = request.json['a_email']
    admin_fname = request.json['fname']
    admin_lname = request.json['lname']
    

    postAdmin = postAdminData.postAdminDatas()
    post = postAdmin.addNewAdmin(a_email, admin_fname, admin_lname)

    response = jsonify({a_email:[admin_fname, admin_lname], "status":post})
    return  response



#call the query to insert from here
    

    







if __name__ == "__main__":
    app.run(debug=True)
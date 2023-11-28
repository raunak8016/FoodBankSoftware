from flask import Flask,request,jsonify

from connections import app
import getUserData
import getAdminData

# Example API Route

@app.route("/members")
def members():
    return {"members": ["Member 1", "Member 2"]}


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







if __name__ == "__main__":
    app.run(debug=True)
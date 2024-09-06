from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Route for the login page
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Retrieve the form data
        user_type = request.form['user_type']
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        email = request.form['email']
        password = request.form['password']

        # Logic to handle the form submission
        # You can add code here to check the user's credentials and perform login
        print(f"Login attempt by: {user_type}, {first_name}, {last_name}, {email}")

        # Redirect based on user type
        if user_type == 'patient':
            return redirect(url_for('../pages/patient-dash.html'))
        elif user_type == 'doctor':
            return redirect(url_for('../pages/doctor-dash.html'))
        elif user_type == 'nurse':
            return redirect(url_for('../pages/nurse-dash.html'))
        else:
            return "Unknown user type"

    return render_template('../pages/Login.html')

# Routes for different dashboards
@app.route('/patient')
def patient_dashboard():
    return "../pages/patient-dash.html"

@app.route('/doctor')
def doctor_dashboard():
    return "../pages/doctor-dash.html"

@app.route('/nurse')
def nurse_dashboard():
    return "../pages/nurse-dash.html" 

if __name__ == '__main__':
    app.run(debug=True)
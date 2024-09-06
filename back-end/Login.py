from flask import Flask, render_template, request, redirect, url_for, session
import random
import sendgrid
from sendgrid.helpers.mail import Mail, Email, To, Content

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Replace with your SendGrid API key
SENDGRID_API_KEY = 'your_sendgrid_api_key'

# Simulated database check
def check_credentials(email, password):
    # Add your database check logic here
    return True  # Simulating successful credentials check

# Simulated function to send MFA code
def send_mfa_code(email, code):
    sg = sendgrid.SendGridAPIClient(api_key=SENDGRID_API_KEY)
    from_email = Email('your_email@example.com')
    to_email = To(email)
    subject = 'MFA Code'
    content = Content('text/plain', f'Your MFA code is {code}')
    mail = Mail(from_email, to_email, subject, content)
    response = sg.send(mail)
    print(f"Email sent with status code: {response.status_code}")

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user_type = request.form['user_type']
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        email = request.form['email']
        password = request.form['password']

        if check_credentials(email, password):
            mfa_code = random.randint(100000, 999999)
            session['mfa_code'] = mfa_code
            session['user_type'] = user_type
            session['email'] = email

            send_mfa_code(email, mfa_code)

            return redirect(url_for('verify_mfa'))
        else:
            return "Invalid credentials"

    return render_template('login.html')

@app.route('/verify_mfa', methods=['GET', 'POST'])
def verify_mfa():
    if request.method == 'POST':
        entered_code = int(request.form['mfa_code'])
        if entered_code == session.get('mfa_code'):
            user_type = session.get('user_type')
            
            if user_type == 'patient':
                return redirect(url_for('patient_dashboard'))
            elif user_type == 'doctor':
                return redirect(url_for('doctor_dashboard'))
            elif user_type == 'nurse':
                return redirect(url_for('nurse_dashboard'))
            else:
                return "Unknown user type"
        else:
            return "Invalid MFA code"
    
    return render_template('verify_mfa.html')

# Routes for different dashboards
@app.route('/patient')
def patient_dashboard():
    return "Patient Dashboard"

@app.route('/doctor')
def doctor_dashboard():
    return "Doctor Dashboard"

@app.route('/nurse')
def nurse_dashboard():
    return "Nurse Dashboard" 

if __name__ == '__main__':
    app.run(debug=True)
# Video-App

A Machine Learning Model based website for Survillance on cameras to detect a fight is happening or not

## **Project Overview**

This repository hosts an application that uses a Long-term Recurrent Convolutional Network (LRCN) model to analyze video inputs. The backend is built with Python using a pre-trained `.h5` model, while the frontend was built on React provides an intuitive interface for users. The application features three main tabs: **Home**, **Maps**, and **Settings**.

---

## **Table of Contents**

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Environment Variables](#environment-variables)
5. [Frontend Tabs](#frontend-tabs)
6. [Technologies Used](#technologies-used)
7. [Contributing](#contributing)
8. [License](#license)

---

## **Features**

- **Home Tab:** Upload and analyze videos using the LRCN model.
- **Maps Tab:** Display visualizations or additional context (e.g., geospatial data).
- **Settings Tab:** Configure application preferences.
- RESTful API for seamless communication between the backend and frontend.
- Interactive frontend interface built using React.

---

## **Installation**

### **Backend Setup**
1. **Clone the repository:**
   ```bash
   git clone https://github.com/username/repository-name.git
   cd repository-name/backend
   ```

2. **Set up a Python environment:**
   ```bash
   python -m venv env
   source env/bin/activate    # On Linux/Mac
   . env\Scripts\activate       # On Windows
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the backend server:**
   ```bash
   uvicorn main:app --reload
   ```

### **Frontend Setup**
1. **Navigate to the frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend server:**
   ```bash
   npm start
   ```

---

## **Usage**

1. Start the backend server as described in the [Backend Setup](#backend-setup).
2. Start the frontend server as described in the [Frontend Setup](#frontend-setup).
3. Open your browser and navigate to `http://localhost:3000` to interact with the application.

---

## **Environment Variables**

Ensure you define the necessary environment variables in a `.env` file in the backend directory:

```env
MODEL_PATH=./model.h5   # Path to your LRCN model
```
Or We can directly give the file path of .h5 model in main.py file in backend dierctory
---

## **Frontend Tabs**

### **Home**
- Upload video files using the provided button.
- Test the uploaded videos against the LRCN model.
- View real-time results and predictions.

### **Maps**
- Display relevant visual data (e.g., geospatial maps or model-based heatmaps).

### **Settings**
- Configure and personalize the application's behavior and preferences.

---

## **Technologies Used**

- **Machine Learning:** LRCN model trained on video datasets
- **Backend:** Python, FastAPI
- **Frontend:** React.js, JavaScript
- **API Communication:** RESTful services
- **Deployment:** Uvicorn, Node.js

---

## **Contributing**

We welcome contributions to enhance this project! Please fork the repository and create a pull request with detailed explanations of your changes.

---


# IntelliDocs: AI-Powered Document Analysis Platform

IntelliDocs is a web application designed to help you manage and understand your PDF documents. Simply upload a document, and the application will automatically store it securely, extract its content, and generate a concise summary and relevant tags using a locally-run AI model.

## About The Project

In an age of information overload, finding key insights within large documents can be a challenge. This project was built to solve that problem by leveraging the power of Large Language Models (LLMs) to automate the analysis of PDF files. It provides a clean interface to upload, view, and manage your documents, with AI-generated metadata making them easier to understand and organize at a glance.

-----

## Features

  * **Secure Authentication:** User accounts are protected using **Flask-Bcrypt** for secure password hashing.
  * **Secure Password Reset:** Production-ready password recovery flow enabled via **SMTP server** for reliable email delivery.
  * **Secure Document Upload:** Upload your PDF files through a simple web interface.
  * **Cloud Storage:** All documents are securely stored using **Cloudinary** for reliable access.
  * **Automatic Text Extraction:** The application automatically parses and extracts text content from your PDFs upon upload using PyMuPDF.
  * **AI-Powered Summarization & Tagging:** Using a local LLM via **Ollama**, a concise summary and searchable tags are generated for every document.
  * **RAG for Document Chat:** Utilizes a **Retrieval-Augmented Generation (RAG)** pipeline to enable a **"Chat with Your Document"** feature for accurate, contextual Q\&A.
  * **Document Management:** A dashboard to view, manage, and delete your uploaded documents.

### Work in Progress

  * **Semantic Search:** Currently working on a powerful semantic search feature that will allow you to find documents based on the *meaning* of your query, leveraging **ChromaDB**.
  * **Folder Organization:** **Allows users to create a clean, hierarchical structure for their documents, making large volumes of files easy to browse and locate.**

-----

## Technology Stack

This project is built with a modern and robust set of technologies:

  * **Backend:** Python 3, Flask, **Flask-Bcrypt**
  * **Databases:** **MySQL** (Relational Metadata), **ChromaDB** (Vector Store), **MongoDB** (Chat History Storage)
  * **AI / ML:** **Ollama** for local Large Language Model inference, **RAG Architecture**
  * **File Storage:** Cloudinary
  * **Authentication:** SMTP Server (for password reset)
  * **Frontend:** HTML, CSS, JavaScript with Jinja2 for templating
  * **Environment:** Python Virtual Environment (`venv`), `python-dotenv` for secret management

-----

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You will need the following software installed on your machine:

  * [Python 3.10+](https://www.python.org/downloads/)
  * [Git](https://git-scm.com/downloads/)
  * **MongoDB Server** (or a free Atlas cluster)
  * **Ollama** (with a model pulled, e.g., `ollama run qwen2.5:1.5b`)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/your_username/your_project_repository.git](https://github.com/your_username/your_project_repository.git)
    cd your_project_repository
    ```

2.  **Create and activate a virtual environment:**

      * On Windows (Git Bash):
        ```bash
        python -m venv venv
        source venv/Scripts/activate
        ```
      * On macOS/Linux:
        ```bash
        python3 -m venv venv
        source venv/bin/activate
        ```

3.  **Install the required packages:**

    ```bash
    pip install -r requirements.txt
    ```

    *(Note: You can generate this file with `pip freeze > requirements.txt`)*

4.  **Set up your environment variables:**

      * Create a copy of the example environment file:
        ```bash
        cp .env.example .env
        ```
      * Open the `.env` file and fill in your specific credentials for the databases, Cloudinary, SMTP, and Flask secret key.

    **`.env.example` should look like this (Updated):**

    ```ini
    # Flask Configuration
    SECRET_KEY='your_super_secret_key_here'
    SECURITY_PASSWORD_SALT='a_salt_for_bcrypt' # New for security

    # Database Configuration (MySQL)
    MYSQL_HOST='localhost'
    MYSQL_USER='your_db_user'
    MYSQL_PASSWORD='your_db_password'
    MYSQL_DATABASE='your_db_name'

    # Database Configuration (MongoDB)
    MONGO_URI='mongodb://localhost:27017/your_chat_db'

    # Cloudinary Configuration
    CLOUDINARY_CLOUD_NAME='your_cloud_name'
    CLOUDINARY_API_KEY='your_api_key'
    CLOUDINARY_API_SECRET='your_api_secret'

    # SMTP Configuration (For Password Reset)
    SMTP_SERVER='localhost'
    SMTP_PORT=1025
    ```

5.  **Set up the databases:**

      * Ensure your **MySQL** server is running, create the database, and run the schema setup script.
      * Ensure your **MongoDB** instance is running and accessible via the `MONGO_URI`.
      * Ensure the **ChromaDB** server is running (if you're using a persistent server mode), or ensure the Flask app can initialize the local instance.

### Usage

Once the setup is complete, you can run the Flask development server:

```bash
flask run
```

Open your web browser and navigate to `http://127.0.0.1:5000` to start using the application.

## Roadmap

  * Expanding support for other document types (e.g., `.docx`, `.txt`).
  * Batch uploading capabilities.
  * Enhanced user management and sharing features.

-----
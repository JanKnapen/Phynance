# Run project in development

## Backend

To completely reset database:
1. Remove all migrations folder and `db.sqlite3`.
2. Run `python manage.py makemigrations __APP_NAME__` for all apps.
3. Run `python manage.py migrate`.

To run the backend server:
1. Install required dependencies `pip install -r requirements.txt`
2. Run the server `python manage.py runserver`

## Frontend

1. Install dependencies `npm install`
2. Run with `npm start`
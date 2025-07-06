# PHP Backend

This folder contains a very simple PHP API for the barber appointment system.

To run it locally with PHP's built-in server:

```bash
php -S localhost:8080 -t public
```

The endpoints available are:

- `POST /login` – Login with `phone` and `password`.
- `POST /register` – Register a user with `name`, `phone` and `password`.
- `POST /barber_login` – Login a barber with `phone` and `password`.
- `POST /barber_register` – Register a barber with `name`, `phone` and `password`.
- `GET /services?barber_id=1` – List available services for a barber.
- `GET /availabilities?barber_id=1` – List available time slots for a barber.
- `POST /appointments` – Create a new appointment.

This API expects a MySQL database according to the schema in the project documentation.

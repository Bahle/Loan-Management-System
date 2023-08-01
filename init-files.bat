@echo off

REM Create the necessary directories
mkdir models controllers routes

REM Go to the models directory
cd models

REM Create empty model files
type nul > customer.js
echo Created customer.js
type nul > loan.js
echo Created loan.js
type nul > payment.js
echo Created payment.js
type nul > cash_inflow.js
echo Created cash_inflow.js
type nul > loan_type.js
echo Created loan_type.js
type nul > admin.js
echo Created admin.js

REM Go back to the root directory
cd ..

REM Go to the controllers directory
cd controllers

REM Create empty controller files
type nul > customerController.js
echo Created customerController.js
type nul > loanController.js
echo Created loanController.js
type nul > paymentController.js
echo Created paymentController.js
type nul > cash_inflowController.js
echo Created cash_inflowController.js
type nul > loan_typeController.js
echo Created loan_typeController.js
type nul > adminController.js
echo Created adminController.js

REM Go back to the root directory
cd ..

REM Go to the routes directory
cd routes

REM Create empty route files
type nul > customer.js
echo Created customer.js
type nul > loan.js
echo Created loan.js
type nul > payment.js
echo Created payment.js
type nul > cash_inflow.js
echo Created cash_inflow.js
type nul > loan_type.js
echo Created loan_type.js
type nul > admin.js
echo Created admin.js

REM Go back to the root directory
cd ..

echo Script execution completed.

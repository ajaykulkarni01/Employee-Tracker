const inquirer = require('inquirer');
const mysql = require('mysql2');

// a splash screen in text console with logo from ASCII characters.
const logo = require('asciiart-logo');
const config = require('./package.json');
console.log(logo(config).render());


#!/usr/bin/env node

// ENV Var Confessional - Where your environment variables come to confess their sins
// Usage: node env-confessional.js

const fs = require('fs');
const path = require('path');

// The sacred text where you confess your required variables
const CONFIG_FILE = '.env.example';

// Check if the confessional exists
if (!fs.existsSync(CONFIG_FILE)) {
    console.log('\x1b[31m%s\x1b[0m', '⚠️  No confession booth found!');
    console.log('Create a .env.example file with your required variables:');
    console.log('DATABASE_URL=your_database_here');
    console.log('API_KEY=your_key_here');
    process.exit(1);
}

// Read the sins (required variables)
const requiredVars = fs.readFileSync(CONFIG_FILE, 'utf8')
    .split('\n')
    .filter(line => line.trim() && !line.startsWith('#'))
    .map(line => line.split('=')[0].trim());

console.log('\x1b[36m%s\x1b[0m', '📖 Reading confessions from the sacred text...');
console.log(`Found ${requiredVars.length} required variables to confess\n`);

// The moment of truth: who's missing?
const missingVars = [];
const presentVars = [];

requiredVars.forEach(varName => {
    if (process.env[varName]) {
        presentVars.push(varName);
        console.log('\x1b[32m%s\x1b[0m', `✅ ${varName}: Confessed and absolved`);
    } else {
        missingVars.push(varName);
        console.log('\x1b[31m%s\x1b[0m', `❌ ${varName}: Hiding in shame (not set)`);
    }
});

console.log('\n' + '='.repeat(50));

// Deliver the verdict
if (missingVars.length === 0) {
    console.log('\x1b[42m%s\x1b[0m', '🎉 All sins confessed! Your app is ready for redemption.');
    process.exit(0);
} else {
    console.log('\x1b[41m%s\x1b[0m', `😱 ${missingVars.length} unconfessed sins found!`);
    console.log('\x1b[33m%s\x1b[0m', 'Set these variables in your .env file or environment:');
    missingVars.forEach(varName => {
        console.log(`  export ${varName}=your_value_here`);
    });
    process.exit(1);
}

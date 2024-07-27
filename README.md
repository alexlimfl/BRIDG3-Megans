# BRIDG3-Megans

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### How to run serve
```
// First, make sure you have the Vue CLI installed globally. Run the following command to install it:
    npm install -g @vue/cli

// Navigate to your project directory and install the project dependencies:
    npm install
    
// After ensuring that the dependencies are installed, try running the serve script:
    npm run serve
```

### Flowchart
```
+------------------------------------+
|             Company List           |
+------------------------------------+
| Search: [_________________________] |
| [Add New Company]                  |
+------------------------------------+
| Company Name | Industry | Location | Email | Phone | Certificate |
+------------------------------------+
| Acme Corp    | Tech     | NY       | info@acme.com | 123-456-7890 | [Certificate] |
| Beta Ltd     | Finance  | SF       | contact@beta.com | 098-765-4321 | [Certificate] |
+------------------------------------+
| [Previous] [1] [2] [3] [Next]      |
+------------------------------------+


+------------------------------------+
|         Add New Company            |
+------------------------------------+
| Company Name: [__________________] |
| Industry: [Select Industry ▼]      |
| Location: [______________________] |
| Contact Email: [__________________] |
| Phone Number: [__________________] |
| Upload Certificate: [Choose File]  |
+------------------------------------+
| [Save] [Cancel]                    |
+------------------------------------+

+------------------------------------+
|         Company Details            |
+------------------------------------+
| Company Name: [Acme Corp]          |
| Industry: [Tech]                   |
| Location: [NY]                     |
| Contact Email: [info@acme.com]    |
| Phone Number: [123-456-7890]      |
| Certificate: [Download/View]       |
+------------------------------------+
| [Edit] [Close]                     |
+------------------------------------+

```


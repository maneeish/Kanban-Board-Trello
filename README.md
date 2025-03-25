# Kanban Board  

A lightweight, responsive Kanban board built with vanilla HTML, CSS, and JavaScript. This application helps you organize tasks in a visual workflow, with drag-and-drop functionality and local storage persistence.  

## Features  

### Core Features  

- **Four Default Columns**:  
  - To-Do  
  - Backlogs  
  - In Progress  
  - Completed  

- **Dynamic Column Management**:  
  - Add new columns with custom titles  
  - Choose custom colors for each column  
  - Column task counter  

- **Task Management**:  
  - Create new tasks with title and description  
  - Edit existing task details  
  - Delete tasks (with confirmation)  
  - Drag and drop tasks between columns  

- **Responsive Design**:  
  - Works on desktop, tablet, and mobile devices  
  - Horizontal scrolling for columns on smaller screens  

- **Persistence**:  
  - All data is saved to local storage  
  - Your board state persists across page refreshes and browser sessions  

- **User Experience**:  
  - Clean, minimalist UI  
  - Smooth animations and transitions  
  - Confirmation dialogs for destructive actions  
  - Color customization  

## Technologies Used  

- **HTML5**: Semantic structure  
- **CSS3**:  
  - Flexbox for layout  
  - CSS Grid for responsive design  
  - CSS transitions for animations  
- **JavaScript (ES6+)**:  
  - DOM manipulation  
  - Drag and Drop API  
  - Local Storage API  
- **Font Awesome**: For icons  

## Getting Started  

### Installation  

1. **Clone the repository** or **download the ZIP file**:  

   ```sh
   git clone https://github.com/maneeish/Kanban-Board-Trello
   cd Kanban-Board-Trello
   ```

2. Open the `index.html` file in your browser to start using the Kanban board.  

### Usage  

1. **Creating Tasks**: Click the "Add Task" button to create a new task with a title and description.  
2. **Editing Tasks**: Click on an existing task to edit its details.  
3. **Deleting Tasks**: Click the delete icon (🗑️) on a task and confirm deletion.  
4. **Moving Tasks**: Drag and drop tasks between columns to update their status.  
5. **Adding Columns**: Click the "Add Column" button to create a custom column with a unique title and color.  

## Project Structure  

```plaintext
kanban-board/
│── index.html          # Main HTML file  
│── styles.css          # Styles for the Kanban board  
│── script.js           # JavaScript functionality  
│── assets/             # Icons, images, and other assets  
└── README.md           # Project documentation  
```  

## Roadmap  

- ✅ Basic Kanban board with task management  
- ✅ Local storage persistence  
- ⏳ Dark mode support  
- ⏳ User authentication (Google/Firebase)  
- ⏳ Team collaboration (multi-user support)  

## Contributing  

Contributions are welcome! To contribute:  

1. Fork the repository  
2. Create a feature branch (`git checkout -b feature-new`)  
3. Commit your changes (`git commit -m "Added a new feature"`)  
4. Push to the branch (`git push origin feature-new`)  
5. Open a Pull Request  

## License  

This project is licensed under the **MIT License**. Feel free to use and modify it!  


let board = {
    columns: [
      {
        id: "todo",
        title: "To-Do",
        tasks: [],
        color: "#e2e8f0",
      },
      {
        id: "backlog",
        title: "Backlogs",
        tasks: [],
        color: "#fde68a",
      },
      {
        id: "inprogress",
        title: "In Progress",
        tasks: [],
        color: "#bae6fd",
      },
      {
        id: "completed",
        title: "Completed",
        tasks: [],
        color: "#bbf7d0",
      },
    ],
  }
 
  const boardElement = document.getElementById("board")
  const addColumnBtn = document.getElementById("add-column-btn")
  
  /
  const addTaskModal = document.getElementById("add-task-modal")
  const editTaskModal = document.getElementById("edit-task-modal")
  const addColumnModal = document.getElementById("add-column-modal")
  const deleteConfirmationModal = document.getElementById("delete-confirmation-modal")
  const columnColorModal = document.getElementById("column-color-modal")
  
  
  const addTaskForm = document.getElementById("add-task-form")
  const editTaskForm = document.getElementById("edit-task-form")
  const addColumnForm = document.getElementById("add-column-form")
  
  
  function initBoard() {
   
    const savedBoard = localStorage.getItem("kanbanBoard")
    if (savedBoard) {
      board = JSON.parse(savedBoard)
    }
  
    renderBoard()
    setupEventListeners()
  }
  
  
  function renderBoard() {
    boardElement.innerHTML = ""
  
    board.columns.forEach((column) => {
      const columnElement = createColumnElement(column)
      boardElement.appendChild(columnElement)
    })
  }
  
 
  function createColumnElement(column) {
    const columnElement = document.createElement("div")
    columnElement.className = "column"
    columnElement.id = `column-${column.id}`
    columnElement.style.backgroundColor = hexToRgba(column.color, 0.3)
    columnElement.setAttribute("data-column-id", column.id)
  
    
    const columnHeader = document.createElement("div")
    columnHeader.className = "column-header"
  
    const columnTitle = document.createElement("div")
    columnTitle.className = "column-title"
    columnTitle.textContent = column.title
  
    const columnActions = document.createElement("div")
    columnActions.className = "column-actions"
  
    const columnColor = document.createElement("div")
    columnColor.className = "column-color"
    columnColor.style.backgroundColor = column.color
    columnColor.setAttribute("data-column-id", column.id)
  
    const taskCount = document.createElement("span")
    taskCount.className = "task-count"
    taskCount.textContent = column.tasks.length
  
    columnActions.appendChild(columnColor)
    columnActions.appendChild(taskCount)
  
    columnHeader.appendChild(columnTitle)
    columnHeader.appendChild(columnActions)
  
   
    const columnContent = document.createElement("div")
    columnContent.className = "column-content"
    columnContent.setAttribute("data-column-id", column.id)
  
  
    column.tasks.forEach((task) => {
      const taskElement = createTaskElement(task, column.id)
      columnContent.appendChild(taskElement)
    })
  
    
    const addTaskButton = document.createElement("div")
    addTaskButton.className = "add-task-button"
  
    const addTaskBtn = document.createElement("button")
    addTaskBtn.innerHTML = '<i class="fas fa-plus"></i> Add Task'
    addTaskBtn.setAttribute("data-column-id", column.id)
  
    addTaskButton.appendChild(addTaskBtn)
  
    
    columnElement.appendChild(columnHeader)
    columnElement.appendChild(columnContent)
    columnElement.appendChild(addTaskButton)
  
    return columnElement
  }
  
  
  function createTaskElement(task, columnId) {
    const taskElement = document.createElement("div")
    taskElement.className = "task"
    taskElement.id = `task-${task.id}`
    taskElement.setAttribute("draggable", "true")
    taskElement.setAttribute("data-task-id", task.id)
    taskElement.setAttribute("data-column-id", columnId)
  
    const taskHeader = document.createElement("div")
    taskHeader.className = "task-header"
  
    const taskTitle = document.createElement("div")
    taskTitle.className = "task-title"
    taskTitle.textContent = task.title
  
    const taskActions = document.createElement("div")
    taskActions.className = "task-actions"
  
    const editButton = document.createElement("button")
    editButton.className = "edit-task-btn"
    editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>'
    editButton.setAttribute("data-task-id", task.id)
    editButton.setAttribute("data-column-id", columnId)
  
    const deleteButton = document.createElement("button")
    deleteButton.className = "delete-task-btn"
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'
    deleteButton.setAttribute("data-task-id", task.id)
    deleteButton.setAttribute("data-column-id", columnId)
  
    taskActions.appendChild(editButton)
    taskActions.appendChild(deleteButton)
  
    taskHeader.appendChild(taskTitle)
    taskHeader.appendChild(taskActions)
  
    const taskDescription = document.createElement("div")
    taskDescription.className = "task-description"
    taskDescription.textContent = task.description
  
    taskElement.appendChild(taskHeader)
    taskElement.appendChild(taskDescription)
  
    return taskElement
  }
  
  
  function setupEventListeners() {
    
    addColumnBtn.addEventListener("click", () => {
      openModal(addColumnModal)
      setupColorPicker(addColumnModal, "#column-color-input")
    })
  
    
    document.addEventListener("click", (e) => {
      if (e.target.closest(".add-task-button button")) {
        const columnId = e.target.closest("button").getAttribute("data-column-id")
        document.getElementById("column-id").value = columnId
        openModal(addTaskModal)
      }
    })
  
    
    document.addEventListener("click", (e) => {
      if (e.target.closest(".edit-task-btn")) {
        const button = e.target.closest(".edit-task-btn")
        const taskId = button.getAttribute("data-task-id")
        const columnId = button.getAttribute("data-column-id")
  
        const column = board.columns.find((col) => col.id === columnId)
        const task = column.tasks.find((t) => t.id === taskId)
  
        document.getElementById("edit-column-id").value = columnId
        document.getElementById("edit-task-id").value = taskId
        document.getElementById("edit-task-title").value = task.title
        document.getElementById("edit-task-description").value = task.description
  
        openModal(editTaskModal)
      }
    })
  
    
    document.addEventListener("click", (e) => {
      if (e.target.closest(".delete-task-btn")) {
        const button = e.target.closest(".delete-task-btn")
        const taskId = button.getAttribute("data-task-id")
        const columnId = button.getAttribute("data-column-id")
  
        const column = board.columns.find((col) => col.id === columnId)
        const task = column.tasks.find((t) => t.id === taskId)
  
        document.getElementById("delete-confirmation-message").textContent =
          `Are you sure you want to delete "${task.title}"? This action cannot be undone.`
  
        const confirmDeleteButton = document.getElementById("confirm-delete-button")
        confirmDeleteButton.onclick = () => {
          deleteTask(columnId, taskId)
          closeModal(deleteConfirmationModal)
        }
  
        openModal(deleteConfirmationModal)
      }
    })
  
    
    document.addEventListener("click", (e) => {
      if (e.target.closest(".column-color")) {
        const columnId = e.target.closest(".column-color").getAttribute("data-column-id")
        const column = board.columns.find((col) => col.id === columnId)
  
        document.getElementById("edit-column-color-input").value = column.color
        document.getElementById("edit-column-id-input").value = columnId
  
        setupColorPicker(columnColorModal, "#edit-column-color-input")
        openModal(columnColorModal)
      }
    })
  
   
    document.getElementById("save-column-color-button").addEventListener("click", () => {
      const columnId = document.getElementById("edit-column-id-input").value
      const color = document.getElementById("edit-column-color-input").value
  
      updateColumnColor(columnId, color)
      closeModal(columnColorModal)
    })
  
    
    addTaskForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      const columnId = document.getElementById("column-id").value
      const title = document.getElementById("task-title").value
      const description = document.getElementById("task-description").value
  
      addTask(columnId, title, description)
      closeModal(addTaskModal)
      addTaskForm.reset()
    })
  
    editTaskForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      const columnId = document.getElementById("edit-column-id").value
      const taskId = document.getElementById("edit-task-id").value
      const title = document.getElementById("edit-task-title").value
      const description = document.getElementById("edit-task-description").value
  
      updateTask(columnId, taskId, title, description)
      closeModal(editTaskModal)
    })
  
    addColumnForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      const title = document.getElementById("column-title").value
      const color = document.getElementById("column-color-input").value
  
      addColumn(title, color)
      closeModal(addColumnModal)
      addColumnForm.reset()
      document.getElementById("column-color-input").value = "#e2e8f0"
    })
  
    
    document.querySelectorAll(".close-button, .cancel-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const modal = e.target.closest(".modal")
        closeModal(modal)
      })
    })
  
    
    setupDragAndDrop()
  }
  
  
  function setupColorPicker(modal, inputId) {
    const colorOptions = modal.querySelectorAll(".color-option")
    const colorInput = document.querySelector(inputId)
  
    
    colorOptions.forEach((option) => {
      option.classList.remove("selected")
      if (option.getAttribute("data-color") === colorInput.value) {
        option.classList.add("selected")
      }
    })
  
    
    colorOptions.forEach((option) => {
      option.onclick = () => {
        const color = option.getAttribute("data-color")
        colorInput.value = color
  
        
        colorOptions.forEach((opt) => opt.classList.remove("selected"))
        option.classList.add("selected")
      }
    })
  }
  
  
  function setupDragAndDrop() {
    document.addEventListener("dragstart", (e) => {
      if (e.target.classList.contains("task")) {
        e.dataTransfer.setData("text/plain", e.target.getAttribute("data-task-id"))
        e.target.classList.add("dragging")
  
        
        e.dataTransfer.setData("source-column", e.target.getAttribute("data-column-id"))
      }
    })
  
    document.addEventListener("dragend", (e) => {
      if (e.target.classList.contains("task")) {
        e.target.classList.remove("dragging")
      }
    })
  
    document.addEventListener("dragover", (e) => {
      e.preventDefault()
  
      const columnContent = e.target.closest(".column-content")
      if (columnContent) {
        columnContent.classList.add("drag-over")
      }
    })
  
    document.addEventListener("dragleave", (e) => {
      const columnContent = e.target.closest(".column-content")
      if (columnContent) {
        columnContent.classList.remove("drag-over")
      }
    })
  
    document.addEventListener("drop", (e) => {
      e.preventDefault()
  
      const columnContent = e.target.closest(".column-content")
      if (columnContent) {
        columnContent.classList.remove("drag-over")
  
        const taskId = e.dataTransfer.getData("text/plain")
        const sourceColumnId = e.dataTransfer.getData("source-column")
        const targetColumnId = columnContent.getAttribute("data-column-id")
  
        if (sourceColumnId !== targetColumnId) {
          moveTask(taskId, sourceColumnId, targetColumnId)
        }
      }
    })
  }
  
  
  function addTask(columnId, title, description) {
    const column = board.columns.find((col) => col.id === columnId)
  
    if (column) {
      const newTask = {
        id: generateId(),
        title,
        description,
      }
  
      column.tasks.push(newTask)
      saveBoard()
      renderBoard()
    }
  }
  
 
  function updateTask(columnId, taskId, title, description) {
    const column = board.columns.find((col) => col.id === columnId)
  
    if (column) {
      const task = column.tasks.find((t) => t.id === taskId)
  
      if (task) {
        task.title = title
        task.description = description
        saveBoard()
        renderBoard()
      }
    }
  }
  
  
  function deleteTask(columnId, taskId) {
    const column = board.columns.find((col) => col.id === columnId)
  
    if (column) {
      column.tasks = column.tasks.filter((task) => task.id !== taskId)
      saveBoard()
      renderBoard()
    }
  }
  
  
  function moveTask(taskId, sourceColumnId, targetColumnId) {
    const sourceColumn = board.columns.find((col) => col.id === sourceColumnId)
    const targetColumn = board.columns.find((col) => col.id === targetColumnId)
  
    if (sourceColumn && targetColumn) {
      const taskIndex = sourceColumn.tasks.findIndex((task) => task.id === taskId)
  
      if (taskIndex !== -1) {
        const task = sourceColumn.tasks[taskIndex]
        sourceColumn.tasks.splice(taskIndex, 1)
        targetColumn.tasks.push(task)
  
        saveBoard()
        renderBoard()
      }
    }
  }
  
  
  function addColumn(title, color) {
    const newColumn = {
      id: generateId(),
      title,
      tasks: [],
      color,
    }
  
    board.columns.push(newColumn)
    saveBoard()
    renderBoard()
  }
  
  
  function updateColumnColor(columnId, color) {
    const column = board.columns.find((col) => col.id === columnId)
  
    if (column) {
      column.color = color
      saveBoard()
      renderBoard()
    }
  }
  
  
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
  }
  
  
  function hexToRgba(hex, alpha = 1) {
    const r = Number.parseInt(hex.slice(1, 3), 16)
    const g = Number.parseInt(hex.slice(3, 5), 16)
    const b = Number.parseInt(hex.slice(5, 7), 16)
  
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
  
  
  function openModal(modal) {
    modal.style.display = "block"
  }
  
  function closeModal(modal) {
    modal.style.display = "none"
  }
  

  function saveBoard() {
    localStorage.setItem("kanbanBoard", JSON.stringify(board))
  }
  
  
  document.addEventListener("DOMContentLoaded", initBoard)
  
  
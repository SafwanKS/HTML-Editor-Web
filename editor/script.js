document.addEventListener("DOMContentLoaded", function() {
  const editor = document.getElementById('code');
  const runBtn = document.getElementById('runBtn');
  const saveBtn = document.getElementById('saveBtn');
  const undoBtn = document.getElementById('undoBtn');
  const redoBtn = document.getElementById('redoBtn');

  let editorStates = [];
  let currentStateIndex = -1;

  // Function to extract filename from URL
  function getFilenameFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('filename');
  }

  // Function to save content to local storage
  function saveContent() {
    const content = editor.value;
    const filename = getFilenameFromURL();
    if (filename) {
      localStorage.setItem(filename, content);
    }
  }

  // Function to load content from local storage
  function loadContent() {
    const filename = getFilenameFromURL();
    if (filename) {
      const savedContent = localStorage.getItem(filename);
      if (savedContent) {
        editor.value = savedContent;
      }
    }
  }

  // Load content from local storage on page load
  loadContent();

  // Event listener for editor text change
  editor.addEventListener('input', () => {
    saveContent();
    saveState();
    highlightSpecialCharacters();
  });

  // Function to save editor state
  function saveState() {
    const content = editor.value;
    editorStates.splice(currentStateIndex + 1);
    editorStates.push(content);
    currentStateIndex++;
  }

  // Event listener for undo button click
  undoBtn.addEventListener('click', () => {
    if (currentStateIndex > 0) {
      currentStateIndex--;
      editor.value = editorStates[currentStateIndex];
      highlightSpecialCharacters();
    }
  });

  // Event listener for redo button click
  redoBtn.addEventListener('click', () => {
    if (currentStateIndex < editorStates.length - 1) {
      currentStateIndex++;
      editor.value = editorStates[currentStateIndex];
      highlightSpecialCharacters();
    }
  });

  // Event listener for save button click
  saveBtn.addEventListener('click', () => {
    const content = editor.value;
    const filename = getFilenameFromURL();
    if (filename) {
      // Save content to device memory by initiating download
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert('Code downloaded successfully!');
    } else {
      alert('No filename provided!');
    }
  });

  // Event listener for run button click
  runBtn.addEventListener('click', () => {
    const content = editor.value;
    localStorage.setItem('runContent', content);
    window.location.href = '/output/index.html?code=' + encodeURIComponent(content);
  });

  // Function to highlight special characters
  function highlightSpecialCharacters() {
    const content = editor.value;
    const highlightedContent = content.replace(/&/g, '&amp;')
                                      .replace(/</g, '&lt;')
                                      .replace(/>/g, '&gt;')
                                      .replace(/=/g, '<span style="color: red;">=</span>');
    editor.innerHTML = highlightedContent;
  }
});

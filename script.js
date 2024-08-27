document.addEventListener("DOMContentLoaded", function() {
  const fileList = document.getElementById('fileList');
  const fab = document.getElementById('fab');
  const modal = document.getElementById('modal');
  const closeButton = document.querySelector('.close');
  const fileNameInput = document.getElementById('fileNameInput');
  let startX = null;

  // Load file list from local storage on page load
  loadFileList();

  // Event listener for fab button to open modal
  fab.addEventListener('click', openModal);

  // Event listener for close button to close modal
  closeButton.addEventListener('click', closeModal);

  // Event listener for save button in modal
  document.getElementById('saveFileBtn').addEventListener('click', saveFile);

  // Function to load file list from local storage
  function loadFileList() {
    fileList.innerHTML = ''; // Clear existing list
    const files = Object.keys(localStorage);
    files.forEach(file => {
      if (file !== 'savedContent') { // Exclude saved content key
        const li = document.createElement('li');
        li.textContent = file;
        li.addEventListener('click', function() {
          const selectedFileName = this.textContent;
          // Redirect to editor page with selected file name as URL parameter
          window.location.href = `/editor/index.html?filename=${selectedFileName}`;
        });

        // Swipe to delete gesture
        li.addEventListener('touchstart', handleTouchStart, false);
        li.addEventListener('touchmove', handleTouchMove, false);

        fileList.appendChild(li);
      }
    });
  }

  // Function to handle touch start event
  function handleTouchStart(event) {
    startX = event.touches[0].clientX;
  }

  // Function to handle touch move event
  function handleTouchMove(event) {
    if (!startX) {
      return;
    }

    const xDiff = startX - event.touches[0].clientX;

    if (xDiff > 0) {
      const li = event.target.closest('li');
      if (li) {
        // Show modal with delete option
        const confirmDelete = confirm(`Confirm deleting "${li.textContent}"`);
        if (confirmDelete) {
          // Delete file from local storage
          localStorage.removeItem(li.textContent);
          // Reload file list
          loadFileList();
        }
      }
    }

    startX = null;
  }

  // Function to open modal
  function openModal() {
    modal.style.display = 'block';
  }

  // Function to close modal
  function closeModal() {
    modal.style.display = 'none';
  }

  // Function to save new file
  function saveFile() {
    const fileName = fileNameInput.value.trim();
    if (fileName !== '') {
      // Save file name to local storage
      localStorage.setItem(fileName, '');
      // Reload file list
      loadFileList();
      // Close modal
      closeModal();
      // Clear input
      fileNameInput.value = '';
    }
  }

  // Event listener to dismiss modal when clicking outside of it
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Swipe to delete gesture on modal
  modal.addEventListener('touchstart', handleModalTouchStart, false);
  modal.addEventListener('touchmove', handleModalTouchMove, false);

  let modalStartX = null;

  // Function to handle touch start event on modal
  function handleModalTouchStart(event) {
    modalStartX = event.touches[0].clientX;
  }

  // Function to handle touch move event on modal
  function handleModalTouchMove(event) {
    if (!modalStartX) {
      return;
    }

    const xDiff = modalStartX - event.touches[0].clientX;

    if (xDiff > 100) { // Swipe right threshold
      // Confirm delete
      const confirmDelete = confirm("Confirm deleting this file?");
      if (confirmDelete) {
        // Delete file from local storage
        const fileName = fileNameInput.value.trim();
        if (fileName !== '') {
          localStorage.removeItem(fileName);
          // Reload file list
          loadFileList();
          // Close modal
          closeModal();
          // Clear input
          fileNameInput.value = '';
        }
      }
    }

    modalStartX = null;
  }
});

// Initialize Particles.js
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

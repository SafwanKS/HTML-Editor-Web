document.addEventListener("DOMContentLoaded", function() {
  const fileList = document.getElementById('fileList');
  const fab = document.getElementById('fab');
  const modal = document.getElementById('modal');
  const closeButton = document.querySelector('.close');
  const fileNameInput = document.getElementById('fileNameInput');
  const drawer = document.getElementById('drawer');
  const drawerToggle = document.getElementById('drawer-toggle');
  let startX = null;

  loadFileList();

  fab.addEventListener('click', openModal);
  closeButton.addEventListener('click', closeModal);
  document.getElementById('saveFileBtn').addEventListener('click', saveFile);
  drawerToggle.addEventListener('click', toggleDrawer);

  function loadFileList() {
    fileList.innerHTML = '';
    const files = Object.keys(localStorage);
    files.forEach(file => {
      if (file !== 'savedContent') {
        const li = document.createElement('li');
        li.textContent = file;
        li.addEventListener('click', function() {
          const selectedFileName = this.textContent;
          window.location.href = `/editor/index.html?filename=${selectedFileName}`;
        });

        li.addEventListener('touchstart', handleTouchStart, false);
        li.addEventListener('touchmove', handleTouchMove, false);

        fileList.appendChild(li);
      }
    });
  }

  function handleTouchStart(event) {
    startX = event.touches[0].clientX;
  }

  function handleTouchMove(event) {
    if (!startX) return;

    const xDiff = startX - event.touches[0].clientX;

    if (xDiff > 0) {
      const li = event.target.closest('li');
      if (li) {
        const confirmDelete = confirm(`Confirm deleting "${li.textContent}"`);
        if (confirmDelete) {
          localStorage.removeItem(li.textContent);
          loadFileList();
        }
      }
    }

    startX = null;
  }

  function openModal() {
    modal.style.display = 'flex';
  }

  function closeModal() {
    modal.style.display = 'none';
  }

  function saveFile() {
    const fileName = fileNameInput.value.trim();
    if (fileName !== '') {
      localStorage.setItem(fileName, '');
      loadFileList();
      closeModal();
      fileNameInput.value = '';
    }
  }

  function toggleDrawer() {
    drawer.classList.toggle('open');
  }

  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });

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
});

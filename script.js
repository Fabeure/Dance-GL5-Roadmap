// Dance data structure
const dances = [
    {
        id: 1,
        name: 'Gta Amapiano',
        thumbnail: 'https://via.placeholder.com/150/667eea/ffffff?text=Salsa',
        video: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
        position: { x: 25, y: 0 }
    },
    {
        id: 2,
        name: 'Cartier',
        thumbnail: 'https://via.placeholder.com/150/764ba2/ffffff?text=Hip+Hop',
        video: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
        position: { x: 325, y: 0 }
    },
    {
        id: 3,
        name: 'Y que fue',
        thumbnail: 'https://via.placeholder.com/150/f093fb/ffffff?text=Contemporary',
        video: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
        position: { x: 625, y: 0 }
    },
    {
        id: 4,
        name: 'Nueavayol',
        thumbnail: 'https://via.placeholder.com/150/4facfe/ffffff?text=Ballet',
        video: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
        position: { x: 625, y: 200 }
    },
    {
        id: 5,
        name: 'Naghara',
        thumbnail: 'https://via.placeholder.com/150/00f2fe/ffffff?text=Jazz',
        video: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
        position: { x: 325, y: 200 }
    },
    {
        id: 6,
        name: 'Dance 6',
        thumbnail: 'https://via.placeholder.com/150/43e97b/ffffff?text=Dance+6',
        video: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
        position: { x: 25, y: 200 }
    },
    {
        id: 7,
        name: 'Dance 7',
        thumbnail: 'https://via.placeholder.com/150/fa709a/ffffff?text=Dance+7',
        video: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
        position: { x: 25, y: 400 }
    },
    {
        id: 8,
        name: 'Dance 8',
        thumbnail: 'https://via.placeholder.com/150/fee140/ffffff?text=Dance+8',
        video: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
        position: { x: 325, y: 400 }
    }
];

// Connections between dances
const connections = [
    { from: 1, to: 2, video: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4' },
    { from: 2, to: 3, video: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4' },
    { from: 3, to: 4, video: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4' },
    { from: 4, to: 5, video: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4' },
    { from: 5, to: 6, video: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4' },
    { from: 6, to: 7, video: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4' },
    { from: 7, to: 8, video: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4' }
];

// Modal elements
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeBtn = document.getElementById('closeBtn');
const roadmapContainer = document.getElementById('roadmap');
const connectionsLayer = document.getElementById('connectionsLayer');

// Initialize the roadmap
function initRoadmap() {
    renderDanceCircles();
    renderConnections();
}

// Render dance circles
function renderDanceCircles() {
    dances.forEach(dance => {
        const circleDiv = document.createElement('div');
        circleDiv.className = 'dance-circle';
        circleDiv.style.position = 'absolute';
        circleDiv.style.left = `${dance.position.x}px`;
        circleDiv.style.top = `${dance.position.y}px`;
        circleDiv.dataset.danceId = dance.id;
        
        circleDiv.innerHTML = `
            <img src="${dance.thumbnail}" alt="${dance.name}">
            <div class="dance-label">${dance.name}</div>
        `;
        
        circleDiv.addEventListener('click', () => openVideo(dance.video));
        roadmapContainer.appendChild(circleDiv);
    });
}

// Render connections (curved arrows)
function renderConnections() {
    connections.forEach(conn => {
        const fromDance = dances.find(d => d.id === conn.from);
        const toDance = dances.find(d => d.id === conn.to);
        
        if (fromDance && toDance) {
            const arrow = createCurvedArrow(fromDance, toDance, conn.video);
            connectionsLayer.appendChild(arrow);
        }
    });
}

// Create a curved arrow SVG element
function createCurvedArrow(from, to, videoUrl) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'connection-arrow');
    g.style.cursor = 'pointer';
    
    // Get the roadmap container offset to account for centering
    const roadmapRect = roadmapContainer.getBoundingClientRect();
    const containerRect = roadmapContainer.parentElement.getBoundingClientRect();
    const offsetX = roadmapRect.left - containerRect.left;
    const offsetY = roadmapRect.top - containerRect.top;
    
    // Calculate center positions
    const centerX1 = from.position.x + 75;
    const centerY1 = from.position.y + 75;
    const centerX2 = to.position.x + 75;
    const centerY2 = to.position.y + 75;
    
    // Calculate angle between centers
    const dx = centerX2 - centerX1;
    const dy = centerY2 - centerY1;
    const angle = Math.atan2(dy, dx);
    
    // Calculate edge points on circles (75px radius)
    const radius = 75;
    const startX = centerX1 + Math.cos(angle) * radius + offsetX;
    const startY = centerY1 + Math.sin(angle) * radius + offsetY;
    const endX = centerX2 - Math.cos(angle) * radius + offsetX;
    const endY = centerY2 - Math.sin(angle) * radius + offsetY;
    
    // Calculate control point for curve
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const controlX = midX + (endY - startY) * 0.3;
    const controlY = midY - (endX - startX) * 0.3;
    
    // Create path with quadratic curve
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const pathData = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
    path.setAttribute('d', pathData);
    path.setAttribute('marker-end', 'url(#arrowhead)');
    
    g.appendChild(path);
    g.addEventListener('click', () => openVideo(videoUrl));
    
    return g;
}

// Create arrow marker definition
function createArrowMarker() {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    
    marker.setAttribute('id', 'arrowhead');
    marker.setAttribute('markerWidth', '10');
    marker.setAttribute('markerHeight', '10');
    marker.setAttribute('refX', '9');
    marker.setAttribute('refY', '3');
    marker.setAttribute('orient', 'auto');
    
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', '0 0, 10 3, 0 6');
    polygon.setAttribute('fill', '#667eea');
    
    marker.appendChild(polygon);
    defs.appendChild(marker);
    connectionsLayer.appendChild(defs);
}

// Open video in modal
function openVideo(videoUrl) {
    modalVideo.src = videoUrl;
    modal.classList.add('active');
    modalVideo.play();
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    modalVideo.pause();
    modalVideo.src = '';
}

// Event listeners
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    createArrowMarker();
    initRoadmap();
});

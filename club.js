

// 1. Array of club objects
const clubs = [
    {
        id: 1,
        logo: "💻",
        name: "Coding Club",
        category: "Technology",
        members: 120,
        joined: false
    },
    {
        id: 2,
        logo: "🎵",
        name: "Music Club",
        category: "Arts",
        members: 85,
        joined: false
    },
    {
        id: 3,
        logo: "📷",
        name: "Photography Club",
        category: "Arts",
        members: 65,
        joined: false
    },
    {
        id: 4,
        logo: "👾",
        name: "Robotics Club",
        category: "Technology",
        members: 95,
        joined: false
    },
    {
        id: 5,
        logo: "🎭",
        name: "Drama Club",
        category: "Arts",
        members: 70,
        joined: false
    },
    {
        id: 6,
        logo: "⚽",
        name: "Sports Club",
        category: "Sports",
        members: 150,
        joined: false
    }
];

// 2. Select HTML elements
const clubContainer = document.getElementById("clubContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const message = document.getElementById("message");

// 3. Display club cards
function displayClubs() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    // Filter clubs using search and category
    const filteredClubs = clubs.filter(function(club) {
        const matchesName = club.name.toLowerCase()
            .includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            club.category === selectedCategory;

        return matchesName && matchesCategory;
    });

    // Clear previous cards
    clubContainer.innerHTML = "";

    // Show message when no clubs match
    if (filteredClubs.length === 0) {
        clubContainer.innerHTML =
            '<p id="noResults">No clubs found. Try another search.</p>';
        return;
    }

    // Create cards from the array
    filteredClubs.forEach(function(club) {
        const card = document.createElement("div");
        card.className = "club-card";

        card.innerHTML = `
            <div class="club-logo">${club.logo}</div>
            <h2>${club.name}</h2>
            <span class="category">${club.category}</span>
            <p class="members">
                Members: <strong>${club.members}</strong>
            </p>
            <button
                class="join-btn ${club.joined ? "joined" : ""}"
                data-id="${club.id}"
                ${club.joined ? "disabled" : ""}
            >
                ${club.joined ? "Joined ✓" : "Join Club"}
            </button>
        `;

        clubContainer.appendChild(card);
    });
}

// 4. Handle Join Club button clicks
clubContainer.addEventListener("click", function(event) {
    if (!event.target.classList.contains("join-btn")) {
        return;
    }

    const clubId = Number(event.target.dataset.id);

    // Find the selected club object
    const selectedClub = clubs.find(function(club) {
        return club.id === clubId;
    });

    // Do not allow joining twice
    if (!selectedClub || selectedClub.joined) {
        return;
    }

    // Update the club data
    selectedClub.joined = true;
    selectedClub.members++;

    // Display confirmation message
    message.textContent =
        `Successfully joined ${selectedClub.name}! Welcome aboard.`;

    message.style.display = "block";

    // Redraw cards to update button and member count
    displayClubs();
});

// 5. Search clubs as the user types
searchInput.addEventListener("input", displayClubs);

// 6. Filter clubs by category
categoryFilter.addEventListener("change", displayClubs);

// 7. Display all clubs when page loads
displayClubs();

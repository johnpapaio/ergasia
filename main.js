// Τμήματα μουσείου
fetch("https://openaccess-api.clevelandart.org/api/departments")
  .then(response => response.json())
  .then(data => {
    if (data.data && Array.isArray(data.data)) {
      const list = document.getElementById("departments");
      data.data.forEach(dept => {
        const li = document.createElement("li");
        li.textContent = dept.name;
        list.appendChild(li);
      });
    } else {
      console.error("Δεν βρέθηκαν τμήματα μουσείου:", data);
    }
  });

// Δείγματα έργων τέχνης
fetch("https://openaccess-api.clevelandart.org/api/artworks?limit=10")
  .then(response => response.json())
  .then(data => {
    if (!data.data || !Array.isArray(data.data)) {
      console.error("Δεν βρέθηκαν έργα τέχνης:", data);
      return;
    }

    const tableBody = document.querySelector("#artworks-table tbody");

    data.data.forEach(art => {
      const row = document.createElement("tr");

      const titleCell = document.createElement("td");
      titleCell.textContent = art.title || "Άγνωστο";
      row.appendChild(titleCell);

      const artistCell = document.createElement("td");
      artistCell.textContent = art.creators?.[0]?.description || "Άγνωστος";
      row.appendChild(artistCell);

      const imageCell = document.createElement("td");
      const btn = document.createElement("button");
      btn.textContent = "Δες εικόνα";

      btn.onclick = () => {
        const modal = document.getElementById("modal");
        if (!modal) {
          console.error("Το στοιχείο #modal δεν βρέθηκε!");
          return;
        }

        modal.style.display = "block";

        const img = document.createElement("img");
        img.src = art.images?.web?.url || "";
        img.alt = art.title;

        const span = document.createElement("span");
        span.className = "close";
        span.innerHTML = "&times;";
        span.onclick = () => {
          modal.style.display = "none";
          modal.innerHTML = "";
        };

        modal.innerHTML = "";
        modal.appendChild(span);
        modal.appendChild(img);
      };

      imageCell.appendChild(btn);
      row.appendChild(imageCell);
      tableBody.appendChild(row);
    });
  });


